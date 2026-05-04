/* ============================================================
 * 浏览器语音合成 — 优先选高质量英语音色
 *
 * 修订:
 *  - getAvailableVoices() / setVoiceByName() 每次实时查询,
 *    不依赖 voicesCache (修复音色选不上的 bug)
 *  - 用 addEventListener 而不是 onvoiceschanged 赋值,
 *    避免被 app.js 覆盖
 * ============================================================ */
window.TTS = (() => {
  let voice = null;
  let ready = false;
  const voiceChangeListeners = [];

  // 高质量音色名（按优先级）
  const PREMIUM_NAMES = [
    'Samantha',
    'Allison',
    'Ava',
    'Susan',
    'Karen',
    'Daniel',
    'Tom',
    'Aaron',
    'Alex',
    'Microsoft Aria Online',
    'Microsoft Guy Online',
    'Microsoft Jenny Online',
    'Google US English'
  ];

  function listVoices() {
    if (!('speechSynthesis' in window)) return [];
    const all = window.speechSynthesis.getVoices() || [];
    return all.filter(v => /^en/i.test(v.lang) && !/zh|cmn|yue|wuu/i.test(v.lang));
  }

  function pickVoice() {
    const voices = listVoices();
    if (!voices.length) return;

    const pref = window.Progress?.get().voiceName;
    if (pref) {
      const m = voices.find(v => v.name === pref);
      if (m) { voice = m; ready = true; return; }
    }
    for (const name of PREMIUM_NAMES) {
      const m = voices.find(v => v.name.includes(name));
      if (m) { voice = m; ready = true; return; }
    }
    voice =
      voices.find(v => v.lang === 'en-US') ||
      voices.find(v => v.lang === 'en-GB') ||
      voices[0];
    ready = true;
  }

  // 用 addEventListener，多个监听器共存（app.js 也会注册一个）
  if ('speechSynthesis' in window) {
    pickVoice();
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      pickVoice();
      voiceChangeListeners.forEach(fn => { try { fn(); } catch (e) {} });
    });
  }

  function onVoicesChanged(cb) {
    voiceChangeListeners.push(cb);
  }

  function speak(text, opts = {}) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (!voice) pickVoice();
    const u = new SpeechSynthesisUtterance(text);
    if (voice) u.voice = voice;
    u.rate = opts.rate || (window.Progress?.get().ttsRate || 0.85);
    u.pitch = opts.pitch != null ? opts.pitch : 1.0;
    u.lang = (voice && voice.lang) || 'en-US';
    window.speechSynthesis.speak(u);
  }

  function stop() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  // 实时查询，不依赖缓存
  function getAvailableVoices() {
    return listVoices();
  }

  function getCurrentVoice() {
    if (!voice) pickVoice();
    return voice;
  }

  function setVoiceByName(name) {
    const voices = listVoices();
    const m = voices.find(v => v.name === name);
    if (!m) return false;
    voice = m;
    if (window.Progress) {
      window.Progress.get().voiceName = name;
      window.Progress.save();
    }
    return true;
  }

  return {
    speak, stop,
    get ready() { return ready; },
    getAvailableVoices, getCurrentVoice, setVoiceByName,
    onVoicesChanged
  };
})();
