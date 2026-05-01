/* ============================================================
 * 新词学习关：单词卡（word-tooltip 像素工具提示风）+ 看图选词小测
 * 方块世界皮肤
 * ============================================================ */
window.WordsModule = (() => {
  let unit, idx, words, body, footer, onDone, mode, quizCorrect, quizTotal;

  function start({ unit: u, body: b, footer: f, onDone: cb }) {
    unit = u;
    words = u.words;
    idx = 0;
    body = b;
    footer = f;
    onDone = cb;
    mode = 'study';
    quizCorrect = 0;
    quizTotal = 0;
    renderStudy();
  }

  function renderStudy() {
    const w = words[idx];
    body.innerHTML = `
      <div class="word-tooltip">
        <div class="tooltip-corner tl"></div>
        <div class="tooltip-corner tr"></div>
        <div class="tooltip-corner bl"></div>
        <div class="tooltip-corner br"></div>
        <div class="word-emoji">${w.emoji}</div>
        <div class="word-en">${w.en}</div>
        <div class="word-ipa">${w.ipa || ''}</div>
        <div class="word-cn">${w.cn}</div>
        <button class="speak-block block-btn" id="speakBtn">🔊 朗读</button>
        <div class="word-sentence">"${w.sentence}"</div>
        <div class="word-rarity">★ COMMON ITEM</div>
      </div>
    `;
    footer.innerHTML = `
      <button class="block-btn ghost" id="prevBtn" ${idx === 0 ? 'disabled' : ''}>← 上一个</button>
      <button class="block-btn primary" id="nextBtn">${idx === words.length - 1 ? '进入小测 →' : '记住了 →'}</button>
    `;
    document.getElementById('speakBtn').onclick = () => TTS.speak(w.en);
    document.getElementById('prevBtn').onclick = () => {
      if (idx > 0) { idx--; renderStudy(); }
    };
    document.getElementById('nextBtn').onclick = () => {
      if (idx < words.length - 1) { idx++; renderStudy(); TTS.speak(words[idx].en); }
      else { mode = 'quiz'; idx = 0; renderQuiz(); }
    };
    updateProgress();
    TTS.speak(w.en);
  }

  function renderQuiz() {
    if (idx >= words.length) return finish();
    const correctWord = words[idx];
    quizTotal++;
    const distractors = words.filter((_, i) => i !== idx).sort(() => Math.random() - 0.5).slice(0, 3);
    const opts = [...distractors, correctWord].sort(() => Math.random() - 0.5);
    const correctIdx = opts.indexOf(correctWord);

    body.innerHTML = `
      <div class="stage-prompt">这是哪个单词？</div>
      <div class="big-emoji">${correctWord.emoji}</div>
      <div class="vox-options" id="quizOptions">
        ${opts.map((o, i) => `<button class="vox-option block-btn" data-i="${i}">${o.en}</button>`).join('')}
      </div>
      <div id="quizFeedback"></div>
    `;
    footer.innerHTML = '';

    const optBtns = document.querySelectorAll('#quizOptions .vox-option');
    optBtns.forEach(btn => {
      btn.onclick = () => {
        const chosen = parseInt(btn.dataset.i, 10);
        optBtns.forEach(b => b.classList.add('disabled'));
        const fb = document.getElementById('quizFeedback');
        if (chosen === correctIdx) {
          btn.classList.add('correct');
          quizCorrect++;
          Progress.recordWord(correctWord.en, true);
          fb.innerHTML = `<div class="encourage">${App.randEncourage()}</div>`;
          setTimeout(() => { idx++; renderQuiz(); }, 900);
        } else {
          btn.classList.add('retry');
          optBtns[correctIdx].classList.add('correct');
          Progress.recordWord(correctWord.en, false);
          fb.innerHTML = `<div class="retry-tip">${window.CURRICULUM.retryTips[0]}</div>`;
          setTimeout(() => { idx++; renderQuiz(); }, 1400);
        }
      };
    });
    updateProgress();
  }

  function updateProgress() {
    const cur = idx + 1;
    document.getElementById('stageProgress').textContent = `${mode === 'study' ? '学' : '测'} ${cur} / ${words.length}`;
  }

  function finish() {
    const accuracy = Math.round((quizCorrect / quizTotal) * 100);
    Progress.completeStage('words', { newWords: words.length, accuracy, xp: 25 });
    onDone({ newWords: words.length, accuracy });
  }

  return { start };
})();
