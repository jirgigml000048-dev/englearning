/* ============================================================
 * 新词学习关：每个单词卡片 (图 + 拼写 + 中文 + 例句 + TTS)
 * 学完后做一个简短的"看图选词"小测，巩固记忆。
 * ============================================================ */
window.WordsModule = (() => {
  let unit, idx, words, body, footer, onDone, mode, quizQ, quizCorrect, quizTotal;

  function start({ unit: u, body: b, footer: f, onDone: cb }) {
    unit = u;
    words = u.words;
    idx = 0;
    body = b;
    footer = f;
    onDone = cb;
    mode = 'study'; // study -> quiz
    quizCorrect = 0;
    quizTotal = 0;
    renderStudy();
  }

  function renderStudy() {
    const w = words[idx];
    body.innerHTML = `
      <div class="word-card">
        <div class="word-image">${w.emoji}</div>
        <div class="word-en">${w.en}</div>
        <div class="word-phonetic">${w.ipa || ''}</div>
        <div class="word-cn">${w.cn}</div>
        <button class="speak-btn" id="speakBtn">🔊 听一听</button>
        <div class="word-example">${w.sentence}</div>
      </div>
    `;
    footer.innerHTML = `
      <button class="btn-ghost" id="prevBtn" ${idx === 0 ? 'disabled' : ''}>上一个</button>
      <button class="btn-primary" id="nextBtn">${idx === words.length - 1 ? '进入小测 →' : '下一个 →'}</button>
    `;
    document.getElementById('speakBtn').onclick = () => TTS.speak(w.en);
    document.getElementById('prevBtn').onclick = () => { if (idx > 0) { idx--; renderStudy(); } };
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
    // 干扰项
    const distractors = words.filter((_, i) => i !== idx).sort(() => Math.random() - 0.5).slice(0, 3);
    const opts = [...distractors, correctWord].sort(() => Math.random() - 0.5);
    const correctIdx = opts.indexOf(correctWord);

    body.innerHTML = `
      <div class="word-card">
        <div class="word-image">${correctWord.emoji}</div>
        <div class="word-cn">${correctWord.cn}</div>
        <div style="margin-top:12px;color:var(--text-dim);">选对应的英文单词：</div>
        <div class="options" id="quizOptions">
          ${opts.map((o, i) => `<button class="option" data-i="${i}">${o.en}</button>`).join('')}
        </div>
      </div>
    `;
    footer.innerHTML = '';

    const optBtns = document.querySelectorAll('#quizOptions .option');
    optBtns.forEach(btn => {
      btn.onclick = () => {
        const chosen = parseInt(btn.dataset.i, 10);
        optBtns.forEach(b => b.classList.add('disabled'));
        if (chosen === correctIdx) {
          btn.classList.add('correct');
          quizCorrect++;
          Progress.recordWord(correctWord.en, true);
          App.toast('✓ ' + App.randEncourage(), 'success', 1100);
          setTimeout(() => { idx++; renderQuiz(); }, 900);
        } else {
          btn.classList.add('wrong');
          optBtns[correctIdx].classList.add('correct');
          Progress.recordWord(correctWord.en, false);
          App.toast('差一点～再记一下', 'warn', 1500);
          setTimeout(() => { idx++; renderQuiz(); }, 1500);
        }
      };
    });
    updateProgress();
  }

  function updateProgress() {
    const total = mode === 'study' ? words.length : words.length;
    const cur = idx + 1;
    document.getElementById('stageProgress').textContent = `${mode === 'study' ? '学' : '测'} ${cur} / ${total}`;
  }

  function finish() {
    const accuracy = Math.round((quizCorrect / quizTotal) * 100);
    Progress.completeStage('words', { newWords: words.length, accuracy, xp: 25 });
    onDone({ newWords: words.length, accuracy });
  }

  return { start };
})();
