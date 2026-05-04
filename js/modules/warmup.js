/* ============================================================
 * 热身关：复习昨天/最近学过的单词
 * 看图选词（emoji + 中文 -> 选英文）— 方块世界皮肤
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

    pool = wordObjs.length < 4 ? unit.words.slice(0, 5) : wordObjs;
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
      <div class="stage-prompt">看图选词 · 复习昨日</div>
      <div class="big-emoji">${w.emoji}</div>
      <div class="stage-cn">${w.cn}</div>
      <div class="vox-options" id="warmOpts">
        ${opts.map((o, i) => `<button class="vox-option block-btn" data-i="${i}">${o.en}</button>`).join('')}
      </div>
      <div id="warmFeedback"></div>
    `;
    footer.innerHTML = `
      <button class="block-btn ghost" id="speakBtn">🔊 再听一遍</button>
    `;
    document.getElementById('speakBtn').onclick = () => TTS.speakWord(w.en);
    TTS.speakWord(w.en);

    const opBtns = document.querySelectorAll('#warmOpts .vox-option');
    opBtns.forEach(b => {
      b.onclick = () => {
        const chosen = parseInt(b.dataset.i, 10);
        opBtns.forEach(x => x.classList.add('disabled'));
        const fb = document.getElementById('warmFeedback');
        if (chosen === correctIdx) {
          b.classList.add('correct');
          correct++;
          Progress.recordWord(w.en, true);
          fb.innerHTML = `<div class="encourage">${App.randEncourage()}</div>`;
          setTimeout(() => { idx++; renderQuestion(); }, 800);
        } else {
          b.classList.add('retry');
          opBtns[correctIdx].classList.add('correct');
          Progress.recordWord(w.en, false);
          fb.innerHTML = `<div class="retry-tip">${window.CURRICULUM.retryTips[0]}</div>`;
          setTimeout(() => { idx++; renderQuestion(); }, 1400);
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
