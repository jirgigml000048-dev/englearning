# 英语训练师 (English Trainer) — 知识档案

> 一份给"vibe coder + AI agent"的复盘文档。如果你想给自己孩子做一个类似的英语学习 App，
> 这份文档教你**为什么**这样做，**踩了哪些坑**，**留了哪些后路**。

---

## Quick Facts

| 字段 | 值 |
|---|---|
| **项目** | 英语训练师 / English Trainer (Voxel skin) |
| **目标用户** | 9 岁四年级男孩，北京版英语，弱项=阅读，兴趣=Minecraft / 宝可梦 / 三角洲 |
| **时间线** | 2026-05-01 → 2026-05-05（5 天，28 commits） |
| **代码量** | 2534 LOC JS · 1080 LOC CSS · 数据 ~600 LOC |
| **内容量** | 6 单元 · 127 单词 · 24 篇阅读 · 96 道选择题（每题带讲解）· 30 个彩蛋词 · 275 个 ElevenLabs mp3 |
| **技术栈** | Vanilla HTML/CSS/JS PWA + Capacitor → Android APK |
| **托管** | Netlify (web) · GitHub Releases (APK) · GitHub Actions (audio + APK build) |
| **成本** | ElevenLabs 免费层（10000 字符/月，刚够一轮）· GitHub free · Netlify free |
| **仓库** | `jirgigml000048-dev/englearning` |
| **构建协作者** | Gigi（家长，产品决策）+ Claude Sonnet 4.6（实现） |

---

## The Problem

### 来自家长的原始诊断

> 9 岁男孩，四年级，北京版英语课本。重度玩家：宝可梦、我的世界、三角洲。
> 阅读理解最差。已经形成"看到英文 = 不愉快"的条件反射。

### 核心洞察

**不是学不动，是英语学习的反馈密度比游戏低两个数量级。所以"无聊"被身体翻译成了"抗拒"。**

这一句决定了产品所有设计：

- 每 5-10 秒必有正向反馈（鼓励语 / 战利品 / XP / 升级）
- 永远不显示"错"，所有失败包装成"再试一次"
- 单次会话目标 20-25 分钟（不强求 45 分钟坐住）
- 视觉用孩子认得的游戏 IP（Minecraft 像素风），不用"作业感"配色

### 为什么不直接用 App Store 现成产品

家长试过几个，孩子打开就关。原因：
- "今天的学习目标"——叙述方式像作业
- 普通卡通配色——对 9 岁重度游戏玩家无吸引力
- 跟课本不绑定——孩子知道"白学"
- 阅读题没讲解——错了不知道为什么错

---

## Key Decisions

每个决策记录：上下文 → 选项 → 选了什么 → 为什么 → 当时的引文 / 教训

### Decision 1: Vanilla HTML 还是 React 框架

**Context**：V1 第一天就要给孩子看到效果。
**Options**：
- a) Vanilla HTML/CSS/JS（无构建步骤）
- b) React + Vite + TypeScript + Zustand
- c) PWA + native 混合

**Chosen**：先 a → 中途切 b（叫 "Wordmon"）→ 4 小时后退回 a。

**Why**：
- a 在用户审视下能立刻部署、改完即见。每次迭代成本低。
- b 的"游戏元宇宙"概念兴奋了我，但实际跑起来用户审视一眼说"想要的是 efa4cd6 那个版本"。

**Quote**：
> "有点太简单了 你看看这个呢..." → 用户给了一份 wordmon brief
> ...4 小时后...
> "想要的是这个版本：efa4cd6"

**教训**：在用户没明确 OK 之前，不要在新方向上投入大块时间。

---

### Decision 2: 视觉风格 — 通用 vs 强主题

**Context**：V1 用蓝紫"训练师"配色。家长说"engtraning 那个干净版本好看"，但提供的真正期望来源是另一个 URL。

**Options**：
- a) 沿用蓝紫，做更精致的卡片 UI
- b) 自己设计 Minecraft 风格
- c) 用家长给的设计稿 URL

**Chosen**：c — `api.anthropic.com/v1/design/h/oBguNptPruTQO1NCDM-2tw`。

URL 直接 WebFetch 返回 binary，但用 `curl + gunzip + tar` 解压出来是完整的 React + CSS 项目，主题是 Minecraft 像素方块风（`Press Start 2P` + 草地/泥土/石头方块按钮 + 像素天空）。

**Why**：
- 设计稿的 class 命名（`.vox-app / .quest-block / .word-tooltip`）与 V1 的 4 关卡架构高度对齐——明显是基于本仓库做的设计。
- 直接复用 styles.css，自己只需重写 index.html 结构 + 各模块 DOM 模板。

**Quote**：
> "更新了视觉：https://api.anthropic.com/v1/design/h/oBgu..."
> "干净还是之前那个版本更好一点：https://engtraning.netlify.app/"

**教训**：用户提供 URL 时，多试几种解压/解码方式，不要假定 WebFetch 是唯一通道。

---

### Decision 3: 强主题 vs 教材风的比例

**Context**：12 篇 Minecraft "Steve & Alex" 故事写完后，用户问"这些故事真的和他兴趣相关吗"。

**Reality Check**（自我审计）：
- 24 篇阅读只有 Steve/Alex 名字蹭了 Minecraft
- 实际场景大多是"国庆节去动物园 / 京剧四大行当 / 找图书馆"这种**纯教材通用场景**
- 没有 Pokemon / 没有 Delta Force

**Options**：
- a) 全部重写为重度主题
- b) 教材风 vs 强主题 2:2 比例
- c) 保持现状

**Chosen**：b。每个 Unit = 2 教材风（紧扣考点）+ 2 强主题（1 宝可梦 + 1 我的世界 / 三角洲侦察）。

**Why**：
- 完全没考点的强主题阅读 → 考试无法用
- 完全教材风 → 孩子不愿打开
- 2:2 = "周一周三看普通故事，周二周四看皮卡丘对战"，**节奏感**比"全是宝可梦"更上瘾

**Quote**：
> "他真的很需要兴趣驱动"
> "我选择每个 unit 2 篇强主题，2 篇教材风"

**教训**：用户审视的时候诚实承认比例。说"基本都是 Minecraft"会失去信任。

---

### Decision 4: 跟读门槛

**Context**：V1 跟读关用 Web SpeechRecognition + 单词重合率 50% 通过 + 3 次重试。

**Pivot**：用户实际跑了一次后说"跟读门槛先低一点"。

**Chosen**：30% / 2 次。

**Why**：
- 9 岁中国孩子英语发音本身不准，识别引擎又不太准（双重折扣）
- 50% 让孩子在第三段就放弃整关
- 30% 让"开口读出来"就能过，**目的是让他读，不是让他读对**

**Quote**：
> "跟读门槛先低一点"

**教训**：默认值调到 80% 用户一次过的程度，再让较真的用户手动调高。"绝不卡住孩子"是核心口号。

---

### Decision 5: TTS 路线 — Web Speech vs ElevenLabs

**Context**：iPad Safari 的 Web Speech 在国内设备上经常被中文引擎接管，"apple" 听起来像"阿婆"。

**Options**：
- a) 优化 voice 选择（强制 en-US 高质量音色）
- b) ElevenLabs 实时 API 调用
- c) ElevenLabs 预生成 mp3

**Chosen**：先 a 试错（用户反馈"还是不好听"）→ 然后 c。

**Why c not b**：
- API key 进浏览器不安全（任何人查源码就拿到）
- 实时调用每次 1-3 秒延迟，孩子点喇叭不能等
- 预生成只跑一次约 9000 字符，正好 ElevenLabs 免费层 10000/月

**Quote**：
> "声音还是不是很好，可以换 elevenlabs 的 key 生成吗"

**教训**：当"好一点"不够时，用户实际想要"质变"。半步优化（换 voice 名字）抵不过一步换技术（换引擎）。

---

### Decision 6: 自动化兜底 — 用户环境约束

**Context**：用户在国内、Pad 上、不愿装 Node。

**Options**：
- a) 让用户本地跑脚本
- b) GitHub Actions 全云端
- c) 我直接帮跑

**Chosen**：b。

**Why c not feasible**：我的 sandbox egress 防火墙拦了 Netlify、Cloudflare、ElevenLabs、Quark Pan、所有需要外部 API 的事。除了 GitHub 本身，几乎打不到任何地方。

**Quote**：
> "好麻烦 还有什么你可以帮我操作的方式吗"

**教训**：当用户说"麻烦"，反思每一步能不能挪到 GitHub Actions 里。GitHub Actions 是受限用户的"远程 shell"。

---

### Decision 7: Android APK vs PWA

**Context**：用户最后一个问题——"netlify 需要 vpn 才能打开，做成 android 版的 app"，孩子用 OPPO Pad 4。

**Options**：
- a) 优化 PWA install 体验（Add to Home Screen）
- b) PWA Builder TWA（Trusted Web Activity，Chrome 包装）
- c) Capacitor WebView 完全打包，所有资源嵌 APK

**Chosen**：c。

**Why**：
- a 还是要先打开 Netlify（用户访问慢就卡）
- b 是 Chrome 包装，仍然要远程 URL
- c 把 HTML/CSS/JS/audio mp3 全部内嵌到 APK assets，**装完离线运行，零网络依赖**

**Trade-off**：APK 大约 30-40 MB（含所有 mp3）。但用户网络是更大约束。

**Quote**：
> "netlify需要vpn才能打开，做成android版的app，他的pad是oppo pad4"

**教训**：评估用户网络环境后再选托管方式。"国内 + 离线 = APK"是默认答案。

---

## Architecture

### Tech Stack

| Layer | 选择 | 备注 |
|---|---|---|
| Frontend | Vanilla HTML/CSS/JS | 无构建步骤，Pad Safari 直接跑 |
| State | localStorage | 单 namespace `etrainer_v1`，schema 版本化 |
| Audio (词/句/段) | HTMLAudioElement → mp3 | 无 mp3 时 fallback Web Speech |
| Audio fallback | `window.speechSynthesis` | 严格过滤 zh-* 音色 |
| Speech recog | `webkitSpeechRecognition` | 跟读关，单词重合率算法 |
| PWA | manifest + service-worker.js | network-first，自动缓存 mp3 |
| Mobile | Capacitor 6 + Android WebView | 本地 assets 加载，离线 |
| Hosting (web) | Netlify | 静态站，自动 deploy from GitHub |
| Hosting (apk) | GitHub Releases | 用户从 Releases 直接下载 |
| CI | GitHub Actions | 2 个 workflow：audio gen / APK build |
| Voice gen | ElevenLabs API | Sarah voice (`EXAVITQu4vr4xnSDxMaL`) |

### File Structure

```
englearning/
  index.html                    # 单页 shell (HUD + 4 view + hotbar)
  manifest.json                 # PWA
  service-worker.js             # network-first 缓存
  capacitor.config.json         # Android packaging
  netlify.toml                  # web deploy

  css/style.css                 # 1080 LOC 一切样式 + 3 套主题包

  js/
    app.js                      # 主控制器：HUD/Hotbar/Home/Stage/Settings
    data.js                     # CURRICULUM (6 units, 127 words, 24 readings)
    progress.js                 # localStorage state + lesson plan + mastery + loot
    tts.js                      # Web Speech + mp3 优先 + fallback
    modules/
      warmup.js                 # 热身复习关 (错题本 → 看图选词)
      words.js                  # 新词学习 (word-tooltip + 看图选词小测)
      reading.js                # 阅读冒险 (story → readalong → quiz → review)
      fun.js                    # 拼写打怪 (像素史莱姆 + 字母键盘)

  audio/                        # 275 个 ElevenLabs mp3 (CI 生成)
    words/<slug>.mp3
    paragraphs/<rId>-pN.mp3
    sentences/<slug>.mp3

  scripts/
    generate-audio.mjs          # ElevenLabs batch (Node)
    prepare-webdir.mjs          # 给 Capacitor 拷贝 dist/

  .github/workflows/
    generate-audio.yml          # 用户网页一键生成音频
    build-android.yml           # 用户网页一键打包 APK
```

### Data Model (localStorage `etrainer_v1`)

```js
{
  // 用户元数据
  name: '小训练师',
  avatar: '🧒',
  voiceName: 'Microsoft Aria Online',
  palette: 'grass',                 // grass / pokemon / scout

  // 学习进度
  currentUnitIdx: 0,                // 0-5 → u1/u2/u3/u5/u6/u7
  level: 4, xp: 230,
  streak: 5,
  lastDate: '2026-05-04',
  badges: ['first_day', 'three_day', 'word_50'],

  // 单词级
  words: {
    'apple': {
      firstSeen: 1714823234,
      correctCount: 5, wrongCount: 1,
      correctStreakSinceWrong: 2,    // 错题本判定: < 3 = 在错题本里
      lastReviewed: 1714823999,
      lastWrongAt: 1714823888
    },
    ...
  },

  // 阅读完成
  readsCompleted: ['u1-r1', 'u1-r2', 'u1-r3p'],

  // 每天的状态
  todayStages: { date, stages: { warmup, words, reading, fun } },
  dailyLessonPlan: { date, unitId, wordIndices: [3, 7, 8, 12, 14, 1] },
  todayLoot: { date, items: [{ icon, name, stage, at }] },

  // 历史日志
  dailyLog: { '2026-05-04': { stages, newWords, accuracy, xp } },
  perfectDays: 2,
  lifetimeLoot: { warmup: 5, perfect: 2, ... }
}
```

### 4 关学习关卡的核心机制

每关都有"看不到的算法"：

**🔁 热身复习**：`Progress.reviewCandidates(6)` 优先返回错题本里的词，不够补"最近 3 天学过的"。**孩子打开看到的是当天他真正不会的题**。

**📚 新词学习**：`Progress.getTodayLesson(unit)` 当天选 6 个词：4 个未见过 + 2 个错题本。同一天复用同一份。第二天换新一批。15-28 词的 Unit 大约 3-5 天轮一遍。

**📖 阅读冒险**：`unit.readings.find(r => !readsCompleted.includes(r.id))` 自动挑没读过的。每 Unit 4 篇（2 教材 + 2 强主题），4 天才回头复习。流程 = 课文 → 跟读（录音识别）→ 答题（错给提示和讲解）→ 翻译回看。

**⚔ 拼写打怪**：5 只怪兽，前 2 只优先从错题本抽，后 3 只随机本 unit 词。**错题本里的词通过"打怪"被反复曝光**，比单独刷题不那么折磨。

### Unit 自动进阶逻辑

```js
isUnitMastered(unit) =
  (≥80% 词不在错题本) AND (至少完成过 1 篇该 unit 阅读)

onStageDone() → if isUnitMastered(currentUnit):
  currentUnitIdx++
  toast('🎉 Unit X 已掌握！进入 Unit Y')
  reset dailyLessonPlan
```

孩子按自己节奏推进，不需要家长去设置里手动切。

---

## Development Timeline

### 5/1 — V1 上线 + Wordmon 试错 + 回退（8 commits）

| 时间 | Commit | 内容 |
|---|---|---|
| 05:11 | `1dbe533` | V1 MVP（蓝紫训练师主题，4 关卡，3 个占位单元） |
| 07:16 | `43ef71b` | 加 netlify.toml |
| 08:00 | `a43a5dd` | 切到 Wordmon（React + Vite + TS + Zustand） |
| 08:32 | `171aec5` | R1 捕捉系统（精灵球 + 光柱动画） |
| 08:43 | `c4403b0` | 用户回头："想要 efa4cd6 那个版本"，git read-tree 回退 |
| 09:28 | `efa4cd6` | 应用 Voxel 设计稿（Minecraft 像素方块世界皮肤） |

### 5/2-5/3 — 静默期

家长在 Pad 上让孩子真的玩了 2 天。攒了一堆反馈：声音机械、阅读不够主题、跟读太严、需要错题本。

### 5/4 — 内容大爆发（14 commits，集中在 11:18-14:11）

| 时间 | Commit | 内容 |
|---|---|---|
| 11:18 | `f26142c` | 导入北京版四上真课本（127 词 / 6 篇） |
| 11:35 | `29b35b2` | 修 PWA 缓存导致老用户看不到新版的问题 |
| 12:09 | `e8c8ff2` | 错题本 + 间隔重复 |
| 12:16 | `95c7282` | 真实发音改进 + 阅读翻译回看 + 错题讲解 |
| 12:18 | `243f847` | 跟读录音检查（SpeechRecognition + 单词重合率） |
| 13:05 | `249c662` | 跟读门槛 50%→30%，2 次；修音色选择器 bug |
| 13:16 | `7a57c98` | A+B：每日 lesson 自动选词 + Unit 自动进阶 |
| 13:30 | `b927687` | 12 篇强主题阅读（Pokemon/Minecraft/Delta） |
| 13:38 | `bee5db0` | 战利品 + 彩蛋词 + 主题包切换 |
| 13:44 | `d73272a` | ElevenLabs TTS 接入（mp3 优先 + 智能回落） |
| 13:47 | `0a13ab0` | GitHub Actions 自动生成音频 workflow |
| 14:01 | `faeed10` | 第一次跑出 275 个 mp3（约 5 分钟跑完） |
| 14:11 | `74c28ce` | Android APK 自动打包（Capacitor + Actions） |

### 5/4 晚 - 5/5 — 上线后的真实战场（5 commits）

内容做完不等于能用。APK 装到真机后，一连串"只有真实设备才暴露"的问题：

| 时间 | Commit | 内容 |
|---|---|---|
| 14:11 | `acc1054` | Netlify redirects /story 短链（复盘文章分享） |
| 5/5 | `802a18e` | 修朗读全文在 Android WebView 没声音（Web Speech 不支持 → 改顺序播 mp3） |
| 5/5 | `281a95f` | 修 APK build exit 127（gradlew 丢 +x 权限 → chmod + verify 步骤） |
| 5/5 | `6278e15` | APK 加麦克风权限（manifest 缺 RECORD_AUDIO → ColorOS 设置里没该项） |

这一段全是"在 iPad / Pad 真机上才会暴露、在浏览器里永远测不出来"的坑。**移动端打包 = 第二个项目。**

### 节奏特征

- 28 commits / 5 天 / 每个 commit 单一职责
- 5/1 一天试错 + 回退
- 5/4 一天打透内容功能
- 5/5 一天填移动端打包的坑（WebView 限制 / 构建权限 / 系统权限）
- 0 deploy 失败重试（多亏小步快跑）；但 APK build 失败过 2 次（移动端工具链更脆）

---

## How Builder & AI Collaborated

### 用户输入特征

- **直接简短**：用 Markdown 列要求（"1、2、3 都想做"）
- **质疑前先问**："这些故事真的和他爱好相关吗"
- **不满意敢回退**："想要的是这个版本：efa4cd6"
- **真实使用反馈**：让孩子玩，回来报具体痛点（"跟读门槛先低一点"，"声音还是不是很好"）
- **认同后批量推进**："1、2、3 都想做" → 一次提 6 个具体方案

### AI 输出特征（事后总结）

- **GitHub UI 步骤化**：所有需要用户操作的事翻译成"打开 X 页面 → 点 Y 按钮"，不留 shell 命令
- **每次提交后给 3 段说明**：「这次改了什么」「您要做什么」「下一个想做哪个」
- **主动审计自己**：用户问"X 是不是 Y"时立刻承认局限（"诚实回答：只有微弱关联"）
- **提议时排优先级 + 给工作量**：所有"还想做的"按"对分数提升的杠杆 + 工时"排队
- **写 plan 模式先于代码**：复杂改动用 ExitPlanMode 让用户先看 plan

### 反馈循环

```
用户在 Pad 上让孩子玩 (~10-30 min)
  → 孩子卡在某个点 / 抗拒某个交互
  → 用户告诉 AI 「跟读门槛太严」
  → AI 1 个 commit (改 50→30, 改 3→2)
  → push + 简短解释 (3 行)
  → 用户清缓存看 / 让孩子再试 → 反馈下一个痛点
```

每个循环 ≤ 30 分钟。22 commits × 30 min ≈ 4 天工作量基本对得上。

### 关键直接引文

> "他真的很需要兴趣驱动"

> "想要的是这个版本：efa4cd6 ... 只要这个视觉，保留教材数据"

> "好麻烦 还有什么你可以帮我操作的方式吗"

> "声音还是不是很好，可以换 elevenlabs 的 key 生成吗"

> "现在是最后一个问题，netlify 需要 vpn 才能打开 ... 最好做成 android 版的 app，他的 pad 是 oppo pad4"

每一条都触发了一次架构级或方向级调整。

---

## Pitfalls & Solutions

### Pitfall 1: Sandbox 出口防火墙拦截外部服务

**Symptom**：从 Claude Code 的 cloud sandbox 调 `curl https://api.elevenlabs.io` / `https://app.netlify.com/...` / `https://pan.quark.cn/...` 全部返回 `403 Host not in allowlist`。

**Affected**：Netlify deploy / Cloudflare quick tunnel / ElevenLabs API / Quark 网盘 / 设计稿 URL。

**Root Cause**：Claude Code on Web 的 cloud sandbox 默认 egress 只允许少数白名单域名（GitHub 在内）。

**Fix**：
- 任何需要 user-side API 的工作 → GitHub Actions 跑（用户在 GitHub 网页一键 Run）
- 设计稿 URL（巧合）：返回的是 gzipped tar，用 `curl + gunzip + tar` 解压绕过

**Prevention**：开始任务前，先 `curl --max-time 5` probe 一下目标域名能不能到。早识别哪些必须挪到用户侧。

---

### Pitfall 2: Service Worker 缓存住老版本

**Symptom**：用户清缓存前打开 App 总是看到老代码。

**Root Cause**：service-worker.js 的 `CACHE = 'etrainer-v1'` 名字没变，浏览器认为 SW 没更新；加上 cache-first 策略，永远先返回缓存。

**Fix**：
- bump 缓存名（`etrainer-voxel-v3`）让旧 SW 失效
- 改成 network-first（联网时先取新版本，离线才用缓存）

**Prevention**：每次大版本更新顺手 bump cache name。SW 文件用 network-first 策略对 PWA 学习类应用更合适（因为内容更新比离线可用更频繁）。

---

### Pitfall 3: Wordmon 过度设计

**Symptom**：用户用 4 小时看完一个游戏化方案后说"想要 efa4cd6 那个版本"。

**Root Cause**：用户给的 brief 描述了一个"游戏元宇宙"，我把它解读为"必须用 React + 状态机 + 类型契约"实现。实际用户只是描述方向，**没说要换技术栈**。

**Fix**：`git read-tree -u --reset efa4cd6` 把工作树回到那个 commit，再加新 commit。**不强推**，wordmon 的代码留在 git 历史里。

**Prevention**：用户描述方向 ≠ 同意架构变更。新方向要先 ExitPlanMode 让用户审视一份 plan，而不是直接动手。

---

### Pitfall 4: 主题感"虚假"

**Symptom**：24 篇阅读里只有"Steve / Alex"和"村庄"两个标签蹭了 Minecraft，内容是教材通用场景（国庆节 / 京剧 / 找图书馆）。**没有任何 Pokemon，没有 Delta Force**。用户问后我才意识到。

**Root Cause**：写阅读时优先保证教材考点全覆盖，主题被牺牲了。

**Fix**：
- 移除 1 篇教材风
- 加 2 篇强主题（1 宝可梦 + 1 我的世界 / 三角洲）
- 总共变成每 Unit 4 篇 = 2 教材 + 2 强主题

**Prevention**：写主题内容时，先列"这篇必须包含的兴趣 IP 元素"，再列"必须命中的考点"。两个清单都过了才动笔。

---

### Pitfall 5: TTS Voice Picker 不工作

**Symptom**：设置里"朗读音色"下拉选了没效果，下拉里也没列出 voice。

**Root Cause**：
- `tts.js` 用 `window.speechSynthesis.onvoiceschanged = pickVoice` 赋值
- `app.js` 用 `window.speechSynthesis.onvoiceschanged = populateVoicePicker` 也赋值
- 后者覆盖前者，`pickVoice` 不再运行 → `voicesCache` 永远是空的 → `setVoiceByName` 找不到任何 voice

**Fix**：
- 改成 `addEventListener('voiceschanged', ...)`（多个 listener 共存）
- `getAvailableVoices() / setVoiceByName()` 改成实时调 `speechSynthesis.getVoices()`，不依赖缓存

**Prevention**：全局事件用 `addEventListener`，不要用 `onXxx = ...` 赋值。这是 DOM 编程的反复教训。

---

### Pitfall 6: 跟读门槛太严

**Symptom**：孩子读完 30% 还过不去 → 挫败 → 拒绝阅读关。

**Root Cause**：我以"成年人 + 标准发音"基线设计 50% / 3 次。9 岁中国孩子英语发音不准，加上 Web SpeechRecognition 引擎对儿童口音不友好（双重折扣）。

**Fix**：30% / 2 次。

**Prevention**：所有阈值默认调到"80% 用户一次过"，再让较真的用户手动调高。绝不让默认值成为劝退原因。

---

### Pitfall 7: Netlify 在国内访问慢/被墙

**Symptom**：用户最后一次反馈："netlify 需要 vpn 才能打开"。

**Root Cause**：Netlify edge servers 不在国内，国内访问偶尔被拦或速度极慢。

**Fix**：放弃"必须从远程拉静态资源"的假设，把所有资源（HTML/CSS/JS/audio）打进 Android APK，用户离线运行。

**Prevention**：评估用户网络环境是产品决策，不是部署决策。"国内 + 离线" → APK 默认；"国外 + Web" → Netlify。

---

### Pitfall 8: 朗读全文在 Android WebView 没声音

**Symptom**：APK 装到 Pad 后，单词/跟读的 ElevenLabs 发音正常，但"🔊 朗读全文"按钮按了没声。

**Root Cause**：单词/跟读走 mp3 文件（`audio/words/*.mp3`、`audio/paragraphs/*.mp3`），而"朗读全文"调的是 `TTS.speak(段落.join(' '))` → 走 Web Speech API。**Android WebView 的 `speechSynthesis` 经常没有英语音色或根本不工作**，于是哑火。

**Fix**：新增 `TTS.speakParagraphsSequential()`，把"朗读全文"改成顺序播放每段的 mp3（一段 `ended` 自动接下一段），首段失败才回落 Web Speech。

**Prevention**：移动端不要依赖 Web Speech。所有要发声的地方都准备好预生成 mp3。**桌面浏览器能用的 API，WebView 里不一定有。**

---

### Pitfall 9: APK 构建 exit code 127（command not found）

**Symptom**：GitHub Actions 的 Build APK workflow 跑 22 秒就挂，报 "Process completed with exit code 127"。

**Root Cause**：exit 127 = 命令找不到。`npx cap add android` 生成的 `android/gradlew` 在 Linux runner 上**丢了可执行权限位（+x）**，`cd android && ./gradlew` 调不起来。而旧 workflow 的 `npx cap add android || echo "..."` 把 cap add 的真实错误吞了，看不到根因。

**Fix**：
- 每个 `run:` 加 `set -e`（任意命令非零立即停）
- `chmod +x android/gradlew`
- 加 `test -f android/gradlew && echo yes || (echo MISSING && exit 1)` 显式校验
- gradle build 加 `--stacktrace`
- 加 "Show env" 第一步打印 Node/npm/Java 版本

**Prevention**：CI 里所有 shell step 默认 `set -e`。永远不要用 `|| echo "..."` 吞错误——要么 fail loudly，要么明确处理。从 npm 包解压出来的可执行文件先 `chmod +x`。

---

### Pitfall 10: 侧载 APK 给不了麦克风权限

**Symptom**：跟读关要录音，但 OPPO ColorOS 的 设置 → 应用 → 权限管理 里**根本没有"麦克风"这一项**可以开。

**Root Cause**：Capacitor 默认生成的 `AndroidManifest.xml` 没声明 `RECORD_AUDIO`。Manifest 没声明 → 系统不认为 app 需要麦克风 → 权限页不显示该项 → WebView 调 `getUserMedia` 静默失败。侧载（非应用商店）让问题更隐蔽，因为没有商店审核提示缺权限。

**Fix**：写 `scripts/patch-android-manifest.mjs`，在 `cap add android` 之后、`cap sync` 之前往 manifest 注入 `RECORD_AUDIO` + `MODIFY_AUDIO_SETTINGS`。Capacitor 6 的 BridgeWebChromeClient 会自动把 WebView 的录音请求转成系统权限弹窗。

**Prevention**：任何用到设备能力（麦克风/相机/定位/通知）的 WebView app，打包前先检查 manifest 声明了对应权限。**权限是"先声明（manifest）后请求（runtime）"两步，少一步都不弹窗。**

---

## Build Guide

### 你想给另一个孩子做类似的 App，怎么做？

**前置：**
- GitHub 账号 + 一个新仓库（fork 这个或从头建）
- ElevenLabs 账号（免费层够用）
- 目标：决定孩子的教材版本 / 兴趣 IP / 弱项

**Step 1: Fork / clone 这个仓库**

```bash
git clone <repo>
cd englearning
```

**Step 2: 替换 `js/data.js`**

把 6 个 unit 替换为目标教材内容：
- 每 unit 15-30 个词，字段：`{ en, cn, ipa, emoji, sentence }`
- 每 unit 4 篇阅读：2 教材风 + 2 强主题（孩子兴趣 IP）
- 每篇阅读：5 段英文 + 5 段中文翻译 + 4 道题（每题带 hint + explanation）
- `easterEggDict` 加孩子兴趣相关词（30 个左右最佳）
- 改 `themeBadge` / `greetings` / `encouragements` 风格

**Step 3: 改 README + 视觉**

- App 名（manifest.json + index.html title）
- 主色调（css/style.css 顶部 CSS vars）
- 主页 mascot emoji
- 设置里的头像选项

**Step 4: 配置 GitHub Actions**

- 仓库 Settings → Secrets → 加 `ELEVENLABS_API_KEY`
- Actions → "Generate ElevenLabs Audio" → Run workflow（一次性，约 8 分钟）
- Actions → "Build Android APK" → Run workflow（一次性，约 10 分钟）

**Step 5: 部署 / 安装**

- **国外用户**：Netlify 接 GitHub repo 自动部署 web 版
- **国内用户**：Releases 页下载 APK，传到 Pad 安装

### CLAUDE.md 模板（给下一个 AI 协作者用）

```markdown
# 英语训练师 — 项目指南

## 用户画像（每个孩子都不同，必填）
- 年级：4
- 教材：北京版小学英语
- 弱项：阅读理解
- 兴趣 IP：Minecraft / 宝可梦 / 三角洲行动
- 设备：OPPO Pad 4（Android）

## 核心原则
- **反馈密度 > 教学严谨**。每 5-10 秒必有正向反馈。
- **绝不显示"错"**。所有失败 → "再试一次" + 提示。
- **跟读 / 答题门槛默认调松**（30% / 50% 这类阈值偏向放过）。
- **绝不卡住孩子**。任何关卡都有"跳过"兜底。

## 数据契约（js/data.js，不要扩展字段）
```js
Wordmon: { en, cn, ipa, emoji, sentence }
Reading: { id, theme, title, emoji, paragraphs[], paragraphsZh[], questions[] }
Question: { q, options[4], answer, hint, explanation }
```

## 阅读比例（红线）
每 Unit = 2 教材风（紧扣考点）+ 2 强主题（孩子兴趣 IP）。不要假装强主题。

## 不要碰
- progress.js 的 localStorage schema（老用户进度会丢）
- service-worker.js 的 cache name（变了才 bump）
- 4 关 ID（warmup / words / reading / fun）

## 部署路径
- 国外用户 → 推 Netlify
- 国内用户 → GitHub Actions 打 Android APK，从 Releases 下载

## 协作模式
- 微提交（≤30 min/commit）
- 每次 push 后给「这次改了什么」「您要做什么」3 行说明
- 用户审视时**诚实承认局限**，不要狡辩
- 复杂改动用 ExitPlanMode 让用户先审视 plan
```

---

## Lessons Learned

### 关于产品（给孩子用的学习 App）

1. **反馈密度 = 留存。** 儿童学习 App 跟游戏抢的不是知识，是注意力时间。每 5-10 秒必有正反馈是底线。

2. **绝不显示"错"。** 所有失败要包装成"再试一次"。9 岁的孩子在"X"红叉面前的条件反射就是关闭 App。

3. **兴趣驱动 > 教学严谨。** 偏离教材一点没关系，让孩子愿意打开下一次更重要。完美教材覆盖但孩子不开 = 0 学习。

4. **掌握判定要松。** 50% 阈值劝退；30% 阈值还能让孩子读出第二段。让"开口尝试"就过。

5. **每天有变化 > 完整覆盖。** 同一 Unit 反复做但内容变 = "我每天都在前进"。课文 4 篇轮换比 1 篇精读更耐用。

6. **错题本 + 间隔重复 = 隐形进度。** 孩子不会主动复习，但你可以用"今日热身"自动塞他错过的题。"连对 3 次"是出仓阈值，少错重复多错。

### 关于 Vibe Coding 协作

7. **微提交是金矿。** 22 commits 让回退、审计、解释、Netlify auto-deploy 都简单。每个 commit 单一职责 + Chinese 描述帮你和未来自己对账。

8. **诚实审计自己的工作。** 当用户问"X 是 Y 吗"，立刻承认局限。撒一次谎失去全部信任。这次最重要的回答是"诚实回答：只有微弱关联"。

9. **小心"过度设计"诱惑。** React + 状态机 + 类型系统的方案听着对，但用户实际只需要 4 关 + localStorage。Wordmon 那 4 小时是教训。

10. **写 plan 先于写代码。** ExitPlanMode 强制慢一拍，让用户审视方向。比"做错了再回退"省时。

11. **把外部依赖当成可能失败的。** Netlify / ElevenLabs / Cloudflare tunnels 都可能不可达，做好兜底。Sandbox 限制你能直接调用的范围，要早识别。

12. **用户每说"好麻烦"，反思自动化。** GitHub Actions 是受限用户的"远程 shell"。任何"装 Node + 跑脚本"都能挪到 GitHub UI 一键 Run。

### 关于技术选择

13. **Vanilla > Framework，前提是：** 单页应用 + 内容驱动 + 跨设备 + 没团队。这次条件全中。如果是大型表单 / 复杂状态机就反过来。

14. **localStorage > 后端，前提是：** 单用户 + 不需要同步 + 隐私敏感。给孩子的 App 不需要登录、不需要云存档，反而少一层故障。

15. **预生成 mp3 > 实时 TTS API，前提是：** 内容固定 + 零延迟需求 + API key 不能进浏览器。这次三个全中。

16. **Capacitor > React Native / Flutter，前提是：** 已有网页 + 要快速打包 + 不需要原生 UI。这次完美匹配。

17. **GitHub Actions = 受限用户的"远程 shell"。** 用户没装环境时，CI 是最近的替代。我做的两个 workflow 把"装 Node + 跑 npm + 跑 build"全部挪到 GitHub 网页一键。

18. **移动端打包是"第二个项目"。** 内容功能 4 天做完，但 APK 真机上线又花了一整天填坑：WebView 不支持 Web Speech、CI 丢 gradlew 执行位、manifest 缺麦克风权限。**浏览器里测得再好，WebView + 真机会暴露全新一批问题。** 预算上要把"打包上线"当独立阶段，不是"最后 5 分钟的事"。

19. **WebView ≠ 浏览器。** 桌面 Chrome 能用的 API（SpeechSynthesis、某些 getUserMedia 行为）在 Android WebView 里可能缺失或要额外权限。能离线预生成的（mp3）就别依赖运行时 API。

### 关于移动端打包（Capacitor → APK 专项）

- **gradlew 要 `chmod +x`** — npm 解压常丢执行位，CI 必加。
- **manifest 要手动注入设备权限** — Capacitor 默认只给 INTERNET，麦克风/相机/定位都要自己加 `<uses-permission>`。
- **权限两步：先声明（manifest）后请求（runtime）** — 少一步都不弹窗。
- **CI step 全程 `set -e`** — 别用 `|| echo` 吞错，否则 exit 127 这种根因被藏起来。
- **每步加 `test -f` / `ls -la` 校验** — 移动端工具链脆，显式验证关键产物存在。
- **APK 调试版可直接侧载** — debug 签名能装，但要在系统设置允许"未知来源"。

### 给下一个 AI 协作者的留言

1. **用户给 URL 时，先用 curl + 不同方法（gunzip / tar / file）探一下**，不要假定 WebFetch 是唯一办法。这次我从 binary gzip 里捞出了完整设计稿。

2. **用户每说"想要 X 那个版本"，先问"是要那个 commit 的整体，还是某个特性"。** 这次问了一句省了 1 小时无效回退。

3. **用户每说"X 真的能 Y 吗"，立刻审计自己的工作。** 不要狡辩，先承认。

4. **每次大版本前用 plan 模式。** 让用户看到 plan 总比 4 小时后看到代码还要回退好。

5. **永远把"卡住孩子"当成产品事故。** 跟读 50% / 错题红色 / API 失败时的"无声"——这些都是事故，要兜底。

6. **"做完"和"能用"之间隔着真机。** 内容功能在浏览器里完美 ≠ APK 在 Pad 上能用。每次声称"修好了"前，想一想这个修复要不要重新打包 + 真机验证。给用户明确"下载新 APK 覆盖安装"的步骤，不要让他以为 push 完就生效。

---

## Appendix: 真实使用数据（5 天后）

未收集（孩子才刚开始用）。下一次复盘建议追踪：

- DAU（每天孩子打开几次）
- 单次会话时长
- 4 关每关完成率
- 错题本峰值大小（增长率）
- Unit 自动进阶到第几个
- 战利品累计图鉴

---

*Generated 2026-05-04, updated 2026-05-05 (+上线后真实战场章节) · Claude Sonnet 4.6 · 模仿 [vibe-retrospect](https://github.com/kennyzheng-builds/vibe-retrospect) 格式*
