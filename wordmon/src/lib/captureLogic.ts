import type { Wordmon } from '../types/wordmon';

export interface CaptureRound {
  target: Wordmon;
  options: Wordmon[];
  correctIndex: number;
}

export function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function pickTargets(pool: Wordmon[], count = 5): Wordmon[] {
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}

export function generateRound(target: Wordmon, pool: Wordmon[]): CaptureRound {
  const sameCategory = pool.filter(
    (w) => w.id !== target.id && w.category === target.category,
  );
  const otherCategory = pool.filter(
    (w) => w.id !== target.id && w.category !== target.category,
  );

  const distractors = [
    ...shuffle(sameCategory),
    ...shuffle(otherCategory),
  ].slice(0, 3);

  const options = shuffle([target, ...distractors]);
  const correctIndex = options.findIndex((o) => o.id === target.id);
  return { target, options, correctIndex };
}
