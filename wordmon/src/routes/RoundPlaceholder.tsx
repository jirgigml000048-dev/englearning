import { useNavigate, useParams } from 'react-router-dom';

const ROUND_TITLES: Record<string, string> = {
  '1': 'R1 · 听音抓兽',
  '2': 'R2 · 拼读试炼',
  '3': 'R3 · 合成台',
  '4': 'R4 · 训练馆',
  '5': 'R5 · BOSS',
};

export function RoundPlaceholder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const title = ROUND_TITLES[id ?? ''] ?? `Round ${id}`;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-6 px-8">
      <div className="font-en text-3xl text-accent-cyan tracking-wide">{title}</div>
      <div className="text-ink-dim text-base font-zh">训练馆建设中，敬请期待</div>
      <button
        onClick={() => navigate('/')}
        className="mt-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 font-en"
      >
        ← 返回
      </button>
    </div>
  );
}
