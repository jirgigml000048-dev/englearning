/* ============================================================
 * TTS — 优先 ElevenLabs 预生成 mp3, 回落到浏览器自带语音
 *
 * 用法:
 *   TTS.speak('apple')                        // Web Speech (回落)
 *   TTS.speak('apple', { audioKey: 'words/apple' })  // mp3 优先
 *   TTS.speakWord('apple')                    // 等价于上面
 *   TTS.speakSentence('apple')                // audio/sentences/apple.mp3
 *   TTS.speakParagraph('u1-r1', 0, text)      // audio/paragraphs/u1-r1-p0.mp3
 *
 * mp3 文件由 scripts/generate-audio.mjs 生成 (ElevenLabs 高质量音色)。
 * 文件不存在时自动回落到 Web Speech, 不影响功能。
 * ============================================================ */
window.TTS = (() => {
  let voice = null;
  let ready = false;
  let currentAudio = null;
  const voiceChangeListeners = [];
  const missingMp3 = new Set(); // 缓存确认不存在的 key, 避免反复 404

  const PREMIUM_NAMES = [
    'Samantha', 'Allison', 'Ava', 'Susan', 'Karen', 'Daniel', 'Tom', 'Aaron', 'Alex',
    'Microsoft Aria Online', 'Microsoft Guy Online', 'Microsoft Jenny Online',
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
    voice = voices.find(v => v.lang === 'en-US') ||
            voices.find(v => v.lang === 'en-GB') ||
            voices[0];
    ready = true;
  }

  if ('speechSynthesis' in window) {
    pickVoice();
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      pickVoice();
      voiceChangeListeners.forEach(fn => { try { fn(); } catch (e) {} });
    });
  }

  function onVoicesChanged(cb) { voiceChangeListeners.push(cb); }

  function slugify(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  }

  /* ---------- core speak ---------- */
  function speak(text, opts = {}) {
    stop();
    if (opts.audioKey) {
      // 试播 mp3, 失败时自动回落
      const key = opts.audioKey;
      if (missingMp3.has(key)) {
        speakWebSpeech(text, opts);
        return;
      }
      const audio = new Audio('audio/' + key + '.mp3');
      audio.playbackRate = opts.rate || (window.Progress?.get().ttsRate || 1.0);
      currentAudio = audio;
      let fellBack = false;
      const fallback = () => {
        if (fellBack) return;
        fellBack = true;
        missingMp3.add(key);
        speakWebSpeech(text, opts);
      };
      audio.addEventListener('error', fallback);
      audio.play().catch(fallback);
      return;
    }
    speakWebSpeech(text, opts);
  }

  function speakWebSpeech(text, opts = {}) {
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
    if (currentAudio) {
      try { currentAudio.pause(); } catch (e) {}
      currentAudio = null;
    }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  /* ---------- semantic helpers ---------- */
  function speakWord(en, opts = {}) {
    speak(en, { ...opts, audioKey: 'words/' + slugify(en) });
  }
  function speakSentence(en, sentenceText, opts = {}) {
    // sentenceText 是清理过的句子文本(供 Web Speech 回落)
    speak(sentenceText || en, { ...opts, audioKey: 'sentences/' + slugify(en) });
  }
  function speakParagraph(readingId, paraIdx, text, opts = {}) {
    speak(text, { ...opts, audioKey: `paragraphs/${readingId}-p${paraIdx}` });
  }

  // 顺序播放某 reading 的全部段落 mp3 (用于"朗读全文")
  // 第一段失败时回落到 Web Speech 一次性朗读拼接文本
  function speakParagraphsSequential(readingId, paragraphTexts) {
    stop();
    let i = 0;
    const playNext = () => {
      if (i >= paragraphTexts.length) return;
      const key = `paragraphs/${readingId}-p${i}`;
      if (missingMp3.has(key)) {
        // 已知缺失 → 直接 Web Speech 全文兜底
        if (i === 0) speakWebSpeech(paragraphTexts.join(' '), {});
        else { i++; playNext(); }
        return;
      }
      const audio = new Audio('audio/' + key + '.mp3');
      audio.playbackRate = window.Progress?.get().ttsRate || 1.0;
      currentAudio = audio;
      audio.onended = () => { i++; playNext(); };
      const fallback = () => {
        missingMp3.add(key);
        if (i === 0) speakWebSpeech(paragraphTexts.join(' '), {});
        else { i++; playNext(); }
      };
      audio.addEventListener('error', fallback);
      audio.play().catch(fallback);
    };
    playNext();
  }

  /* ---------- voice picker (Web Speech) ---------- */
  function getAvailableVoices() { return listVoices(); }
  function getCurrentVoice() { if (!voice) pickVoice(); return voice; }
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
    speakWord, speakSentence, speakParagraph, speakParagraphsSequential,
    get ready() { return ready; },
    getAvailableVoices, getCurrentVoice, setVoiceByName,
    onVoicesChanged
  };
})();
