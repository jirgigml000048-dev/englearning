/* ============================================================
 * 主控制器：视图切换 / 设置 / 主页 / Stage 调度
 * ============================================================ */
window.App = (() => {
  const $ = (id) => document.getElementById(id);

  let currentUnit;

  function init() {
    Progress.tick();
    currentUnit = window.CURRICULUM.units[Progress.get().currentUnitIdx] || window.CURRICULUM.units[0];

    renderTrainerCard();
    renderHome();
    bindGlobalEvents();

    // 初始化设置面板
    bindSettings();

    // PWA: 注册 service worker（可选，本地能用）
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js').catch(() => {});
    }
  }

  function renderTrainerCard() {
    const s = Progress.get();
    $('trainerName').textContent = s.name;
    $('trainerAvatar').textContent = s.avatar;
    $('statLevel').textContent = s.level;
    $('statStreak').textContent = s.streak;
    $('statXp').textContent = s.xp;
    const need = s.level * 100;
    $('xpFill').style.width = Math.min(100, (s.xp / need) * 100) + '%';
  }

  function renderHome() {
    const s = Progress.get();
    showView('viewHome');

    const stages = ['warmup','words','reading','fun'];
    stages.forEach(stage => {
      const btn = document.querySelector(`.mission[data-stage="${stage}"]`);
      const status = btn.querySelector('.mission-status');
      if (Progress.isStageCompleteToday(stage)) {
        btn.classList.add('completed');
        status.textContent = '✓';
      } else {
        btn.classList.remove('completed');
        status.textContent = '▶';
      }
      btn.onclick = () => startStage(stage);
    });

    // 问候 & 当前宝可梦伙伴（按等级换）
    const greetings = [
      '准备好今天的训练了吗？',
      '今天也要变强一点点哦！',
      '冒险的一天开始啦！',
      `已经连续 ${s.streak} 天啦，继续！`
    ];
    $('greeting').textContent = s.streak >= 1
      ? `你好，${s.name}！${greetings[Math.min(s.streak, 3)]}`
      : `你好，${s.name}！${greetings[0]}`;

    const partners = ['🐢','🐭','🦊','🐉','🌟'];
    $('heroMon').textContent = partners[Math.min(s.level - 1, partners.length - 1)];

    const done = Progress.todayCompletedCount();
    $('missionSummary').textContent = done === 4
      ? `🎉 今日 4 关全部完成！明天继续训练。`
      : `今日任务：${done}/4 关 · 当前单元 ${currentUnit.name}`;

    renderBadges();
  }

  function renderBadges() {
    const s = Progress.get();
    const all = window.CURRICULUM.badges;
    $('badges').innerHTML = all.map(b => {
      const owned = s.badges.includes(b.id);
      return `<div class="badge ${owned ? '' : 'locked'}" title="${b.name}">${b.icon}</div>`;
    }).join('');
  }

  function startStage(stage) {
    const stageTitles = {
      warmup: '🔁 热身复习',
      words:  '📚 新词学习',
      reading:'📖 阅读冒险',
      fun:    '🎮 拼写打怪'
    };
    showView('viewStage');
    $('stageTitle').textContent = stageTitles[stage];
    $('stageProgress').textContent = '';
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
  }

  function onStageDone(stage, result) {
    TTS.stop();
    renderTrainerCard();
    const newBadges = Progress.checkBadges();
    if (newBadges && newBadges.length) {
      newBadges.forEach(b => toast(`🏅 解锁徽章：${b.name}`, 'success', 2200));
    }

    // 4 关全完成 -> 显示完成页
    const allDone = ['warmup','words','reading','fun'].every(s => Progress.isStageCompleteToday(s));
    if (allDone) {
      showDone();
      return;
    }
    // 否则回主页
    setTimeout(() => renderHome(), 600);
  }

  function showDone() {
    const s = Progress.get();
    const today = new Date().toISOString().slice(0, 10);
    const log = s.dailyLog[today] || { newWords: 0, accuracy: 0, xp: 0 };
    showView('viewDone');
    $('doneNewWords').textContent = log.newWords;
    $('doneAccuracy').textContent = (log.accuracy || 0) + '%';
    $('doneXp').textContent = '+' + log.xp;
    const partners = ['🥳','🎉','🏆','⭐','🌟'];
    $('doneMon').textContent = partners[Math.floor(Math.random() * partners.length)];

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const yLog = s.dailyLog[yesterday];
    let msg;
    if (yLog && log.newWords > yLog.newWords) {
      msg = `今天比昨天多学了 ${log.newWords - yLog.newWords} 个新词，太棒了！`;
    } else if (s.streak >= 7) {
      msg = `连续 ${s.streak} 天坚持，你是真正的训练师！`;
    } else if (s.streak >= 3) {
      msg = `连续 ${s.streak} 天打卡，继续保持！`;
    } else {
      msg = '完成今天的训练，你又强了一点点！';
    }
    $('doneMessage').textContent = msg;

    $('doneBackBtn').onclick = () => renderHome();
  }

  /* ---------------- Settings ---------------- */
  function bindSettings() {
    $('settingsBtn').onclick = () => showSettings();
    $('settingsBack').onclick = () => renderHome();
    $('stageBack').onclick = () => {
      TTS.stop();
      if (confirm('当前关卡未完成，确认返回主页？')) renderHome();
    };

    // 单元选择
    const sel = $('setUnit');
    sel.innerHTML = window.CURRICULUM.units.map((u, i) =>
      `<option value="${i}">${u.name} · ${u.cn}</option>`
    ).join('');

    // 头像
    const av = $('avatarPicker');
    av.innerHTML = window.CURRICULUM.avatars.map(a =>
      `<div class="avatar-opt" data-a="${a}">${a}</div>`
    ).join('');
    av.onclick = (e) => {
      const opt = e.target.closest('.avatar-opt');
      if (!opt) return;
      const s = Progress.get();
      s.avatar = opt.dataset.a;
      Progress.save();
      av.querySelectorAll('.avatar-opt').forEach(x => x.classList.toggle('active', x.dataset.a === s.avatar));
      renderTrainerCard();
    };

    $('setName').oninput = (e) => {
      Progress.get().name = e.target.value || '小训练师';
      Progress.save();
      renderTrainerCard();
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
    $('reportBtn').onclick = showReport;
    $('resetBtn').onclick = () => {
      if (confirm('确认清空所有进度？此操作不可恢复。')) {
        Progress.reset();
        location.reload();
      }
    };

    $('doneBackBtn') && ( $('doneBackBtn').onclick = () => renderHome() );
  }

  function showSettings() {
    showView('viewSettings');
    const s = Progress.get();
    $('setName').value = s.name;
    $('setUnit').value = s.currentUnitIdx;
    $('setMinutes').value = s.minutesGoal;
    $('setRate').value = s.ttsRate;
    $('setRateVal').textContent = s.ttsRate;
    document.querySelectorAll('.avatar-opt').forEach(x =>
      x.classList.toggle('active', x.dataset.a === s.avatar));
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
          <div class="row"><span>徽章</span><span>${s.badges.length} 枚</span></div>
          <h3 style="margin:18px 0 10px;font-size:16px;color:var(--text-dim);">每日明细</h3>
          ${week.map(d => `
            <div class="row">
              <span>${d.date.slice(5)}</span>
              <span>${d.completed === 0 ? '— 未学习 —'
                : `${d.completed}关 · 新词${d.newWords} · 准确率${d.accuracy}% · ${d.xp}XP`}</span>
            </div>`).join('')}
          <div style="text-align:right;margin-top:18px;">
            <button class="btn-primary" id="closeReport">关闭</button>
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
    if (id === 'viewHome' || id === 'viewSettings') renderTrainerCard();
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
