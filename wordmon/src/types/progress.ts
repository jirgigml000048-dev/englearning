export interface CapturedWordmon {
  wordmonId: string;
  stage: 1 | 2 | 3;
  capturedAt: number;
  evolvedAt: Partial<Record<2 | 3, number>>;
  stats: {
    listenCorrect: number;
    spellCorrect: number;
    usedInSentence: number;
  };
}

export interface DailySession {
  date: string;
  roundsCompleted: number;
  newCaptures: string[];
  evolutions: string[];
  durationMs: number;
}
