import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CapturedWordmon, DailySession } from '../types/progress';

interface ProgressState {
  captured: Record<string, CapturedWordmon>;
  sessions: Record<string, DailySession>;

  capture: (wordmonId: string) => void;
  recordListenCorrect: (wordmonId: string) => void;
  recordSpellCorrect: (wordmonId: string) => void;
  recordUsedInSentence: (wordmonId: string) => void;
  evolve: (wordmonId: string, toStage: 2 | 3) => void;

  ensureSession: (date: string) => void;
  bumpSession: (date: string, patch: Partial<DailySession>) => void;

  reset: () => void;
}

const emptyCaptured = (wordmonId: string): CapturedWordmon => ({
  wordmonId,
  stage: 1,
  capturedAt: Date.now(),
  evolvedAt: {},
  stats: { listenCorrect: 0, spellCorrect: 0, usedInSentence: 0 },
});

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      captured: {},
      sessions: {},

      capture: (wordmonId) => {
        if (get().captured[wordmonId]) return;
        set((s) => ({
          captured: { ...s.captured, [wordmonId]: emptyCaptured(wordmonId) },
        }));
      },

      recordListenCorrect: (wordmonId) =>
        set((s) => {
          const cur = s.captured[wordmonId] ?? emptyCaptured(wordmonId);
          return {
            captured: {
              ...s.captured,
              [wordmonId]: {
                ...cur,
                stats: { ...cur.stats, listenCorrect: cur.stats.listenCorrect + 1 },
              },
            },
          };
        }),

      recordSpellCorrect: (wordmonId) =>
        set((s) => {
          const cur = s.captured[wordmonId];
          if (!cur) return s;
          return {
            captured: {
              ...s.captured,
              [wordmonId]: {
                ...cur,
                stats: { ...cur.stats, spellCorrect: cur.stats.spellCorrect + 1 },
              },
            },
          };
        }),

      recordUsedInSentence: (wordmonId) =>
        set((s) => {
          const cur = s.captured[wordmonId];
          if (!cur) return s;
          return {
            captured: {
              ...s.captured,
              [wordmonId]: {
                ...cur,
                stats: { ...cur.stats, usedInSentence: cur.stats.usedInSentence + 1 },
              },
            },
          };
        }),

      evolve: (wordmonId, toStage) =>
        set((s) => {
          const cur = s.captured[wordmonId];
          if (!cur) return s;
          if (cur.stage >= toStage) return s;
          return {
            captured: {
              ...s.captured,
              [wordmonId]: {
                ...cur,
                stage: toStage,
                evolvedAt: { ...cur.evolvedAt, [toStage]: Date.now() },
              },
            },
          };
        }),

      ensureSession: (date) =>
        set((s) => {
          if (s.sessions[date]) return s;
          return {
            sessions: {
              ...s.sessions,
              [date]: {
                date,
                roundsCompleted: 0,
                newCaptures: [],
                evolutions: [],
                durationMs: 0,
              },
            },
          };
        }),

      bumpSession: (date, patch) =>
        set((s) => {
          const cur = s.sessions[date];
          if (!cur) return s;
          return { sessions: { ...s.sessions, [date]: { ...cur, ...patch } } };
        }),

      reset: () => set({ captured: {}, sessions: {} }),
    }),
    {
      name: 'wordmon-progress-v1',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
