/* ============================================================
 * 主控制器：视图切换 / 设置 / 主页 / Stage 调度
 * 方块世界主题（Voxel skin）
 * ============================================================ */
window.App = (() => {
  const $ = (id) => document.getElementById(id);

  let currentUnit;

  function questsForToday() {
    const errCount = Progress.errorBookCount();
    return [
      { id: 'warmup',  icon: '🔁', label: '热身复习',
        desc: errCount > 0 ? `${errCount} 道错题等你 →` : '5 min · 复习昨日词', block: 'dirt'  },
      { id: 'words',   icon: '📚', label: '新词学习', desc: '10 min · 解锁新单词',    block: 'wood'  },
      { id: 'reading', icon: '📖', label: '阅读冒险', desc: '20 min · 故事 + 选择题', block: 'paper' },
      { id: 'fun',     icon: '⚔',  label: '拼写打怪',
        desc: errCount > 0 ? `打怪同时复习 ${Math.min(errCount, 2)} 个错题` : '10 min · 拼字击败怪物',  block: 'stone' },
    ];
  }

  const STAGE_BLOCK = { warmup: 'dirt', words: 'wood', reading: 'paper', fun: 'stone' };
  const STAGE_TITLE = {
    warmup: '🔁 热身复习',
    words:  '📚 新词学习',
    reading:'📖 阅读冒险',
    fun:    '⚔ 拼写打怪',
  };

  function init() {
    Progress.tick();
    currentUnit = window.CURRICULUM.units[Progress.get().currentUnitIdx] || window.CURRICULUM.units[0];

    renderHud();
    renderHome();
    renderHotbar('home');
    bindGlobalEvents();
    bindSettings();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js').catch(() => {});
    }
  }

  /* ---------------- HUD (top bar) ---------------- */
  function renderHud() {
    const s = Progress.get();
    $('avatarFace').textContent = s.avatar;
    $('statLevel').textContent = s.level;
    $('statStreak').textContent = s.streak;

    // XP bar (level needs level*100 xp)
    const need = s.level * 100;
    const pct = Math.max(0, Math.min(100, (s.xp / need) * 100));
    $('xpFill').style.width = pct + '%';
    $('xpText').textContent = `${s.xp} / ${need} XP`;

    // HP = 信心值（今日完成关卡数 × 5，满 20）
    const hp = Progress.todayCompletedCount() * 5;
    renderUnitsRow('hearts', hp, '❤');
    // Food = 坚持值（streak × 2，最多 20）
    const food = Math.min(s.streak * 2, 20);
    renderUnitsRow('foods', food, '🍗');
  }

  function renderUnitsRow(elId, value, glyph) {
    const html = [];
    for (let i = 0; i < 10; i++) {
      const v = value - i * 2;
      const cls = v >= 2 ? 'full' : v === 1 ? 'half' : 'empty';
      const kind = glyph === '❤' ? 'heart' : 'food';
      html.push(`<span class="${kind} ${cls}">${glyph}</span>`);
    }
    if (elId === 'hearts') html.push('<span class="hud-label">HP · 信心值</span>');
    else html.push('<span class="hud-label">坚持值</span>');
    $(elId).innerHTML = html.join('');
  }

  /* ---------------- Home ---------------- */
  function renderHome() {
    const s = Progress.get();
    showView('viewHome');

    // hero text
    $('trainerName').textContent = s.name;
    const done = Progress.todayCompletedCount();
    $('missionSummary').textContent = done === 4
      ? `🎉 今日 4 关全部完成！打开宝箱领取奖励。`
      : `完成 4 关 · 约 45 分钟 · 今日已 ${done}/4`;
    const today = new Date();
    $('metaDate').textContent = `⛏ ${currentUnit.name}`;
    $('metaStreak').textContent = `⏱ 累计 ${s.streak} 天 · ${today.getMonth()+1} 月 ${today.getDate()} 日`;
    const errCount = Progress.errorBookCount();
    $('metaErrorBook').textContent = errCount > 0 ? `📋 错题本 ${errCount}` : '✨ 没有待复习错题';

    // Quests grid
    $('questsGrid').innerHTML = questsForToday().map((q, i) => {
      const completed = Progress.isStageCompleteToday(q.id);
      const status = completed
        ? `<div class="quest-status"><span class="check">✓ 完成</span></div>`
        : `<div class="quest-status"><span class="play">▶ 开始</span></div>`;
      return `
        <button class="quest-block block-btn block-${q.block} ${completed ? 'done' : ''}" data-stage="${q.id}">
          <div class="quest-num">关 ${String(i+1).padStart(2,'0')}</div>
          <div class="quest-icon">${q.icon}</div>
          <div class="quest-info">
            <div class="quest-label">${q.label}</div>
            <div class="quest-desc">${q.desc}</div>
          </div>
          ${status}
        </button>`;
    }).join('');
    document.querySelectorAll('.quest-block').forEach(btn => {
      btn.onclick = () => startStage(btn.dataset.stage);
    });

    // Finish button (visible when all 4 done)
    const allDone = ['warmup','words','reading','fun'].every(s => Progress.isStageCompleteToday(s));
    $('finishBtn').classList.toggle('hidden', !allDone);
    $('finishBtn').onclick = () => showDone();

    renderBadges();
    renderHotbar('home');
  }

  function renderBadges() {
    const s = Progress.get();
    const all = window.CURRICULUM.badges;
    $('badges').innerHTML = all.map(b => {
      const owned = s.badges.includes(b.id);
      return `
        <div class="ach-slot ${owned ? 'got' : 'locked'}" title="${b.name}">
          <div class="ach-icon">${owned ? b.icon : '?'}</div>
          <div class="ach-name">${b.name}</div>
        </div>`;
    }).join('');
  }

  /* ---------------- Hotbar ---------------- */
  function renderHotbar(activeId) {
    const slots = [
      { id: 'home',     icon: '🏠', name: '主页' },
      { id: 'warmup',   icon: '🔁', name: '热身',  done: Progress.isStageCompleteToday('warmup') },
      { id: 'words',    icon: '📚', name: '新词',  done: Progress.isStageCompleteToday('words') },
      { id: 'reading',  icon: '📖', name: '阅读',  done: Progress.isStageCompleteToday('reading') },
      { id: 'fun',      icon: '⚔',  name: '打怪',  done: Progress.isStageCompleteToday('fun') },
      { id: 'settings', icon: '⚙',  name: '设置' },
    ];
    $('hotbar').innerHTML = slots.map((s, i) => `
      <button class="hotbar-slot ${activeId===s.id?'active':''} ${s.done?'done':''}" data-id="${s.id}">
        <span class="slot-num">${i+1}</span>
        <span class="slot-icon">${s.icon}</span>
        <span class="slot-name">${s.name}</span>
      </button>
    `).join('');
    document.querySelectorAll('.hotbar-slot').forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        if (id === 'home') renderHome();
        else if (id === 'settings') showSettings();
        else startStage(id);
      };
    });
  }

  /* ---------------- Stage ---------------- */
  function startStage(stage) {
    showView('viewStage');
    $('stageTitle').textContent = STAGE_TITLE[stage];
    $('stageProgress').textContent = '';
    // 切换 stage-panel 的方块色
    const panel = $('stagePanel');
    panel.className = 'stage-panel block-' + (STAGE_BLOCK[stage] || 'stone');

    const body = $('stageBody');
    const footer = $('stageFooter');
    body.innerHTML = '';
    footer.innerHTML = '';

    const onDone = (result) => onStageDone(stage, result);
    const ctx = { unit: currentUnit, body, footer, onDone };

    if (stage === 'warmup') WarmupModule.start(ctx);
    else if (stage === 'words') WordsModule.start(ctx);
    else if (stage === 'reading') ReadingModule.start(ctx);
    else if (stage === 'fun') FunModule.start(ctx);

    renderHotbar(stage);
  }

  function onStageDone(stage, result) {
    TTS.stop();
    renderHud();
    const newBadges = Progress.checkBadges();
    if (newBadges && newBadges.length) {
      newBadges.forEach(b => toast(`🏅 解锁成就：${b.name}`, 'success', 2200));
    }

    const allDone = ['warmup','words','reading','fun'].every(s => Progress.isStageCompleteToday(s));
    if (allDone) {
      showDone();
      return;
    }
    setTimeout(() => renderHome(), 600);
  }

  /* ---------------- Done ---------------- */
  function showDone() {
    const s = Progress.get();
    const today = new Date().toISOString().slice(0, 10);
    const log = s.dailyLog[today] || { newWords: 0, accuracy: 0, xp: 0 };
    showView('viewDone');
    $('doneNewWords').textContent = log.newWords;
    $('doneAccuracy').textContent = (log.accuracy || 0) + '%';
    $('doneXp').textContent = '+' + log.xp;
    $('doneStar').textContent = (log.accuracy === 100) ? '⭐' : '★';
    $('doneSub').textContent = `+${log.xp} 经验值 · 连续 ${s.streak} 天`;

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const yLog = s.dailyLog[yesterday];
    let msg;
    if (yLog && log.newWords > yLog.newWords) {
      msg = `"今天比昨天又多记了 ${log.newWords - yLog.newWords} 个新词。继续！"`;
    } else if (s.streak >= 7) {
      msg = `"连续 ${s.streak} 天坚持，你是真正的训练师！"`;
    } else if (s.streak >= 3) {
      msg = `"连续 ${s.streak} 天打卡，干得漂亮！"`;
    } else {
      msg = '"完成今天的训练，你又强了一点点！"';
    }
    $('doneMessage').textContent = msg;

    $('doneBackBtn').onclick = () => renderHome();
    renderHotbar('home');
  }

  /* ---------------- Settings ---------------- */
  function bindSettings() {
    $('settingsBtn').onclick = () => showSettings();
    $('avatarBtn').onclick = () => renderHome();
    $('settingsBack').onclick = () => renderHome();
    $('stageBack').onclick = () => {
      TTS.stop();
      if (confirm('当前关卡未完成，确认返回主页？')) renderHome();
    };

    const sel = $('setUnit');
    sel.innerHTML = window.CURRICULUM.units.map((u, i) =>
      `<option value="${i}">${u.name} · ${u.cn}</option>`
    ).join('');

    const av = $('avatarPicker');
    av.innerHTML = window.CURRICULUM.avatars.map(a =>
      `<span class="avatar-chip" data-a="${a}">${a}</span>`
    ).join('');
    av.onclick = (e) => {
      const opt = e.target.closest('.avatar-chip');
      if (!opt) return;
      const s = Progress.get();
      s.avatar = opt.dataset.a;
      Progress.save();
      av.querySelectorAll('.avatar-chip').forEach(x => x.classList.toggle('on', x.dataset.a === s.avatar));
      renderHud();
    };

    $('setName').oninput = (e) => {
      Progress.get().name = e.target.value || '小训练师';
      Progress.save();
      const tn = $('trainerName'); if (tn) tn.textContent = Progress.get().name;
    };
    $('setUnit').onchange = (e) => {
      Progress.get().currentUnitIdx = parseInt(e.target.value, 10);
      Progress.save();
      currentUnit = window.CURRICULUM.units[Progress.get().currentUnitIdx];
    };
    $('setMinutes').onchange = (e) => {
      Progress.get().minutesGoal = parseInt(e.target.value, 10) || 45;
      Progress.save();
    };
    $('setRate').oninput = (e) => {
      Progress.get().ttsRate = parseFloat(e.target.value);
      Progress.save();
      $('setRateVal').textContent = e.target.value;
    };

    // Voice picker
    populateVoicePicker();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = populateVoicePicker;
    }
    $('setVoice').onchange = (e) => {
      TTS.setVoiceByName(e.target.value);
    };
    $('testVoiceBtn').onclick = () => TTS.speak('Hello, I am your English trainer. Let us learn together!');
    $('reportBtn').onclick = showReport;
    $('resetBtn').onclick = () => {
      if (confirm('确认清空所有进度？此操作不可恢复。')) {
        Progress.reset();
        location.reload();
      }
    };
  }

  function populateVoicePicker() {
    const sel = $('setVoice');
    if (!sel) return;
    const voices = TTS.getAvailableVoices();
    const cur = TTS.getCurrentVoice();
    sel.innerHTML = voices.length
      ? voices.map(v =>
          `<option value="${v.name}" ${cur && v.name === cur.name ? 'selected' : ''}>${v.name} (${v.lang})</option>`
        ).join('')
      : '<option>(没有可用英语音色)</option>';
  }

  function showSettings() {
    showView('viewSettings');
    const s = Progress.get();
    $('setName').value = s.name;
    $('setUnit').value = s.currentUnitIdx;
    $('setMinutes').value = s.minutesGoal;
    $('setRate').value = s.ttsRate;
    $('setRateVal').textContent = s.ttsRate;
    populateVoicePicker();
    document.querySelectorAll('.avatar-chip').forEach(x =>
      x.classList.toggle('on', x.dataset.a === s.avatar));
    renderHotbar('settings');
  }

  function showReport() {
    const week = Progress.weekReport();
    const s = Progress.get();
    const totalDays = week.filter(d => d.completed > 0).length;
    const totalNew = week.reduce((a, d) => a + d.newWords, 0);
    const avgAcc = (() => {
      const ds = week.filter(d => d.accuracy > 0);
      return ds.length ? Math.round(ds.reduce((a, d) => a + d.accuracy, 0) / ds.length) : 0;
    })();

    const html = `
      <div class="report-modal" id="reportModal">
        <div class="report-modal-card">
          <h2>📊 本周学习报告</h2>
          <div class="row"><span>训练师</span><span>${s.name} (Lv.${s.level})</span></div>
          <div class="row"><span>本周学习天数</span><span>${totalDays} / 7 天</span></div>
          <div class="row"><span>连续打卡</span><span>${s.streak} 天</span></div>
          <div class="row"><span>本周新学单词</span><span>${totalNew} 个</span></div>
          <div class="row"><span>累计已学单词</span><span>${Progress.totalWords()} 个</span></div>
          <div class="row"><span>已掌握(对≥3次)</span><span>${Progress.masteredWords()} 个</span></div>
          <div class="row"><span>本周平均准确率</span><span>${avgAcc}%</span></div>
          <div class="row"><span>已读完故事</span><span>${s.readsCompleted.length} 篇</span></div>
          <div class="row"><span>成就</span><span>${s.badges.length} 枚</span></div>
          <h2 style="margin-top:18px;">每日明细</h2>
          ${week.map(d => `
            <div class="row">
              <span>${d.date.slice(5)}</span>
              <span>${d.completed === 0 ? '— 未学习 —'
                : `${d.completed}关 · 新词${d.newWords} · ${d.accuracy}% · ${d.xp}XP`}</span>
            </div>`).join('')}
          <div style="text-align:right;margin-top:18px;">
            <button class="block-btn primary" id="closeReport">关闭</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    $('closeReport').onclick = () => $('reportModal').remove();
  }

  /* ---------------- View utils ---------------- */
  function showView(id) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    $(id).classList.remove('hidden');
    if (id === 'viewHome' || id === 'viewSettings' || id === 'viewStage' || id === 'viewDone') {
      renderHud();
    }
  }

  function bindGlobalEvents() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) TTS.stop();
    });
  }

  /* ---------------- Toast ---------------- */
  function toast(msg, kind, ms) {
    const el = $('toast');
    el.textContent = msg;
    el.className = 'toast' + (kind ? ' ' + kind : '');
    el.classList.remove('hidden');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.add('hidden'), ms || 1500);
  }

  function randEncourage() {
    const list = window.CURRICULUM.encouragements;
    return list[Math.floor(Math.random() * list.length)];
  }

  return { init, toast, randEncourage };
})();

document.addEventListener('DOMContentLoaded', App.init);
