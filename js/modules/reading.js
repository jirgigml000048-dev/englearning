/* ============================================================
 * 阅读关：宝可梦/我的世界主题短文 + 选择题
 * 特点：
 * - 课文段落可以点击单个英文单词听发音（弱化生词压力）
 * - 全文整段朗读按钮
 * - 错题提示而非否定，鼓励再次尝试
 * - 第一次错给提示 -> 第二次错揭晓答案
 * ============================================================ */
window.ReadingModule = (() => {
  let reading, qIdx, body, footer, onDone, score, attempts, total;

  function start({ unit, body: b, footer: f, onDone: cb }) {
    body = b; footer = f; onDone = cb;
    // 选一个未读过的，没有就随机一个
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
    const storyHtml = r.paragraphs.map(p => `<p>${tappable(p)}</p>`).join('');
    body.innerHTML = `
      <div>
        <div class="reading-story" id="story">
          <h3>${r.emoji} ${r.title}</h3>
          ${storyHtml}
        </div>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
          <button class="speak-btn" id="readAllBtn">🔊 朗读全文</button>
          <button class="btn-ghost" id="stopBtn">⏹ 停止</button>
        </div>
      </div>
    `;
    footer.innerHTML = `
      <button class="btn-primary" id="startQBtn">读完了，开始做题 →</button>
    `;
    document.getElementById('readAllBtn').onclick = () => {
      TTS.speak(r.paragraphs.join(' '));
    };
    document.getElementById('stopBtn').onclick = () => TTS.stop();
    document.getElementById('startQBtn').onclick = () => { TTS.stop(); renderQuestion(); };
    document.querySelectorAll('#story .tap-word').forEach(el => {
      el.onclick = () => TTS.speak(el.textContent);
    });
    document.getElementById('stageProgress').textContent = '阅读中';
  }

  function tappable(text) {
    // 把每个英文单词包成可点击
    return text.replace(/([A-Za-z']+)/g, '<span class="tap-word">$1</span>');
  }

  function renderQuestion() {
    if (qIdx >= total) return finish();
    const q = reading.questions[qIdx];
    attempts = 0;

    body.innerHTML = `
      <div>
        <div class="reading-q">${qIdx + 1}. ${q.q}</div>
        <div class="options" id="qOpts">
          ${q.options.map((o, i) => `<button class="option" data-i="${i}">${o}</button>`).join('')}
        </div>
        <div id="hintBox"></div>
        <div style="text-align:center;margin-top:18px;">
          <button class="btn-ghost" id="rereadBtn">📖 重新阅读课文</button>
        </div>
      </div>
    `;
    footer.innerHTML = '';

    const opBtns = document.querySelectorAll('#qOpts .option');
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
          b.classList.add('wrong');
          b.classList.add('disabled');
          attempts++;
          if (attempts === 1) {
            // 给提示
            document.getElementById('hintBox').innerHTML =
              `<div class="reading-hint">💡 提示：${q.hint}</div>`;
            App.toast('再试一次，你可以的！', 'warn', 1200);
          } else {
            // 揭晓答案
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
