export const tokens = {
  color: {
    bg: {
      deep: '#0F1B3D',
      surface: '#1A2755',
      raised: '#243370',
    },
    accent: {
      purple: '#A855F7',
      cyan: '#22D3EE',
      gold: '#FACC15',
    },
    text: {
      primary: '#F1F5F9',
      dim: '#94A3B8',
      muted: '#64748B',
    },
    state: {
      success: '#22C55E',
      warn: '#F59E0B',
      danger: '#EF4444',
    },
    category: {
      animal: '#F472B6',
      food: '#FB923C',
      action: '#22D3EE',
      object: '#A78BFA',
      place: '#34D399',
      emotion: '#F87171',
      time: '#FACC15',
    },
  },
  font: {
    en: '"Pixelify Sans", "VT323", monospace',
    zh: '"Source Han Sans CN", "PingFang SC", "Microsoft YaHei", sans-serif',
    size: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '20px',
      xl: '28px',
      '2xl': '40px',
      '3xl': '56px',
    },
  },
  space: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    6: '24px',
    8: '32px',
    12: '48px',
  },
  radius: {
    sm: '6px',
    md: '12px',
    lg: '20px',
    full: '9999px',
  },
  glow: {
    purple: '0 0 24px rgba(168, 85, 247, 0.55)',
    cyan: '0 0 24px rgba(34, 211, 238, 0.55)',
    gold: '0 0 24px rgba(250, 204, 21, 0.55)',
  },
  motion: {
    quick: 0.18,
    base: 0.32,
    slow: 0.6,
    evolve: 3.0,
  },
} as const;

export type Tokens = typeof tokens;
