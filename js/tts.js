/* ============================================================
 * 浏览器自带语音合成（免费，pad 上 Safari/Chrome 都支持）
 * ============================================================ */
window.TTS = (() => {
  let voice = null;
  let ready = false;

  function pickVoice() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return;
    // 优先美音 / 英音
    const prefer = ['en-US', 'en-GB'];
    for (const lang of prefer) {
      const v = voices.find(v => v.lang === lang && /female|samantha|karen|victoria/i.test(v.name)) ||
                voices.find(v => v.lang === lang);
      if (v) { voice = v; ready = true; return; }
    }
    voice = voices.find(v => v.lang.startsWith('en')) || voices[0];
    ready = true;
  }

  pickVoice();
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = pickVoice;
  }

  function speak(text, opts = {}) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (voice) u.voice = voice;
    u.rate = opts.rate || (window.Progress?.get().ttsRate || 0.9);
    u.pitch = opts.pitch || 1.0;
    u.lang = (voice && voice.lang) || 'en-US';
    window.speechSynthesis.speak(u);
  }

  function stop() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  return { speak, stop, get ready() { return ready; } };
})();
