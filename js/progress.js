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
    words: {},          // { word: { firstSeen, correctCount, wrongCount, correctStreakSinceWrong, lastReviewed } }
    readsCompleted: [], // [readingId]
    perfectDays: 0,
    dailyLog: {},       // { '2026-05-01': { stages, newWords, accuracy, xp } }
    todayStages: { date: null, stages: {} },
    dailyLessonPlan: { date: null, unitId: null, wordIndices: [] }, // 今日要学的单词索引
    voiceName: null
  });

  // 每日学习的单词数 (新词 + 旧词复习) 总数
  const DAILY_LESSON_SIZE = 6;

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
    const w = state.words[word] || { firstSeen: Date.now(), correctCount: 0, wrongCount: 0, correctStreakSinceWrong: 0 };
    // 兼容老数据：补默认字段
    if (w.correctStreakSinceWrong == null) w.correctStreakSinceWrong = 0;
    if (correct) {
      w.correctCount += 1;
      w.correctStreakSinceWrong += 1;
    } else {
      w.wrongCount += 1;
      w.correctStreakSinceWrong = 0;
      w.lastWrongAt = Date.now();
    }
    w.lastReviewed = Date.now();
    state.words[word] = w;
  }

  function totalWords() { return Object.keys(state.words).length; }

  function masteredWords() {
    return Object.values(state.words).filter(w => w.correctCount >= 3).length;
  }

  /* ---------------- Error Book (错题本) ----------------
   * 一个词进入错题本的条件：曾经答错过 (wrongCount > 0)
   * 退出错题本（"掌握"）的条件：从最近一次错之后，连续答对 >= 3 次
   */
  const MASTERY_STREAK = 3;

  function isInErrorBook(w) {
    return (w.wrongCount || 0) > 0 && (w.correctStreakSinceWrong || 0) < MASTERY_STREAK;
  }

  function errorBookCount() {
    return Object.values(state.words).filter(isInErrorBook).length;
  }

  function errorBookCandidates(limit = 6) {
    // 优先级：错的次数多 + 连胜少 = 优先排前
    return Object.entries(state.words)
      .filter(([_, w]) => isInErrorBook(w))
      .sort((a, b) => {
        const aw = a[1], bw = b[1];
        const aScore = (aw.wrongCount || 0) * 2 - (aw.correctStreakSinceWrong || 0);
        const bScore = (bw.wrongCount || 0) * 2 - (bw.correctStreakSinceWrong || 0);
        if (bScore !== aScore) return bScore - aScore;
        // 同分时按最近错时间排前
        return (bw.lastWrongAt || 0) - (aw.lastWrongAt || 0);
      })
      .slice(0, limit)
      .map(([word]) => word);
  }

  // 取昨天学过、今天可以复习的单词（用于 warmup 阶段）
  function reviewCandidates(limit = 6) {
    // 优先返回错题本，不够再补最近学过的
    const errors = errorBookCandidates(limit);
    if (errors.length >= limit) return errors;
    const cutoff = Date.now() - 86400000 * 3;
    const recent = Object.entries(state.words)
      .filter(([w, x]) => x.lastReviewed >= cutoff && !errors.includes(w))
      .sort((a, b) => (a[1].correctCount - a[1].wrongCount) - (b[1].correctCount - b[1].wrongCount))
      .slice(0, limit - errors.length)
      .map(([w]) => w);
    return [...errors, ...recent];
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

  /* ---------------- Daily Lesson Plan (每日学单词计划) ----------------
   * 每天选 6 个词：优先没见过的 (不在 state.words 里)，剩余补错题本词，
   * 最后还不够再补当前 unit 的随机词。一天内反复进入 words 关卡时复用同一份。
   */
  function getTodayLesson(unit) {
    const today = todayStr();
    const plan = state.dailyLessonPlan;
    if (plan.date === today && plan.unitId === unit.id && plan.wordIndices.length) {
      return plan.wordIndices.slice();
    }
    const unitWords = unit.words;
    const seenSet = new Set(Object.keys(state.words));
    const unseenIdx = [];
    const errIdx = [];
    const otherIdx = [];
    unitWords.forEach((w, i) => {
      if (!seenSet.has(w.en)) unseenIdx.push(i);
      else if (isInErrorBook(state.words[w.en])) errIdx.push(i);
      else otherIdx.push(i);
    });
    // 洗牌
    [unseenIdx, errIdx, otherIdx].forEach(arr => arr.sort(() => Math.random() - 0.5));

    // 优先选: 4 个没见过的 + 2 个错题；不够再补
    const picked = [];
    const N = Math.min(DAILY_LESSON_SIZE, unitWords.length);
    while (picked.length < N) {
      if (picked.length < 4 && unseenIdx.length) picked.push(unseenIdx.shift());
      else if (errIdx.length) picked.push(errIdx.shift());
      else if (unseenIdx.length) picked.push(unseenIdx.shift());
      else if (otherIdx.length) picked.push(otherIdx.shift());
      else break;
    }
    state.dailyLessonPlan = { date: today, unitId: unit.id, wordIndices: picked };
    save();
    return picked.slice();
  }

  /* ---------------- Unit Mastery & Auto-Advance ----------------
   * 一个 Unit "已掌握" 的判定:
   *   - 至少 80% 的词不在错题本（即 streak>=3 或没错过）
   *   - 至少完成过 1 篇该 Unit 的阅读
   * 自动进阶: 当前 unit 已掌握 + 还有下一个 unit → currentUnitIdx++
   */
  function getUnitMasteryPct(unit) {
    if (!unit || !unit.words.length) return 0;
    const total = unit.words.length;
    let mastered = 0;
    unit.words.forEach(w => {
      const rec = state.words[w.en];
      if (!rec) return; // 没学过不算掌握
      if ((rec.wrongCount || 0) === 0 && (rec.correctCount || 0) >= 1) mastered++;
      else if ((rec.correctStreakSinceWrong || 0) >= MASTERY_STREAK) mastered++;
    });
    return Math.round((mastered / total) * 100);
  }

  function isUnitMastered(unit) {
    if (!unit) return false;
    const pct = getUnitMasteryPct(unit);
    const hasReading = unit.readings.some(r => state.readsCompleted.includes(r.id));
    return pct >= 80 && hasReading;
  }

  // 返回下一个未掌握的 unit 的 idx；如果当前已掌握，调用方可触发自动进阶
  function maybeAutoAdvance(curIdx, units) {
    const cur = units[curIdx];
    if (!cur || !isUnitMastered(cur)) return { advanced: false, fromIdx: curIdx, toIdx: curIdx };
    // 找下一个还没掌握的
    for (let i = curIdx + 1; i < units.length; i++) {
      if (!isUnitMastered(units[i])) {
        state.currentUnitIdx = i;
        // 重置 lesson plan 让明天重新选
        state.dailyLessonPlan = { date: null, unitId: null, wordIndices: [] };
        save();
        return { advanced: true, fromIdx: curIdx, toIdx: i };
      }
    }
    // 全部掌握了（理论上）
    return { advanced: false, fromIdx: curIdx, toIdx: curIdx, allMastered: true };
  }

  return {
    get, save, reset, tick,
    completeStage, isStageCompleteToday, todayCompletedCount,
    recordWord, totalWords, masteredWords, reviewCandidates,
    errorBookCount, errorBookCandidates,
    getTodayLesson, getUnitMasteryPct, isUnitMastered, maybeAutoAdvance,
    checkBadges, weekReport, addXp
  };
})();
