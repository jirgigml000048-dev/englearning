# 英语训练师 (English Trainer)

为四年级孩子设计的英语学习 Web App，宝可梦/我的世界主题，针对北京版教材风格的常见词汇与阅读难点。

## 设计目标

针对一名四年级学生：
- 教材：北京版小学英语
- 兴趣：宝可梦、我的世界、三角洲行动
- 弱项：阅读理解
- 心理：缺自信、未养成学习习惯

## 每日 45 分钟学习机制

四个关卡，每关闭环奖励 XP 与徽章：

| 关卡 | 时长 | 内容 |
|---|---|---|
| 🔁 热身复习 | ~5 min | 昨日/最近词的快速选词题 |
| 📚 新词学习 | ~10 min | 单词卡片（图+音+例句）+ 看图选词小测 |
| 📖 阅读冒险 | ~20 min | 宝可梦/我的世界主题短文 + 选择题（答错给提示） |
| 🎮 拼写打怪 | ~10 min | 拼出单词打怪兽，错字母不扣分 |

## 信心建设设计

- **永不显示"错"**：错题改成"再试一次"，并给文字提示
- **正向反馈**：每答对都有鼓励语，徽章解锁有特别奖励
- **可见进步**：完成页对比"今天比昨天多学 X 个词"
- **连续打卡**：streak 越高，主页伙伴宝可梦升级

## 启动方式

任何静态服务器都行。最简单的方法：

```bash
# Python
python3 -m http.server 8000

# 然后用 iPad 浏览器访问 http://<电脑IP>:8000
```

加到 iPad 主屏（"添加到主屏幕"）后，看起来像原生 App。

## 数据结构（如何加入真实教材）

打开 `js/data.js`，每个单元的结构：

```js
{
  id: 'u1',
  name: 'Unit 1 · ...',
  cn: '中文主题',
  words: [
    { en: '英文', cn: '中文', ipa: '音标', emoji: '图标', sentence: '例句 with <b>关键词</b>' },
    ...
  ],
  readings: [
    {
      id: 'u1-r1',
      theme: 'pokemon' | 'minecraft',
      title: '故事标题',
      emoji: '🎯',
      paragraphs: ['第一段...', '第二段...'],
      questions: [
        { q: 'What...?', options: ['A.', 'B.', 'C.', 'D.'], answer: 0, hint: '在第一段' },
        ...
      ]
    }
  ]
}
```

把北京版四上单元的真实词表照这个格式追加即可，不需要改其他代码。

## 家长功能

- 设置 → 查看本周学习报告：每日完成情况、新词数、准确率、徽章
- 一键清空进度（孩子换号或重新开始用）

## 文件结构

```
englearning/
├── index.html
├── manifest.json           # PWA 配置
├── service-worker.js       # 离线缓存
├── css/style.css
├── js/
│   ├── app.js              # 主控制器
│   ├── data.js             # 课程内容（编辑这里加教材）
│   ├── progress.js         # localStorage 进度
│   ├── tts.js              # 浏览器语音合成
│   └── modules/
│       ├── warmup.js
│       ├── words.js
│       ├── reading.js
│       └── fun.js
└── assets/                 # 图标
```

## 高质量 TTS 语音（ElevenLabs，可选）

App 默认用浏览器自带 Web Speech API。如果想要更自然的童声/外教感觉，
可以用 ElevenLabs 一次性生成所有单词 + 课文段落的 mp3。

**最简单的方式：通过 GitHub Actions，全程在云端，您只动 2 次**

### 第 1 次（设置，只需做一次）

1. 注册 ElevenLabs（https://elevenlabs.io）→ 复制 API Key
   （免费层每月 10000 字符，刚好够一轮）

2. 打开 GitHub 仓库 → **Settings** → **Secrets and variables** → **Actions**
   → **New repository secret**
   - Name: `ELEVENLABS_API_KEY`
   - Value: 您的 sk_xxx key
   - 点 Add secret

### 第 2 次（生成音频，每次想换音色再做）

3. GitHub 仓库 → **Actions** 标签 → 左边选 **Generate ElevenLabs Audio**
   → 右上 **Run workflow** 按钮
   - voice_id: 留默认（Sarah 温柔女声）或填别的（推荐见下）
   - force: 第一次留 false。换音色时改 true 强制重新生成
   - 点绿色 **Run workflow**

4. 等 5-10 分钟。Action 跑完会自动 commit 280 个 mp3 到当前分支并 push。
   Netlify 检测到 push 自动部署，iPad 上立刻能听到新音色。

### 想换音色

到 https://elevenlabs.io/voice-library 试听，复制 voice id 填进 Run workflow 的 voice_id 框，force 设为 true。重新跑一次即可。

推荐候选：
- `EXAVITQu4vr4xnSDxMaL` Sarah（温柔清晰美国女声，默认）
- `21m00Tcm4TlvDq8ikWAM` Rachel（标准美国女声）
- `AZnzlk1XvdvUeBnXmlld` Domi（活泼）
- `pFZP5JQG7iQjIQuC4Bku` Lily（英国女声）

### 不想用 ElevenLabs？

不做任何事即可，App 自动回落到浏览器自带 Web Speech，跟之前一样能用。

### 本地手动跑（备用）

```bash
ELEVENLABS_API_KEY=sk_xxx node scripts/generate-audio.mjs
git add audio/ && git commit -m "Add audio" && git push
```

---

## 📱 Android APK 版（推荐 OPPO Pad / 国内不便访问 Netlify 时）

把整个 App 打包成 Android APK，**装到 Pad 上完全离线运行，不需要 VPN、不需要 Netlify、不需要任何网络**（除了第一次下载 APK）。

**总流程**：GitHub 网页一键 Run → 等 5-10 分钟 → 进 Releases 页下载 APK → 装到 Pad → 用。

### 一次性建议：先生成音频

为了让 APK 里也有 ElevenLabs 真人发音，建议先按上面的「高质量 TTS 语音」一节跑一次 **Generate ElevenLabs Audio** workflow，让 audio/ 进 git。

如果跳过这一步直接构建 APK，那 APK 里只有 Web Speech 降级（在 Android WebView 里效果有限，可能没声音），**强烈建议先生成音频再打包**。

### 打包 APK

1. GitHub 仓库 → **Actions** 标签
2. 左边选 **Build Android APK** → 右上 **Run workflow** → 绿色 Run workflow

5-10 分钟构建完成。

### 下载 + 安装到 OPPO Pad 4

1. GitHub 仓库 → **Releases**（右边栏）→ 找最新的 **android-latest**
2. 下载 `english-trainer-v1.N.apk`
3. 把 APK 传到 Pad（任何方式都行：微信发自己 / QQ / 邮件 / U 盘 / 浏览器在 Pad 上直接下载）
4. Pad 上点开 APK
5. 系统弹"未知来源应用"警告 → 进设置允许 → 返回继续安装
6. 装好点图标"英语训练师"打开 → 全部功能离线可用

### 后续更新 App

每次代码 push（包括我修 bug、加内容），workflow 会自动重新构建 APK。您 Pad 上想更新时，去 Releases 下载最新版覆盖安装即可（数据/进度保留在 localStorage 不会丢）。

如果不想被自动构建打扰，把 `.github/workflows/build-android.yml` 里的 `on.push` 段删掉只保留 `workflow_dispatch` 即可。

---



- [ ] 北京版四上真实单元的词表/课文（需家长导入）
- [ ] 听写本（家长出题、孩子默写）
- [ ] 三角洲行动主题阅读（暂略，因偏军事题材）
- [ ] 跟读评分（需要后端 / 第三方语音 API）
- [ ] 多孩子档案
