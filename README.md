# 词兽世界 · Wordmon

为重度玩家小学生设计的英语训练 Web App。把单词 = 收集进化的"词兽"，把造句 = 我的世界式的合成方块，把每日训练 = 蛋仔派对的短回合 mini-rounds。

详见 `wordmon-brief.md`（项目契约）和 `BACKLOG.md`（不做的好想法）。

## 现阶段：Day 1 Scaffold

- ✅ Vite + React 19 + TypeScript
- ✅ Tailwind v3 + Framer Motion + Zustand (持久化到 localStorage)
- ✅ Howler / vite-plugin-pwa / react-router-dom 已装（待配置）
- ✅ `src/types/`、`src/styles/tokens.ts`、`src/data/seedUnit.ts`、`src/hooks/useProgress.ts` 全部完成
- ✅ 主菜单页 `/` 渲染「开始今日训练」按钮 → 跳转 `/round/1`（占位页）
- ⏳ R1 / R2 / R3 组件留空文件，等下一个 PR

## 本地开发

```bash
cd wordmon
npm install
npm run dev      # http://127.0.0.1:5173
npm run build
```
