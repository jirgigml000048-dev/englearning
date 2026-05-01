/* ============================================================
 * 趣味关：拼写打怪兽
 * 屏幕中央出现一只"怪兽"（emoji），上面显示中文意思
 * 玩家点击字母按钮拼出英文，每拼对一个字母怪兽掉血，
 * 拼完整个词 -> 怪兽倒下 -> 下一只
 * ============================================================ */
window.FunModule = (() => {
  let pool, idx, body, footer, onDone;
  let target, typed, hp, total, correctCount;

  const MOBS = ['👾','🧟','🐉','👹','🦖','🤖','👻','🐙'];

  function start({ unit, body: b, footer: f, onDone: cb }) {
    body = b; footer = f; onDone = cb;
    pool = unit.words.slice().sort(() => Math.random() - 0.5).slice(0, 5);
    idx = 0;
    correctCount = 0;
    total = pool.length;
    nextMob();
  }

  function nextMob() {
    if (idx >= pool.length) return finish();
    target = pool[idx];
    typed = '';
    hp = target.en.length;
    render();
  }

  function render() {
    const mob = MOBS[idx % MOBS.length];
    const slots = target.en.split('').map((ch, i) => {
      const filled = i < typed.length;
      return `<div class="spell-slot ${filled ? 'filled' : ''}">${filled ? typed[i] : ''}</div>`;
    }).join('');

    // 字母池：目标词字母 + 随机干扰，洗牌
    const targetLetters = target.en.toLowerCase().split('');
    const extras = randomLetters(Math.max(2, 8 - targetLetters.length));
    const allLetters = [...targetLetters, ...extras].sort(() => Math.random() - 0.5);

    const hpPct = (hp / target.en.length) * 100;

    body.innerHTML = `
      <div>
        <div class="spell-mob">
          <div class="spell-mob-emoji">${mob}</div>
          <div class="spell-mob-hp"><div class="spell-mob-hp-fill" style="width:${hpPct}%"></div></div>
        </div>
        <div class="spell-prompt">拼出这个单词，打败怪兽！🔊</div>
        <div class="spell-cn">${target.cn} ${target.emoji}</div>
        <div class="spell-input">${slots}</div>
        <div class="spell-letters" id="letters">
          ${allLetters.map((l, i) => `<button class="letter-btn" data-l="${l}" data-idx="${i}">${l}</button>`).join('')}
        </div>
        <div style="text-align:center;margin-top:14px;">
          <button class="btn-ghost" id="hearBtn">🔊 听发音</button>
          <button class="btn-ghost" id="undoBtn">⌫ 撤销</button>
        </div>
      </div>
    `;
    footer.innerHTML = '';
    document.getElementById('hearBtn').onclick = () => TTS.speak(target.en);
    document.getElementById('undoBtn').onclick = () => {
      if (typed.length > 0) {
        typed = typed.slice(0, -1);
        hp = target.en.length - typed.length;
        render();
      }
    };

    document.querySelectorAll('#letters .letter-btn').forEach(btn => {
      btn.onclick = () => {
        const letter = btn.dataset.l;
        const expected = target.en[typed.length].toLowerCase();
        if (letter === expected) {
          typed += target.en[typed.length]; // 保持原大小写
          btn.classList.add('used');
          hp -= 1;
          if (typed.length === target.en.length) {
            // 打败！
            correctCount++;
            Progress.recordWord(target.en, true);
            TTS.speak(target.en);
            App.toast('🎉 打败了一只怪兽！', 'success', 1100);
            setTimeout(() => { idx++; nextMob(); }, 1100);
          } else {
            render();
          }
        } else {
          // 错的字母：抖动 + 不消耗，但记一笔
          btn.classList.add('wrong');
          setTimeout(() => btn.classList.remove('wrong'), 400);
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
