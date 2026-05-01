import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import { seedUnit } from '../data/seedUnit';

export function MainMenu() {
  const navigate = useNavigate();
  const captured = useProgress((s) => s.captured);
  const dexCount = Object.keys(captured).length;
  const total = seedUnit.length;

  return (
    <div className="h-full w-full flex flex-col items-center justify-between px-12 py-10">
      <header className="w-full flex items-center justify-between">
        <button
          onClick={() => navigate('/dex')}
          className="px-5 py-2 rounded-full bg-white/5 border border-white/10 font-en text-lg
                     shadow-glow-purple/30 active:scale-95 transition"
        >
          📖 图鉴 <span className="text-accent-cyan">{dexCount}</span>
          <span className="text-ink-dim">/{total}</span>
        </button>
        <div className="font-en text-2xl tracking-[0.2em] text-accent-purple drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]">
          WORDMON
        </div>
        <button className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xl">
          ⚙️
        </button>
      </header>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[140px] leading-none drop-shadow-[0_8px_24px_rgba(168,85,247,0.4)]"
        >
          🐲
        </motion.div>
        <div className="font-en text-3xl text-ink-primary tracking-wide">
          Hello, Trainer!
        </div>
        <div className="font-zh text-base text-ink-dim">
          一只新的搭档已经在等你了
        </div>
      </motion.div>

      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => navigate('/round/1')}
        className="font-en text-2xl px-12 py-5 rounded-full
                   bg-gradient-to-r from-accent-purple to-accent-cyan
                   shadow-glow-purple text-white tracking-wider
                   hover:shadow-glow-cyan transition-shadow"
      >
        ▶ 开始今日训练
      </motion.button>

      <div className="font-en text-xs text-ink-muted">v0.1 · Day 1 scaffold</div>
    </div>
  );
}
