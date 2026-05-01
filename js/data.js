/* ============================================================
 * 课程数据 (北京版四年级上册 风格 · 通用四年级词汇)
 * 数据结构开放：之后可把真实教材内容直接替换/追加进 UNITS。
 * ============================================================ */
window.CURRICULUM = {
  // 每个单元：单词 + 阅读篇目 (主题：宝可梦 / 我的世界 / 三角洲)
  units: [
    /* ---------------- Unit 1: Daily Life ---------------- */
    {
      id: 'u1',
      name: 'Unit 1 · My Day',
      cn: '我的一天',
      words: [
        { en: 'morning',   cn: '早上',   ipa: '/ˈmɔːrnɪŋ/', emoji: '🌅', sentence: 'Good <b>morning</b>! It is sunny today.' },
        { en: 'breakfast', cn: '早餐',   ipa: '/ˈbrekfəst/', emoji: '🥞', sentence: 'I eat <b>breakfast</b> at seven.' },
        { en: 'school',    cn: '学校',   ipa: '/skuːl/',     emoji: '🏫', sentence: 'I go to <b>school</b> by bike.' },
        { en: 'lunch',     cn: '午餐',   ipa: '/lʌntʃ/',     emoji: '🍱', sentence: 'We have <b>lunch</b> at noon.' },
        { en: 'homework',  cn: '作业',   ipa: '/ˈhoʊmwɜːrk/',emoji: '📒', sentence: 'I do my <b>homework</b> after school.' },
        { en: 'dinner',    cn: '晚餐',   ipa: '/ˈdɪnər/',    emoji: '🍝', sentence: 'My family has <b>dinner</b> at six.' },
        { en: 'play',      cn: '玩',     ipa: '/pleɪ/',      emoji: '🎮', sentence: 'I <b>play</b> games on weekends.' },
        { en: 'sleep',     cn: '睡觉',   ipa: '/sliːp/',     emoji: '😴', sentence: 'I <b>sleep</b> at nine thirty.' }
      ],
      readings: [
        {
          id: 'u1-r1',
          theme: 'pokemon',
          title: "Ash's Busy Day",
          emoji: '⚡',
          paragraphs: [
            "Ash is a Pokemon trainer. Every morning he gets up at six.",
            "He eats breakfast with Pikachu. They like apples and bread.",
            "At eight, Ash goes to school. After school, he does his homework.",
            "Then he plays with Pikachu in the park. They have dinner at six.",
            "Ash goes to sleep at nine. He dreams about new Pokemon!"
          ],
          questions: [
            {
              q: 'What time does Ash get up?',
              options: ['Six.', 'Seven.', 'Eight.', 'Nine.'],
              answer: 0,
              hint: '看第一段：he gets up at six.'
            },
            {
              q: 'Who eats breakfast with Ash?',
              options: ['His mom.', 'His dad.', 'Pikachu.', 'A teacher.'],
              answer: 2,
              hint: '第二段第一句。'
            },
            {
              q: 'What does Ash do after school?',
              options: ['He plays games.', 'He does homework.', 'He sleeps.', 'He eats lunch.'],
              answer: 1,
              hint: '第三段最后一句。'
            },
            {
              q: 'When does Ash go to sleep?',
              options: ['At six.', 'At eight.', 'At nine.', 'At ten.'],
              answer: 2,
              hint: '最后一段。'
            }
          ]
        }
      ]
    },

    /* ---------------- Unit 2: Weather & Seasons ---------------- */
    {
      id: 'u2',
      name: 'Unit 2 · Weather',
      cn: '天气与季节',
      words: [
        { en: 'sunny',  cn: '晴朗的', ipa: '/ˈsʌni/',  emoji: '☀️', sentence: 'It is <b>sunny</b> today.' },
        { en: 'rainy',  cn: '下雨的', ipa: '/ˈreɪni/', emoji: '🌧️', sentence: 'It is <b>rainy</b> in spring.' },
        { en: 'cloudy', cn: '多云的', ipa: '/ˈklaʊdi/',emoji: '☁️', sentence: 'The sky is <b>cloudy</b>.' },
        { en: 'windy',  cn: '有风的', ipa: '/ˈwɪndi/', emoji: '💨', sentence: 'It is <b>windy</b> outside.' },
        { en: 'snowy',  cn: '下雪的', ipa: '/ˈsnoʊi/', emoji: '❄️', sentence: 'It is <b>snowy</b> in winter.' },
        { en: 'hot',    cn: '热的',   ipa: '/hɑːt/',   emoji: '🔥', sentence: 'Summer is <b>hot</b>.' },
        { en: 'cold',   cn: '冷的',   ipa: '/koʊld/',  emoji: '🥶', sentence: 'Winter is <b>cold</b>.' },
        { en: 'warm',   cn: '温暖的', ipa: '/wɔːrm/',  emoji: '🌤️', sentence: 'Spring is <b>warm</b>.' }
      ],
      readings: [
        {
          id: 'u2-r1',
          theme: 'minecraft',
          title: 'Steve in Minecraft',
          emoji: '⛏️',
          paragraphs: [
            "Steve lives in a Minecraft world. Today is sunny and warm.",
            "He wants to build a house. He cuts trees with his axe.",
            "Then it gets cloudy. The sky turns dark. It is rainy now!",
            "Steve runs to a cave. The cave is warm and safe.",
            "After the rain, the sky is sunny again. Steve goes home with wood."
          ],
          questions: [
            {
              q: "How is the weather at first?",
              options: ['Snowy.', 'Sunny and warm.', 'Cold.', 'Windy.'],
              answer: 1,
              hint: '第一段最后。'
            },
            {
              q: "What does Steve do with his axe?",
              options: ['He cuts trees.', 'He fights a zombie.', 'He cooks food.', 'He builds stone.'],
              answer: 0,
              hint: '第二段。'
            },
            {
              q: "Where does Steve go when it rains?",
              options: ['Home.', 'A village.', 'A cave.', 'A river.'],
              answer: 2,
              hint: '第四段。'
            },
            {
              q: "What does Steve take home at the end?",
              options: ['Stone.', 'Apples.', 'Wood.', 'A sword.'],
              answer: 2,
              hint: '最后一句。'
            }
          ]
        }
      ]
    },

    /* ---------------- Unit 3: Hobbies ---------------- */
    {
      id: 'u3',
      name: 'Unit 3 · Hobbies',
      cn: '兴趣爱好',
      words: [
        { en: 'read',  cn: '阅读',   ipa: '/riːd/',     emoji: '📖', sentence: 'I like to <b>read</b> books.' },
        { en: 'draw',  cn: '画画',   ipa: '/drɔː/',     emoji: '🎨', sentence: 'She can <b>draw</b> a cat.' },
        { en: 'sing',  cn: '唱歌',   ipa: '/sɪŋ/',      emoji: '🎤', sentence: 'We <b>sing</b> a song together.' },
        { en: 'dance', cn: '跳舞',   ipa: '/dæns/',     emoji: '💃', sentence: 'They <b>dance</b> at the party.' },
        { en: 'swim',  cn: '游泳',   ipa: '/swɪm/',     emoji: '🏊', sentence: 'I can <b>swim</b> very fast.' },
        { en: 'run',   cn: '跑步',   ipa: '/rʌn/',      emoji: '🏃', sentence: 'He likes to <b>run</b> in the park.' },
        { en: 'ride',  cn: '骑',     ipa: '/raɪd/',     emoji: '🚴', sentence: 'I <b>ride</b> a bike to school.' },
        { en: 'cook',  cn: '做饭',   ipa: '/kʊk/',      emoji: '👩‍🍳', sentence: 'My mom can <b>cook</b> noodles.' }
      ],
      readings: [
        {
          id: 'u3-r1',
          theme: 'pokemon',
          title: "Pikachu's Friends",
          emoji: '🐰',
          paragraphs: [
            "Pikachu has many Pokemon friends. They all like different things.",
            "Charmander likes to draw fire pictures. Squirtle likes to swim in the lake.",
            "Bulbasaur likes to read books under a big tree. Eevee likes to sing songs.",
            "On Sunday, they all play together. They run, sing, and dance.",
            "Pikachu is happy. Friends make every day fun!"
          ],
          questions: [
            {
              q: 'What does Squirtle like to do?',
              options: ['Draw.', 'Read.', 'Swim.', 'Sing.'],
              answer: 2,
              hint: '第二段提到 Squirtle。'
            },
            {
              q: 'Who likes to read books?',
              options: ['Charmander.', 'Bulbasaur.', 'Eevee.', 'Pikachu.'],
              answer: 1,
              hint: '第三段第一句。'
            },
            {
              q: 'What do they do on Sunday?',
              options: ['Sleep all day.', 'Go to school.', 'Play together.', 'Eat lunch.'],
              answer: 2,
              hint: '第四段。'
            },
            {
              q: 'Why is Pikachu happy?',
              options: ['It is sunny.', 'Friends make every day fun.', 'It eats apples.', 'It wins a game.'],
              answer: 1,
              hint: '最后一段。'
            }
          ]
        }
      ]
    }
  ],

  /* 鼓励语：避免负面评价，永远正向 */
  encouragements: [
    '太棒了！你又解锁了一个新词！',
    '读得很好！你的英语越来越流利了！',
    '哇，这个题答对了，超级棒！',
    '坚持就是胜利，你真的很棒！',
    '看，你比昨天又厉害了一点！',
    '宝可梦训练师 +1 经验值！',
    '继续，下一关也能赢！'
  ],

  /* 错题提示语：温和不打击 */
  retryTips: [
    '差一点就对啦，再读一遍课文试试看～',
    '没关系，宝可梦也会失败再赢的！',
    '提示已经亮起来了，再来一次！',
    '深呼吸，慢慢看，你可以的！'
  ],

  /* 徽章定义 */
  badges: [
    { id: 'first_day',   icon: '🎯', name: '初次训练',   condition: 'streak>=1' },
    { id: 'three_day',   icon: '🔥', name: '三日连击',   condition: 'streak>=3' },
    { id: 'week_warrior',icon: '⚔️', name: '一周战士',   condition: 'streak>=7' },
    { id: 'word_50',     icon: '📚', name: '50词图鉴',   condition: 'words>=50' },
    { id: 'word_100',    icon: '🏆', name: '百词大师',   condition: 'words>=100' },
    { id: 'reader_10',   icon: '📖', name: '阅读小将',   condition: 'reads>=10' },
    { id: 'perfect',     icon: '⭐', name: '满分时刻',   condition: 'perfect>=1' },
    { id: 'level_5',     icon: '🌟', name: 'Lv.5 训练师',condition: 'level>=5' }
  ],

  /* 头像可选项 */
  avatars: ['🧒','👦','👧','🧑','🦸','🧙','🤖','🐲','🦊','🐱']
};
