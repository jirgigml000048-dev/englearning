/* ============================================================
 * 阅读关：方块世界主题课文 (book / 纸张) + 选择题
 * - 段落里每个英文词可点 → 听发音
 * - 全文朗读按钮
 * - 错题第一次给提示，第二次揭晓答案，全程无否定语气
 * ============================================================ */
window.ReadingModule = (() => {
  let reading, qIdx, body, footer, onDone, score, attempts, total;

  function start({ unit, body: b, footer: f, onDone: cb }) {
    body = b; footer = f; onDone = cb;
    const unread = unit.readings.find(r => !Progress.get().readsCompleted.includes(r.id));
    reading = unread || unit.readings[0];
    qIdx = 0;
    score = 0;
    attempts = 0;
    total = reading.questions.length;
    renderStory();
  }

  function renderStory() {
    const r = reading;
    const storyHtml = r.paragraphs.map(p => `<p class="book-para">${tappable(p)}</p>`).join('');
    body.innerHTML = `
      <div class="book" id="story">
        <div class="book-title">${r.emoji} ${r.title}</div>
        ${storyHtml}
      </div>
    `;
    footer.innerHTML = `
      <button class="block-btn ghost" id="readAllBtn">🔊 朗读全文</button>
      <button class="block-btn ghost" id="stopBtn">⏹ 停止</button>
      <button class="block-btn primary" id="startQBtn">读完了，开始挑战 →</button>
    `;
    document.getElementById('readAllBtn').onclick = () => TTS.speak(r.paragraphs.join(' '));
    document.getElementById('stopBtn').onclick = () => TTS.stop();
    document.getElementById('startQBtn').onclick = () => { TTS.stop(); renderQuestion(); };
    document.querySelectorAll('#story .tap-word').forEach(el => {
      el.onclick = () => TTS.speak(el.textContent);
    });
    document.getElementById('stageProgress').textContent = '阅读中';
  }

  function tappable(text) {
    return text.replace(/([A-Za-z']+)/g, '<span class="tap-word">$1</span>');
  }

  function renderQuestion() {
    if (qIdx >= total) return finish();
    const q = reading.questions[qIdx];
    attempts = 0;

    body.innerHTML = `
      <div class="reading-q">${qIdx + 1}. ${q.q}</div>
      <div class="vox-options vox-options-stacked" id="qOpts">
        ${q.options.map((o, i) => `<button class="vox-option block-btn" data-i="${i}">${o}</button>`).join('')}
      </div>
      <div id="hintBox"></div>
    `;
    footer.innerHTML = `
      <button class="block-btn ghost" id="rereadBtn">📖 重读课文</button>
    `;

    const opBtns = document.querySelectorAll('#qOpts .vox-option');
    opBtns.forEach(b => {
      b.onclick = () => {
        const chosen = parseInt(b.dataset.i, 10);
        if (chosen === q.answer) {
          b.classList.add('correct');
          opBtns.forEach(x => x.classList.add('disabled'));
          if (attempts === 0) score += 1;
          else if (attempts === 1) score += 0.5;
          App.toast('✓ ' + App.randEncourage(), 'success', 900);
          setTimeout(() => { qIdx++; renderQuestion(); }, 1100);
        } else {
          b.classList.add('retry');
          b.classList.add('disabled');
          attempts++;
          if (attempts === 1) {
            document.getElementById('hintBox').innerHTML =
              `<div class="hint-block">💡 提示：${q.hint}</div>`;
            App.toast('再来一次，你可以的！', 'warn', 1200);
          } else {
            opBtns[q.answer].classList.add('correct');
            opBtns.forEach(x => x.classList.add('disabled'));
            App.toast('记住这道题，下次就会啦', 'warn', 1400);
            setTimeout(() => { qIdx++; renderQuestion(); }, 1700);
          }
        }
      };
    });

    document.getElementById('rereadBtn').onclick = () => renderStory();
    document.getElementById('stageProgress').textContent = `第 ${qIdx + 1} / ${total} 题`;
  }

  function finish() {
    const accuracy = Math.round((score / total) * 100);
    const p = Progress.get();
    if (!p.readsCompleted.includes(reading.id)) p.readsCompleted.push(reading.id);
    Progress.completeStage('reading', { accuracy, xp: 40 });
    onDone({ accuracy, score, total });
  }

  return { start };
})();
