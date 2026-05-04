/* ============================================================
 * 浏览器语音合成 — 优先选高质量英语音色
 *
 * 问题：默认 voice 在国内设备上常被 Chinese-accent 引擎接管,
 *      导致 "apple" 听起来像 "阿婆"。
 * 解决：
 *   1) 严格过滤掉所有 zh-* / cmn-* 音色
 *   2) 优先级：iPad/iPhone 内置高质量音色 > en-US > en-GB > 任何 en-*
 *   3) Apple 系列质量榜：Samantha > Allison > Ava > Karen > Daniel
 *      Microsoft 系列：Aria > Guy > Jenny > Ryan > Zira
 *      Google：Google US English (Network) > 其它
 *   4) 默认语速 0.85（孩子能听清）
 *   5) 用户可在设置里手动指定
 * ============================================================ */
window.TTS = (() => {
  let voice = null;
  let voicesCache = [];
  let ready = false;

  // 高质量音色名（按优先级）
  const PREMIUM_NAMES = [
    'Samantha',          // iPad/iPhone 默认 en-US 女声 ★最常用
    'Allison',
    'Ava',
    'Susan',
    'Karen',             // Australian English
    'Daniel',            // British English 男声
    'Tom',
    'Aaron',
    'Alex',              // macOS 老款高品质
    'Microsoft Aria Online',
    'Microsoft Guy Online',
    'Microsoft Jenny Online',
    'Google US English'
  ];

  function listVoices() {
    if (!('speechSynthesis' in window)) return [];
    const all = window.speechSynthesis.getVoices() || [];
    // 过滤掉中文音色
    return all.filter(v => /^en/i.test(v.lang) && !/zh|cmn|yue|wuu/i.test(v.lang));
  }

  function pickVoice() {
    voicesCache = listVoices();
    if (!voicesCache.length) return;

    // 用户偏好（设置中保存的 voice name）
    const pref = window.Progress?.get().voiceName;
    if (pref) {
      const m = voicesCache.find(v => v.name === pref);
      if (m) { voice = m; ready = true; return; }
    }

    // 按 PREMIUM_NAMES 顺序找
    for (const name of PREMIUM_NAMES) {
      const m = voicesCache.find(v => v.name.includes(name));
      if (m) { voice = m; ready = true; return; }
    }

    // 回落：en-US 任意，再回落 en-GB
    voice =
      voicesCache.find(v => v.lang === 'en-US') ||
      voicesCache.find(v => v.lang === 'en-GB') ||
      voicesCache[0];
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
    u.rate = opts.rate || (window.Progress?.get().ttsRate || 0.85);
    u.pitch = opts.pitch != null ? opts.pitch : 1.0;
    u.lang = (voice && voice.lang) || 'en-US';
    window.speechSynthesis.speak(u);
  }

  function stop() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  function getAvailableVoices() {
    return voicesCache.slice();
  }

  function getCurrentVoice() {
    return voice;
  }

  function setVoiceByName(name) {
    const m = voicesCache.find(v => v.name === name);
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
    getAvailableVoices, getCurrentVoice, setVoiceByName
  };
})();
