/* ============================================================
 * 阅读关：方块世界主题课文 (book/纸张) + 选择题 + 翻译回看
 * 流程：
 *   1) story  课文阅读（每个英文词可点听发音）
 *   2) quiz   逐题答题（错→提示→再错→揭晓答案 + 讲解）
 *   3) review 翻译回看（英文+中文对照，巩固理解）
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

  /* ---------------- Story ---------------- */
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

  /* ---------------- Quiz ---------------- */
  function renderQuestion() {
    if (qIdx >= total) return renderTranslationReview();
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
          // 答对也展示讲解（强化记忆）
          if (q.explanation) {
            document.getElementById('hintBox').innerHTML =
              `<div class="explanation-block">📘 讲解：${q.explanation}</div>`;
          }
          App.toast('✓ ' + App.randEncourage(), 'success', 1100);
          setTimeout(() => { qIdx++; renderQuestion(); }, 2400);
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
            // 揭晓答案 + 讲解
            const explHtml = q.explanation
              ? `<div class="explanation-block">📘 讲解：${q.explanation}</div>` : '';
            document.getElementById('hintBox').innerHTML = explHtml + `
              <div style="text-align:center;margin-top:14px;">
                <button class="block-btn primary" id="continueBtn">看懂了，继续 →</button>
              </div>`;
            // 等用户主动点继续，不强行 setTimeout 跳走 (讲解需要时间消化)
            document.getElementById('continueBtn').onclick = () => {
              qIdx++; renderQuestion();
            };
            App.toast('记住这道题，下次就会啦', 'warn', 1400);
          }
        }
      };
    });

    document.getElementById('rereadBtn').onclick = () => renderStory();
    document.getElementById('stageProgress').textContent = `第 ${qIdx + 1} / ${total} 题`;
  }

  /* ---------------- Translation Review (英中对照) ---------------- */
  function renderTranslationReview() {
    const r = reading;
    const hasZh = Array.isArray(r.paragraphsZh) && r.paragraphsZh.length === r.paragraphs.length;
    if (!hasZh) return finish(); // 没翻译数据就直接结束

    const rows = r.paragraphs.map((p, i) => `
      <div class="review-row">
        <p class="book-para">${tappable(p)}</p>
        <p class="book-para-zh">${r.paragraphsZh[i]}</p>
      </div>
    `).join('');

    body.innerHTML = `
      <div class="book book-review" id="story">
        <div class="book-title">${r.emoji} ${r.title} · 翻译回看</div>
        <div class="review-hint-text">📖 答完题再读一遍，看看每段中文意思。点英文词可以听发音。</div>
        ${rows}
      </div>
    `;
    footer.innerHTML = `
      <button class="block-btn ghost" id="readAllBtn">🔊 再朗读一遍</button>
      <button class="block-btn primary" id="finishBtn">完成关卡 →</button>
    `;
    document.getElementById('readAllBtn').onclick = () => TTS.speak(r.paragraphs.join(' '));
    document.getElementById('finishBtn').onclick = () => { TTS.stop(); finish(); };
    document.querySelectorAll('#story .tap-word').forEach(el => {
      el.onclick = () => TTS.speak(el.textContent);
    });
    document.getElementById('stageProgress').textContent = '翻译回看';
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
