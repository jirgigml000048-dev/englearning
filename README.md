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

App 默认用浏览器自带 Web Speech API（iPad Safari 上是 Apple Samantha/Karen 等）。
如果想要更自然的童声/外教感觉，可以用 ElevenLabs 一次性生成所有单词 + 课文段落的 mp3：

### 1. 注册并拿 API Key
- 打开 https://elevenlabs.io 注册（免费层每月 10000 字符够用一轮）
- 个人头像 → Profile → 复制 API Key

### 2. 在本地跑生成脚本

```bash
git clone <repo>
cd englearning
ELEVENLABS_API_KEY=sk_xxx node scripts/generate-audio.mjs
```

脚本会读取 `js/data.js` 里的 127 个单词 + 24 篇课文段落 + 例句，生成约 280 个 mp3
文件放进 `audio/words/` `audio/paragraphs/` `audio/sentences/`。

可选环境变量：
- `ELEVENLABS_VOICE_ID=EXAVITQu4vr4xnSDxMaL`（默认 Sarah，温柔清晰）
- 也可换 `21m00Tcm4TlvDq8ikWAM` (Rachel) / `AZnzlk1XvdvUeBnXmlld` (Domi 活泼)
- `FORCE=1` 强制重新生成已存在的文件

### 3. 提交并推送

```bash
git add audio/
git commit -m "Add ElevenLabs voice mp3s"
git push
```

Netlify 自动部署后，App 优先播放 mp3；缺哪个就回落 Web Speech，不影响功能。

---

## 后续可加内容

- [ ] 北京版四上真实单元的词表/课文（需家长导入）
- [ ] 听写本（家长出题、孩子默写）
- [ ] 三角洲行动主题阅读（暂略，因偏军事题材）
- [ ] 跟读评分（需要后端 / 第三方语音 API）
- [ ] 多孩子档案
