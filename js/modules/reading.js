/* ============================================================
 * 阅读关：方块世界主题课文 (book/纸张) + 跟读 + 选择题 + 翻译回看
 * 流程：
 *   1) story     课文阅读 (每个英文词可点听发音)
 *   2) readalong 跟读关 (一段一段, 录音 + 单词重合率检查)
 *   3) quiz      逐题答题 (错 → 提示 → 再错 → 揭晓答案 + 讲解)
 *   4) review    翻译回看 (英中对照, 巩固理解)
 * ============================================================ */
window.ReadingModule = (() => {
  let reading, qIdx, body, footer, onDone, score, attempts, total;
  let paraIdx, attemptIdx, recognition;

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
    const themeBadge = window.CURRICULUM.themeBadge[r.theme];
    const banner = themeBadge
      ? `<div class="theme-banner" style="border-color:${themeBadge.color};color:${themeBadge.color};">${themeBadge.icon} ${themeBadge.label}</div>`
      : '';
    body.innerHTML = `
      ${banner}
      <div class="book" id="story">
        <div class="book-title">${r.emoji} ${r.title}</div>
        ${storyHtml}
      </div>
    `;
    footer.innerHTML = `
      <button class="block-btn ghost" id="readAllBtn">🔊 朗读全文</button>
      <button class="block-btn ghost" id="stopBtn">⏹ 停止</button>
      <button class="block-btn primary" id="startQBtn">读完了，开始跟读 →</button>
    `;
    document.getElementById('readAllBtn').onclick = () => TTS.speak(r.paragraphs.join(' '));
    document.getElementById('stopBtn').onclick = () => TTS.stop();
    document.getElementById('startQBtn').onclick = () => { TTS.stop(); renderReadAlong(); };
    document.querySelectorAll('#story .tap-word').forEach(el => {
      el.onclick = () => TTS.speak(el.textContent);
    });
    document.getElementById('stageProgress').textContent = '阅读中';
  }

  function tappable(text) {
    return text.replace(/([A-Za-z']+)/g, '<span class="tap-word">$1</span>');
  }

  /* ---------------- Read-Along (跟读 + 录音检查) ---------------- */
  function renderReadAlong() {
    const r = reading;
    if (!r.paragraphs.length) return renderQuestion();
    paraIdx = 0;
    attemptIdx = 0;
    showReadAlongPara();
  }

  function showReadAlongPara() {
    const r = reading;
    const p = r.paragraphs[paraIdx];
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const supported = !!SR;

    body.innerHTML = `
      <div class="readalong-panel">
        <div class="ra-progress">🎤 跟读 · 第 ${paraIdx + 1} / ${r.paragraphs.length} 段</div>
        <div class="ra-paragraph">${tappable(p)}</div>
        <div class="ra-status" id="raStatus">${supported ? '点 🎤 大声读出这段' : '⚠ 当前浏览器不支持录音识别。请大声读完后点"我读完了"。'}</div>
        <div class="ra-recognized" id="raRecognized"></div>
      </div>
    `;
    footer.innerHTML = `
      <button class="block-btn ghost" id="raListen">🔊 听一遍</button>
      <button class="block-btn primary" id="raStart">${supported ? '🎤 开始跟读' : '我读完了 →'}</button>
      <button class="block-btn ghost" id="raSkip">跳过本段</button>
    `;
    document.getElementById('raListen').onclick = () => TTS.speak(p);
    document.getElementById('raSkip').onclick = nextReadAlongPara;
    document.getElementById('raStart').onclick = () => {
      if (!supported) { nextReadAlongPara(); return; }
      startRecognition(p);
    };
    document.querySelectorAll('.ra-paragraph .tap-word').forEach(el => {
      el.onclick = () => TTS.speak(el.textContent);
    });
    document.getElementById('stageProgress').textContent = `跟读 ${paraIdx + 1}/${r.paragraphs.length}`;
  }

  function startRecognition(originalText) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    if (recognition) { try { recognition.stop(); } catch (e) {} recognition = null; }

    const rec = new SR();
    rec.lang = 'en-US';
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    let transcript = '';

    rec.onresult = (e) => {
      transcript = '';
      for (let i = 0; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript + ' ';
      }
      const el = document.getElementById('raRecognized');
      if (el) el.textContent = '听到：' + transcript;
    };
    rec.onerror = (e) => {
      const status = document.getElementById('raStatus');
      const startBtn = document.getElementById('raStart');
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        if (status) status.innerHTML = '⚠ 没拿到麦克风权限。可以"跳过本段"，或在浏览器里允许麦克风后再来。';
      } else if (e.error === 'no-speech') {
        if (status) status.innerHTML = '没听到声音。再大声试一次！';
      } else {
        if (status) status.textContent = '录音失败：' + e.error;
      }
      if (startBtn) {
        startBtn.textContent = '🎤 再试一次';
        startBtn.onclick = () => startRecognition(originalText);
      }
    };
    rec.onend = () => {
      recognition = null;
      const startBtn = document.getElementById('raStart');
      if (transcript.trim()) {
        evaluateReadAlong(originalText, transcript);
      } else if (startBtn && document.getElementById('raStatus')) {
        document.getElementById('raStatus').textContent = '没听到声音，再来一次试试';
        startBtn.textContent = '🎤 再试一次';
        startBtn.onclick = () => startRecognition(originalText);
      }
    };

    try {
      rec.start();
      recognition = rec;
      document.getElementById('raStatus').innerHTML = '🔴 正在听...大声读这段';
      const startBtn = document.getElementById('raStart');
      startBtn.textContent = '⏹ 停止录音';
      startBtn.onclick = () => { try { rec.stop(); } catch (e) {} };
    } catch (e) {
      document.getElementById('raStatus').textContent = '无法启动录音：' + e.message;
    }
  }

  function evaluateReadAlong(orig, said) {
    const normalize = s => s.toLowerCase().replace(/[.,!?'":;\-—]/g, ' ').split(/\s+/).filter(Boolean);
    const oWords = normalize(orig);
    const sWords = normalize(said);
    const sSet = new Set(sWords);
    const matched = oWords.filter(w => sSet.has(w)).length;
    const ratio = oWords.length ? matched / oWords.length : 0;
    const pct = Math.round(ratio * 100);

    attemptIdx++;
    const status = document.getElementById('raStatus');
    const startBtn = document.getElementById('raStart');

    if (ratio >= 0.3) {
      // pass (低门槛：孩子开口读了就鼓励)
      if (status) status.innerHTML = `✓ 听清了 <b>${pct}%</b> 的单词，跟读通过！`;
      App.toast('🎤 ' + App.randEncourage(), 'success', 1100);
      setTimeout(nextReadAlongPara, 1300);
    } else if (attemptIdx >= 2) {
      // 2 次后自动放行，不卡住孩子
      if (status) status.innerHTML = `已读 ${attemptIdx} 次，自动通过 (听清 ${pct}%)。下次更准！`;
      setTimeout(nextReadAlongPara, 1500);
    } else {
      if (status) status.innerHTML = `听清了 ${pct}%。再大声读一遍试试 (剩 ${2 - attemptIdx} 次机会)`;
      if (startBtn) {
        startBtn.textContent = '🎤 再读一遍';
        startBtn.onclick = () => startRecognition(orig);
      }
    }
  }

  function nextReadAlongPara() {
    if (recognition) { try { recognition.stop(); } catch (e) {} recognition = null; }
    paraIdx++;
    attemptIdx = 0;
    if (paraIdx >= reading.paragraphs.length) {
      renderQuestion();
    } else {
      showReadAlongPara();
    }
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
