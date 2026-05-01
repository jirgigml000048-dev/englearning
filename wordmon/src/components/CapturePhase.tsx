import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { generateRound, pickTargets, type CaptureRound } from '../lib/captureLogic';
import { useAudio } from '../hooks/useAudio';
import { useProgress } from '../hooks/useProgress';
import { CaptureAnimation } from './CaptureAnimation';
import { seedUnit } from '../data/seedUnit';

const ROUND_SIZE = 5;

type Phase = 'listening' | 'wrong' | 'capturing' | 'celebrating';

export function CapturePhase() {
  const navigate = useNavigate();
  const captured = useProgress((s) => s.captured);
  const capture = useProgress((s) => s.capture);
  const recordListen = useProgress((s) => s.recordListenCorrect);

  const targets = useMemo(() => pickTargets(seedUnit, ROUND_SIZE), []);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('listening');
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);

  const round: CaptureRound = useMemo(
    () => generateRound(targets[idx], seedUnit),
    [targets, idx],
  );

  const { play, stop } = useAudio();
  const playedOnceRef = useRef<string>('');

  // 进入新词时自动播一次（autoplay 限制下，第一次需用户手势触发）
  useEffect(() => {
    if (playedOnceRef.current === round.target.id) return;
    playedOnceRef.current = round.target.id;
    if (round.target.stages[3].audioUrl) {
      play(round.target.stages[3].audioUrl);
    }
  }, [round.target, play]);

  useEffect(() => () => stop(), [stop]);

  const dexCount = Object.keys(captured).length;

  function handlePick(optionIdx: number) {
    if (phase !== 'listening') return;
    if (optionIdx === round.correctIndex) {
      setPhase('capturing');
      capture(round.target.id);
      recordListen(round.target.id);
      // 捕捉动画结束在 onCaptureDone
    } else {
      setWrongIdx(optionIdx);
      setPhase('wrong');
      setTimeout(() => {
        setWrongIdx(null);
        setPhase('listening');
      }, 900);
    }
  }

  function onCaptureDone() {
    setPhase('celebrating');
    setTimeout(() => {
      if (idx + 1 >= targets.length) {
        navigate('/round/2');
      } else {
        setIdx(idx + 1);
        setPhase('listening');
      }
    }, 700);
  }

  const target = round.target;
  const showSilhouette = phase === 'listening' || phase === 'wrong';

  return (
    <div className="relative h-full w-full flex flex-col px-10 py-6 overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between">
        <button
          onClick={() => navigate('/dex')}
          className="px-5 py-2 rounded-full bg-white/5 border border-white/10 font-en text-base"
        >
          📖 图鉴 <span className="text-accent-cyan">{dexCount}</span>
          <span className="text-ink-muted">/{seedUnit.length}</span>
        </button>
        <div className="font-en text-sm text-ink-dim tracking-widest">
          R1 · 听音抓兽 · {idx + 1}/{ROUND_SIZE}
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-lg"
          aria-label="退出"
        >
          ✕
        </button>
      </header>

      {/* Center */}
      <main className="flex-1 flex flex-col items-center justify-center gap-8 relative">
        {/* Speaker */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => target.stages[3].audioUrl && play(target.stages[3].audioUrl)}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan
                     shadow-glow-purple flex items-center justify-center text-4xl
                     transition-shadow hover:shadow-glow-cyan"
          aria-label="播放发音"
        >
          🔊
        </motion.button>

        {/* Silhouette / unveil */}
        <div className="relative h-44 w-44 flex items-center justify-center">
          {showSilhouette ? (
            <motion.div
              key={target.id + '-silhouette'}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-[132px] leading-none select-none"
              style={{
                filter: 'brightness(0) drop-shadow(0 0 18px rgba(34,211,238,0.5))',
              }}
            >
              {target.stages[3].imgUrl}
            </motion.div>
          ) : (
            <motion.div
              key={target.id + '-reveal'}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'backOut' }}
              className="text-[132px] leading-none drop-shadow-[0_0_24px_rgba(250,204,21,0.6)]"
            >
              {target.stages[3].imgUrl}
            </motion.div>
          )}

          {/* DEV MODE: 没有真实音频时把单词显示在角落，确保 demo 可玩 */}
          {!target.stages[3].audioUrl && phase === 'listening' && (
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2
                            text-[10px] tracking-widest text-ink-muted font-en
                            bg-white/5 px-2 py-1 rounded border border-white/5">
              🚧 demo: {target.word}
            </div>
          )}
        </div>

        {/* Capture animation overlay */}
        <CaptureAnimation
          show={phase === 'capturing'}
          onComplete={onCaptureDone}
        />
      </main>

      {/* Options */}
      <footer className="grid grid-cols-4 gap-4 pb-2">
        {round.options.map((opt, i) => {
          const isWrong = wrongIdx === i;
          return (
            <motion.button
              key={opt.id + '-' + i}
              whileTap={{ scale: 0.94 }}
              animate={
                isWrong
                  ? { x: [-8, 8, -6, 6, 0], filter: 'grayscale(1)' }
                  : { x: 0, filter: 'grayscale(0)' }
              }
              transition={{ duration: 0.4 }}
              disabled={phase !== 'listening'}
              onClick={() => handlePick(i)}
              className={`aspect-square rounded-2xl border-2 flex items-center justify-center
                          text-7xl bg-bg-surface/60 transition-colors
                          ${
                            isWrong
                              ? 'border-amber-400/60'
                              : 'border-white/10 hover:border-accent-purple/60'
                          }`}
            >
              {opt.stages[3].imgUrl}
            </motion.button>
          );
        })}
      </footer>
    </div>
  );
}
