import { motion, AnimatePresence } from 'framer-motion';

interface CaptureAnimationProps {
  show: boolean;
  onComplete: () => void;
}

/**
 * 捕捉动画：精灵球从顶部落下 → 包裹 → 光柱爆开
 * 总时长 ~1.4s。结束触发 onComplete。
 */
export function CaptureAnimation({ show, onComplete }: CaptureAnimationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => {}}
        >
          {/* 精灵球 */}
          <motion.div
            initial={{ y: -400, scale: 0.6, rotate: -120 }}
            animate={{
              y: [-400, 0, 0, 0],
              scale: [0.6, 1, 1, 0],
              rotate: [-120, 0, 720, 720],
            }}
            transition={{
              times: [0, 0.35, 0.85, 1],
              duration: 1.4,
              ease: 'easeIn',
            }}
            onAnimationComplete={onComplete}
            className="text-[140px] absolute"
            style={{ filter: 'drop-shadow(0 0 24px rgba(168,85,247,0.8))' }}
          >
            🔴
          </motion.div>

          {/* 光柱爆开 */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 0, 4],
              opacity: [0, 0, 0.9, 0],
            }}
            transition={{
              times: [0, 0.6, 0.85, 1],
              duration: 1.4,
              ease: 'easeOut',
            }}
            className="absolute w-40 h-40 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(168,85,247,0.6) 40%, rgba(34,211,238,0) 70%)',
            }}
          />

          {/* 闪光粒子 */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const dx = Math.cos(angle) * 200;
            const dy = Math.sin(angle) * 200;
            return (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: [0, 0, dx],
                  y: [0, 0, dy],
                  opacity: [0, 0, 1, 0],
                  scale: [0, 0, 1.4, 0],
                }}
                transition={{
                  times: [0, 0.7, 0.85, 1],
                  duration: 1.4,
                  ease: 'easeOut',
                }}
                className="absolute text-2xl"
              >
                ✨
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
