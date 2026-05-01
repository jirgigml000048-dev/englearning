/* ============================================================
 * 进度追踪：localStorage 存档
 * ============================================================ */
window.Progress = (() => {
  const KEY = 'etrainer_v1';

  const todayStr = () => new Date().toISOString().slice(0, 10);

  const defaults = () => ({
    name: '小训练师',
    avatar: '🧒',
    currentUnitIdx: 0,
    minutesGoal: 45,
    ttsRate: 0.9,
    level: 1,
    xp: 0,
    streak: 0,
    lastDate: null,
    badges: [],
    words: {},          // { word: { firstSeen, correctCount, wrongCount, lastReviewed } }
    readsCompleted: [], // [readingId]
    perfectDays: 0,
    dailyLog: {},       // { '2026-05-01': { stages: ['warmup','words','reading','fun'], newWords:N, accuracy:N, xp:N } }
    todayStages: { date: null, stages: {} } // 今日完成的关卡
  });

  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaults();
      const parsed = JSON.parse(raw);
      return Object.assign(defaults(), parsed);
    } catch (e) {
      return defaults();
    }
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
  function get() { return state; }
  function reset() { state = defaults(); save(); }

  // 每次进入 App 调用：处理日期变更
  function tick() {
    const today = todayStr();
    if (state.todayStages.date !== today) {
      state.todayStages = { date: today, stages: {} };
    }
    if (state.lastDate !== today) {
      // streak 计算：lastDate 是昨天则 +1，否则归 1（如果今天之后再完成第一个关卡时再设置）
    }
    save();
  }

  // 完成一个关卡（warmup/words/reading/fun）
  function completeStage(stage, payload = {}) {
    const today = todayStr();
    if (state.todayStages.date !== today) state.todayStages = { date: today, stages: {} };
    state.todayStages.stages[stage] = Object.assign({ at: Date.now() }, payload);

    // 更新连续天数
    if (state.lastDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (state.lastDate === yesterday) state.streak += 1;
      else state.streak = 1;
      state.lastDate = today;
    }

    // 累计 XP
    const xpGain = payload.xp || 10;
    addXp(xpGain);

    // 写入每日日志
    if (!state.dailyLog[today]) state.dailyLog[today] = { stages: [], newWords: 0, accuracy: 0, xp: 0 };
    if (!state.dailyLog[today].stages.includes(stage)) state.dailyLog[today].stages.push(stage);
    state.dailyLog[today].xp += xpGain;
    if (payload.newWords) state.dailyLog[today].newWords += payload.newWords;
    if (payload.accuracy != null) state.dailyLog[today].accuracy = Math.max(state.dailyLog[today].accuracy, payload.accuracy);

    // 4 关全完成 + 阅读满分 = perfect day
    const allDone = ['warmup','words','reading','fun'].every(s => state.todayStages.stages[s]);
    if (allDone && (state.dailyLog[today].accuracy === 100)) {
      state.perfectDays += 1;
    }

    checkBadges();
    save();
  }

  function isStageCompleteToday(stage) {
    return state.todayStages.date === todayStr() && !!state.todayStages.stages[stage];
  }

  function todayCompletedCount() {
    if (state.todayStages.date !== todayStr()) return 0;
    return Object.keys(state.todayStages.stages).length;
  }

  function addXp(n) {
    state.xp += n;
    // 每 100 XP 升一级
    while (state.xp >= state.level * 100) {
      state.xp -= state.level * 100;
      state.level += 1;
    }
  }

  function recordWord(word, correct) {
    const w = state.words[word] || { firstSeen: Date.now(), correctCount: 0, wrongCount: 0 };
    if (correct) w.correctCount += 1;
    else w.wrongCount += 1;
    w.lastReviewed = Date.now();
    state.words[word] = w;
  }

  function totalWords() { return Object.keys(state.words).length; }

  function masteredWords() {
    return Object.values(state.words).filter(w => w.correctCount >= 3).length;
  }

  // 取昨天学过、今天可以复习的单词（用于 warmup 阶段）
  function reviewCandidates(limit = 6) {
    const cutoff = Date.now() - 86400000 * 3;
    const all = Object.entries(state.words)
      .filter(([_, w]) => w.lastReviewed >= cutoff)
      .sort((a, b) => (a[1].correctCount - a[1].wrongCount) - (b[1].correctCount - b[1].wrongCount));
    return all.slice(0, limit).map(([word]) => word);
  }

  function checkBadges() {
    const c = window.CURRICULUM.badges;
    const newly = [];
    c.forEach(b => {
      if (state.badges.includes(b.id)) return;
      const ok = evalCondition(b.condition);
      if (ok) {
        state.badges.push(b.id);
        newly.push(b);
      }
    });
    return newly;
  }

  function evalCondition(cond) {
    const ctx = {
      streak: state.streak,
      words: totalWords(),
      reads: state.readsCompleted.length,
      perfect: state.perfectDays,
      level: state.level
    };
    // 极简表达式：只支持 key>=N
    const m = cond.match(/^(\w+)>=(\d+)$/);
    if (!m) return false;
    return (ctx[m[1]] || 0) >= parseInt(m[2], 10);
  }

  function weekReport() {
    const out = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      const log = state.dailyLog[d];
      out.push({
        date: d,
        completed: log ? log.stages.length : 0,
        newWords: log ? log.newWords : 0,
        accuracy: log ? log.accuracy : 0,
        xp: log ? log.xp : 0
      });
    }
    return out;
  }

  return {
    get, save, reset, tick,
    completeStage, isStageCompleteToday, todayCompletedCount,
    recordWord, totalWords, masteredWords, reviewCandidates,
    checkBadges, weekReport, addXp
  };
})();
