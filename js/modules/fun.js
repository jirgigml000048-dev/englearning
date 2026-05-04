/* ============================================================
 * 拼写打怪关：方块世界皮肤
 * 像素史莱姆怪兽（CSS-only）+ HP 条 + 字母方块键盘
 * 拼对一个字母 -> HP 掉一点；拼完整个词 -> 击败 -> 下一只
 * ============================================================ */
window.FunModule = (() => {
  let pool, idx, body, footer, onDone;
  let target, typed, total, correctCount;

  // mob 类型：每只用不同的颜色 (mob-pixel + mob-{type})
  const MOB_NAMES = [
    { name: 'SLIME · 史莱姆',  cls: '' },
    { name: 'CREEPER · 苦力怕', cls: '' },
    { name: 'ZOMBIE · 僵尸',   cls: '' },
    { name: 'SKELETON · 骷髅', cls: '' },
    { name: 'ENDER · 末影怪',  cls: '' },
  ];

  function start({ unit, body: b, footer: f, onDone: cb }) {
    body = b; footer = f; onDone = cb;

    // 优先抽错题本里属于当前 unit 的词，最多 2 道；剩余从本 unit 随机
    const errors = Progress.errorBookCandidates(10);
    const fromUnit = unit.words.filter(w => errors.includes(w.en)).slice(0, 2);
    const remaining = unit.words
      .filter(w => !fromUnit.some(e => e.en === w.en))
      .sort(() => Math.random() - 0.5)
      .slice(0, 5 - fromUnit.length);
    pool = [...fromUnit, ...remaining].sort(() => Math.random() - 0.5);

    idx = 0;
    correctCount = 0;
    total = pool.length;
    nextMob();
  }

  function nextMob() {
    if (idx >= pool.length) return finish();
    target = pool[idx];
    typed = '';
    render();
  }

  function render() {
    const mob = MOB_NAMES[idx % MOB_NAMES.length];
    const slots = target.en.split('').map((ch, i) => {
      const filled = i < typed.length;
      return `<div class="spell-slot ${filled ? 'filled' : ''}">${filled ? typed[i] : ''}</div>`;
    }).join('');

    // 字母池：目标词字母 + 随机干扰
    const targetLetters = target.en.toLowerCase().split('');
    const extras = randomLetters(Math.max(2, 8 - targetLetters.length));
    const allLetters = [...targetLetters, ...extras].sort(() => Math.random() - 0.5);

    const hp = Math.round(((target.en.length - typed.length) / target.en.length) * 100);

    body.innerHTML = `
      <div class="mob-arena">
        <div class="mob-creature">
          <div class="mob-pixel ${mob.cls}"></div>
          <div class="mob-shadow"></div>
        </div>
        <div class="mob-name">${mob.name}</div>
        <div class="mob-hp">
          <div class="mob-hp-bar"><div class="mob-hp-fill" style="width:${hp}%"></div></div>
          <span>HP ${hp}</span>
        </div>
      </div>
      <div class="spell-prompt">拼出："${target.cn}" → ${target.emoji}</div>
      <div class="spell-slots">${slots}</div>
      <div class="spell-keys" id="letters">
        ${allLetters.map((l, i) => `<button class="key-block block-btn" data-l="${l}" data-idx="${i}">${l}</button>`).join('')}
        <button class="key-block block-btn key-back" id="keyBack">⌫</button>
      </div>
    `;
    footer.innerHTML = `
      <button class="block-btn ghost" id="hearBtn">🔊 听发音</button>
    `;
    document.getElementById('hearBtn').onclick = () => TTS.speak(target.en);
    document.getElementById('keyBack').onclick = () => {
      if (typed.length > 0) {
        typed = typed.slice(0, -1);
        render();
      }
    };

    document.querySelectorAll('#letters .key-block:not(.key-back)').forEach(btn => {
      btn.onclick = () => {
        const letter = btn.dataset.l;
        const expected = target.en[typed.length].toLowerCase();
        if (letter === expected) {
          typed += target.en[typed.length];
          if (typed.length === target.en.length) {
            correctCount++;
            Progress.recordWord(target.en, true);
            TTS.speak(target.en);
            App.toast('🎉 击败一只怪物！', 'success', 1100);
            setTimeout(() => { idx++; nextMob(); }, 1100);
          } else {
            render();
          }
        } else {
          // 错的字母：用 retry 类抖一下，不消耗
          btn.classList.add('retry');
          setTimeout(() => btn.classList.remove('retry'), 400);
        }
      };
    });

    document.getElementById('stageProgress').textContent = `${idx + 1} / ${pool.length}`;
  }

  function randomLetters(n) {
    const out = [];
    for (let i = 0; i < n; i++) {
      out.push(String.fromCharCode(97 + Math.floor(Math.random() * 26)));
    }
    return out;
  }

  function finish() {
    const accuracy = Math.round((correctCount / total) * 100);
    Progress.completeStage('fun', { accuracy, xp: 20 });
    onDone({ accuracy });
  }

  return { start };
})();
