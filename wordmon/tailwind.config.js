/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: { deep: '#0F1B3D', surface: '#1A2755', raised: '#243370' },
        accent: { purple: '#A855F7', cyan: '#22D3EE', gold: '#FACC15' },
        ink: { primary: '#F1F5F9', dim: '#94A3B8', muted: '#64748B' },
        cat: {
          animal: '#F472B6',
          food: '#FB923C',
          action: '#22D3EE',
          object: '#A78BFA',
          place: '#34D399',
          emotion: '#F87171',
          time: '#FACC15',
        },
      },
      fontFamily: {
        en: ['Pixelify Sans', 'VT323', 'monospace'],
        zh: ['Source Han Sans CN', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 24px rgba(168, 85, 247, 0.55)',
        'glow-cyan': '0 0 24px rgba(34, 211, 238, 0.55)',
        'glow-gold': '0 0 24px rgba(250, 204, 21, 0.55)',
      },
    },
  },
  plugins: [],
};
