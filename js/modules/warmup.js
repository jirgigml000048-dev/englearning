/* ============================================================
 * 热身关：复习昨天/最近学过的单词（如果没有则用本单元前几个词）
 * 形式：英文 -> 选中文 (快闪)
 * ============================================================ */
window.WarmupModule = (() => {
  let pool, idx, body, footer, onDone, correct = 0, total = 0;

  function start({ unit, body: b, footer: f, onDone: cb }) {
    body = b; footer = f; onDone = cb;
    correct = 0; total = 0; idx = 0;

    const reviewWords = Progress.reviewCandidates(6);
    const allWords = window.CURRICULUM.units.flatMap(u => u.words);
    const wordObjs = reviewWords
      .map(en => allWords.find(w => w.en === en))
      .filter(Boolean);

    if (wordObjs.length < 4) {
      // 第一次使用，用当前单元前 5 个词
      pool = unit.words.slice(0, 5);
    } else {
      pool = wordObjs;
    }
    renderQuestion();
  }

  function renderQuestion() {
    if (idx >= pool.length) return finish();
    total++;
    const w = pool[idx];
    const allWords = window.CURRICULUM.units.flatMap(u => u.words);
    const distractors = allWords
      .filter(x => x.en !== w.en)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const opts = [...distractors, w].sort(() => Math.random() - 0.5);
    const correctIdx = opts.indexOf(w);

    body.innerHTML = `
      <div class="word-card">
        <div class="word-image">${w.emoji}</div>
        <div class="word-en">${w.en}</div>
        <button class="speak-btn" id="speakBtn">🔊 再听一遍</button>
        <div style="color:var(--text-dim);margin-top:12px;">这个词是什么意思？</div>
        <div class="options" id="warmOpts">
          ${opts.map((o, i) => `<button class="option" data-i="${i}">${o.cn}</button>`).join('')}
        </div>
      </div>
    `;
    footer.innerHTML = '';
    document.getElementById('speakBtn').onclick = () => TTS.speak(w.en);
    TTS.speak(w.en);

    const opBtns = document.querySelectorAll('#warmOpts .option');
    opBtns.forEach(b => {
      b.onclick = () => {
        const chosen = parseInt(b.dataset.i, 10);
        opBtns.forEach(x => x.classList.add('disabled'));
        if (chosen === correctIdx) {
          b.classList.add('correct');
          correct++;
          Progress.recordWord(w.en, true);
          App.toast('✓ 很棒！', 'success', 800);
          setTimeout(() => { idx++; renderQuestion(); }, 700);
        } else {
          b.classList.add('wrong');
          opBtns[correctIdx].classList.add('correct');
          Progress.recordWord(w.en, false);
          setTimeout(() => { idx++; renderQuestion(); }, 1300);
        }
      };
    });

    document.getElementById('stageProgress').textContent = `${idx + 1} / ${pool.length}`;
  }

  function finish() {
    const accuracy = total ? Math.round((correct / total) * 100) : 100;
    Progress.completeStage('warmup', { accuracy, xp: 15 });
    onDone({ accuracy });
  }

  return { start };
})();
