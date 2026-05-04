/* ============================================================
 * 课程数据 — 北京版小学英语 四年级上册（2025 新版）
 * 内容来源：用户提供的真实词表 + 句型 + 拼读 + 阅读
 * 数据结构：每个 Unit = { words[], readings[] }
 * 例句优先使用教材原句型；阅读自创为方块世界主题（适配 Voxel 皮肤）
 * ============================================================ */
window.CURRICULUM = {
  units: [

    /* ========================================================
     * Unit 1 · My Hobbies
     * ======================================================== */
    {
      id: 'u1',
      name: 'Unit 1 · My Hobbies',
      cn: '我的爱好',
      phonics: 'sh — wish, fish, dish, ship, shop',
      words: [
        { en: 'hobby',   cn: '爱好',     ipa: '/ˈhɒbi/',     emoji: '🎨', sentence: "What's your <b>hobby</b>? My hobby is dancing." },
        { en: 'kind',    cn: '种类',     ipa: '/kaɪnd/',     emoji: '🧩', sentence: 'What <b>kind</b> of music do you like?' },
        { en: 'folk',    cn: '民间的',   ipa: '/foʊk/',      emoji: '🎻', sentence: '<b>Folk</b> music is my favourite.' },
        { en: 'club',    cn: '俱乐部',   ipa: '/klʌb/',      emoji: '🏛️', sentence: 'Which <b>club</b> do you want to join?' },
        { en: 'join',    cn: '参加',     ipa: '/dʒɔɪn/',     emoji: '🤝', sentence: 'I want to <b>join</b> the Dance Club.' },
        { en: 'because', cn: '因为',     ipa: '/bɪˈkɔːz/',   emoji: '💡', sentence: 'I join the club <b>because</b> I like dancing.' },
        { en: 'science', cn: '科学',     ipa: '/ˈsaɪəns/',   emoji: '🔬', sentence: 'I love <b>science</b>. I want to be a scientist.' },
        { en: 'chess',   cn: '国际象棋', ipa: '/tʃes/',      emoji: '♟️', sentence: 'My hobby is playing <b>chess</b>.' },
        { en: 'well',    cn: '好',       ipa: '/wel/',       emoji: '👍', sentence: 'She sings very <b>well</b>.' },
        { en: 'why',     cn: '为什么',   ipa: '/waɪ/',       emoji: '❓', sentence: '<b>Why</b> do you want to join the club?' },
        { en: 'fan',     cn: '迷',       ipa: '/fæn/',       emoji: '🌟', sentence: "I'm a big <b>fan</b> of football." },
        { en: 'travel',  cn: '旅游',     ipa: '/ˈtrævl/',    emoji: '✈️', sentence: 'I like to <b>travel</b> in summer.' },
        { en: 'study',   cn: '观察；学习', ipa: '/ˈstʌdi/',  emoji: '📖', sentence: 'I like to <b>study</b> animals in the forest.' },
        { en: 'face',    cn: '脸',       ipa: '/feɪs/',      emoji: '😀', sentence: 'Look at his <b>face</b>. He is happy.' },
        { en: 'feeling', cn: '情绪',     ipa: '/ˈfiːlɪŋ/',   emoji: '💭', sentence: 'What is your <b>feeling</b> today?' }
      ],
      readings: [{
        id: 'u1-r1',
        theme: 'minecraft',
        title: "Steve Joins a Club",
        emoji: '🏛️',
        paragraphs: [
          "Steve lives in a Minecraft village. He has many hobbies. He likes building, mining, and reading.",
          "Today there is a new club in the village. It is the Building Club. Steve wants to join it because he loves building.",
          "Alex joins the Music Club. She is a big fan of folk music. She sings very well.",
          "Steve says, \"Why do you join the Music Club?\" Alex says, \"Because music makes me happy.\"",
          "Steve is happy too. He builds a new house. Alex sings a song. They are best friends."
        ],
        paragraphsZh: [
          "Steve 住在一个 Minecraft 村庄里。他有很多爱好。他喜欢建造、挖矿和阅读。",
          "今天村子里来了一个新俱乐部——建造俱乐部。Steve 想加入，因为他热爱建造。",
          "Alex 加入了音乐俱乐部。她是民间音乐的超级粉丝，唱歌唱得非常好。",
          "Steve 问：\"你为什么加入音乐俱乐部？\" Alex 说：\"因为音乐让我开心。\"",
          "Steve 也很开心。他造了一座新房子，Alex 唱了一首歌。他们是最好的朋友。"
        ],
        questions: [
          { q: "What is Steve's hobby?",                 options: ['Dancing.', 'Building, mining, and reading.', 'Cooking.', 'Sleeping.'],          answer: 1, hint: '看第一段最后一句。',           explanation: '第一段说 "He likes building, mining, and reading." 这是 Steve 的三个爱好。其它选项原文里都没出现。' },
          { q: "Which club does Steve want to join?",    options: ['Music Club.', 'Dance Club.', 'Building Club.', 'Science Club.'],                answer: 2, hint: '第二段。',                     explanation: '第二段提到 "It is the Building Club. Steve wants to join it"。注意 Music Club 是 Alex 加入的，要看清"who"。' },
          { q: "Why does Alex join the Music Club?",     options: ['She is a fan of football.', 'She likes folk music.', 'Because music makes her happy.', 'She wants to travel.'], answer: 2, hint: '第四段，Alex 自己说的。',     explanation: '考点：because 引导原因。第四段 Alex 直接说 "Because music makes me happy."。"She likes folk music"虽然第三段提到，但这道题问 why she joins，要看 Alex 自己给的理由。' },
          { q: "How does Steve feel at the end?",        options: ['Sad.', 'Tired.', 'Angry.', 'Happy.'],                                            answer: 3, hint: '最后一段。',                   explanation: '最后一段 "Steve is happy too." 直接告诉答案。注意 too 表示"也"，因为 Alex 也开心。' }
        ]
      }]
    },

    /* ========================================================
     * Unit 2 · Keep Safe
     * ======================================================== */
    {
      id: 'u2',
      name: 'Unit 2 · Keep Safe',
      cn: '注意安全',
      phonics: 'ch / tch — chair, chess, watch, catch, kitchen',
      words: [
        { en: 'throw',     cn: '扔',       ipa: '/θroʊ/',       emoji: '🪃', sentence: "Please don't <b>throw</b> things out of the window." },
        { en: 'thing',     cn: '东西',     ipa: '/θɪŋ/',        emoji: '📦', sentence: "Don't throw <b>things</b> on the floor." },
        { en: 'out',       cn: '在…之外', ipa: '/aʊt/',        emoji: '➡️', sentence: "He runs <b>out</b> of the house." },
        { en: 'safe',      cn: '安全的',   ipa: '/seɪf/',       emoji: '🛡️', sentence: 'The cave is warm and <b>safe</b>.' },
        { en: 'down',      cn: '向下',     ipa: '/daʊn/',       emoji: '⬇️', sentence: "Don't run <b>down</b> the stairs." },
        { en: 'stair',     cn: '楼梯',     ipa: '/ster/',       emoji: '🪜', sentence: 'Walk down the <b>stairs</b> slowly.' },
        { en: 'skate',     cn: '滑冰',     ipa: '/skeɪt/',      emoji: '⛸️', sentence: "It's dangerous to <b>skate</b> on thin ice." },
        { en: 'fall',      cn: '掉进',     ipa: '/fɔːl/',       emoji: '💧', sentence: 'You may <b>fall</b> into the lake.' },
        { en: 'March',     cn: '三月',     ipa: '/mɑːrtʃ/',     emoji: '📅', sentence: 'My birthday is in <b>March</b>.' },
        { en: 'thin',      cn: '薄的',     ipa: '/θɪn/',        emoji: '🧊', sentence: "Don't skate on <b>thin</b> ice." },
        { en: 'dangerous', cn: '危险的',   ipa: '/ˈdeɪndʒərəs/', emoji: '⚠️', sentence: "It's <b>dangerous</b> to play with fire." },
        { en: 'board',     cn: '告示牌',   ipa: '/bɔːrd/',      emoji: '🪧', sentence: 'Look at the warning <b>board</b>.' },
        { en: 'lake',      cn: '湖',       ipa: '/leɪk/',       emoji: '🏞️', sentence: 'There is a big <b>lake</b> behind the village.' },
        { en: 'careful',   cn: '小心的',   ipa: '/ˈkerfl/',     emoji: '🚸', sentence: 'Be <b>careful</b>! No pushing.' },
        { en: 'push',      cn: '推',       ipa: '/pʊʃ/',        emoji: '✋', sentence: 'No <b>pushing</b> in the line.' },
        { en: 'crowd',     cn: '人群',     ipa: '/kraʊd/',      emoji: '👥', sentence: 'The street is full of <b>crowds</b>.' },
        { en: 'slowly',    cn: '缓慢地',   ipa: '/ˈsloʊli/',    emoji: '🐢', sentence: 'Walk <b>slowly</b> on the wet floor.' },
        { en: 'fast',      cn: '快速地',   ipa: '/fæst/',       emoji: '💨', sentence: "Don't run too <b>fast</b> in the classroom." },
        { en: 'street',    cn: '街道',     ipa: '/striːt/',     emoji: '🛣️', sentence: 'Look both ways before crossing the <b>street</b>.' },
        { en: 'light',     cn: '灯',       ipa: '/laɪt/',       emoji: '🚦', sentence: 'He should stop at the red <b>light</b>.' },
        { en: 'again',     cn: '再一次',   ipa: '/əˈɡen/',      emoji: '🔁', sentence: 'Try <b>again</b>! You can do it.' }
      ],
      readings: [{
        id: 'u2-r1',
        theme: 'minecraft',
        title: "Alex Stays Safe",
        emoji: '⚠️',
        paragraphs: [
          "It is March. Today is sunny. Alex wants to go skating on the lake.",
          "But the ice is thin. Steve sees a board near the lake. The board says: \"Danger! Thin ice!\"",
          "Steve says, \"Alex, be careful! It is dangerous to skate on thin ice. You may fall into the lake.\"",
          "Alex says, \"Thank you, Steve!\" She walks down to the village slowly.",
          "On the street, she sees a red light. She stops. The light turns green. Then she walks again. Safe and happy!"
        ],
        paragraphsZh: [
          "现在是三月，今天天晴。Alex 想去湖上滑冰。",
          "但是冰很薄。Steve 在湖边看到一块告示牌，上面写着：\"危险！薄冰！\"",
          "Steve 说：\"Alex，小心！在薄冰上滑冰很危险，你可能会掉进湖里。\"",
          "Alex 说：\"谢谢你，Steve！\" 她慢慢走回村庄。",
          "在街上，她看到红灯，停了下来。灯变绿了，她才再次往前走。安全又开心！"
        ],
        questions: [
          { q: "What month is it in the story?",          options: ['May.', 'March.', 'July.', 'October.'],                                          answer: 1, hint: '第一段第一句。',                  explanation: '考点：月份名称首字母大写。"It is March." 直接告诉了月份。注意 1-12 月一定要会拼。' },
          { q: "Why is the lake dangerous?",              options: ['It is too big.', 'The ice is thin.', 'It is far away.', 'It is rainy.'],         answer: 1, hint: '第二段。',                       explanation: '考点：dangerous + thin ice 的搭配。第二段开头 "But the ice is thin"。It\'s dangerous to skate on thin ice 是固定句型，要熟记。' },
          { q: "Who tells Alex to be careful?",           options: ['Her mom.', 'A robot.', 'Steve.', 'A teacher.'],                                  answer: 2, hint: '第三段。',                       explanation: '第三段开头 "Steve says, \"Alex, be careful!\""。看引号前面是谁说话，是阅读题最常用的小窍门。' },
          { q: "What does Alex do at the red light?",     options: ['She runs fast.', 'She stops.', 'She walks back.', 'She skates.'],                answer: 1, hint: '最后一段。',                     explanation: '考点：交通规则 + should 用法。最后一段 "She stops" 直接说出答案。教材原句 "He should stop at the red light" 也是同一考点。' }
        ]
      }]
    },

    /* ========================================================
     * Unit 3 · Do Sports
     * ======================================================== */
    {
      id: 'u3',
      name: 'Unit 3 · Do Sports',
      cn: '运动',
      phonics: 'th — think, three, this, that, mother',
      words: [
        { en: 'fun',           cn: '有趣的',   ipa: '/fʌn/',         emoji: '🎉', sentence: 'PE class is so much <b>fun</b>!' },
        { en: 'game',          cn: '游戏',     ipa: '/ɡeɪm/',        emoji: '🎮', sentence: 'Which <b>game</b> do you want to play?' },
        { en: 'be good at',    cn: '擅长',     ipa: '/biː ɡʊd æt/',  emoji: '💪', sentence: 'Yangyang <b>is good at</b> jianzi.' },
        { en: 'seventy',       cn: '七十',     ipa: '/ˈsevənti/',    emoji: '7️⃣', sentence: 'I have <b>seventy</b> coins.' },
        { en: 'eighty',        cn: '八十',     ipa: '/ˈeɪti/',       emoji: '8️⃣', sentence: 'There are <b>eighty</b> sheep in the farm.' },
        { en: 'ninety',        cn: '九十',     ipa: '/ˈnaɪnti/',     emoji: '9️⃣', sentence: 'My grandpa is <b>ninety</b> years old.' },
        { en: 'tired',         cn: '疲惫的',   ipa: '/ˈtaɪərd/',     emoji: '😩', sentence: 'I run too much. I am <b>tired</b>.' },
        { en: 'win',           cn: '赢',       ipa: '/wɪn/',         emoji: '🏆', sentence: 'Does Sara <b>win</b> the game? Yes, she does.' },
        { en: 'hundred',       cn: '一百',     ipa: '/ˈhʌndrəd/',    emoji: '💯', sentence: 'She makes a <b>hundred</b> jumps in one minute.' },
        { en: 'kung fu',       cn: '功夫',     ipa: '/ˌkʌŋ ˈfuː/',   emoji: '🥋', sentence: 'I learn <b>kung fu</b> on weekends.' },
        { en: 'leg',           cn: '腿',       ipa: '/leɡ/',         emoji: '🦵', sentence: 'My right <b>leg</b> hurts.' },
        { en: 'hurt',          cn: '受伤',     ipa: '/hɜːrt/',       emoji: '🩹', sentence: "What's the matter? My leg <b>hurts</b>." },
        { en: 'badly',         cn: '严重地',   ipa: '/ˈbædli/',      emoji: '😣', sentence: 'He is <b>badly</b> hurt. Call a doctor!' },
        { en: 'king',          cn: '国王',     ipa: '/kɪŋ/',         emoji: '👑', sentence: 'Pelé is the <b>king</b> of football.' },
        { en: 'visit',         cn: '拜访',     ipa: '/ˈvɪzɪt/',      emoji: '🚶', sentence: 'We <b>visit</b> the Great Wall every summer.' },
        { en: 'the Great Wall', cn: '长城',    ipa: '/ðə ɡreɪt wɔːl/', emoji: '🧱', sentence: '<b>The Great Wall</b> is very long.' },
        { en: 'hero',          cn: '英雄',     ipa: '/ˈhɪroʊ/',      emoji: '🦸', sentence: 'Pelé is my <b>hero</b>.' },
        { en: 'him',           cn: '他（宾格）', ipa: '/hɪm/',       emoji: '👨', sentence: 'I tell <b>him</b> the good news.' }
      ],
      readings: [{
        id: 'u3-r1',
        theme: 'minecraft',
        title: "Steve Wins the Sports Day",
        emoji: '🏆',
        paragraphs: [
          "Today is Sports Day in the village. Steve and Alex play many games.",
          "Steve is good at jumping. He makes ninety jumps in one minute. He is the king of jumping!",
          "Alex plays football. She is good at it. She wins the game one hundred to seventy.",
          "After the game, Alex is tired. Her leg hurts a little, but not badly.",
          "Steve says, \"You are my hero, Alex!\" Alex smiles. \"Sports Day is so much fun!\""
        ],
        paragraphsZh: [
          "今天是村庄的运动日。Steve 和 Alex 玩了很多比赛。",
          "Steve 擅长跳跃。他一分钟跳了 90 下，是跳跃之王！",
          "Alex 踢足球，她也很擅长。她以 100 比 70 赢了比赛。",
          "比赛结束后，Alex 累了。她的腿有点疼，但不严重。",
          "Steve 说：\"Alex，你是我的英雄！\" Alex 笑了笑：\"运动日太有趣了！\""
        ],
        questions: [
          { q: "What is Steve good at?",                  options: ['Football.', 'Kung fu.', 'Jumping.', 'Chess.'],                                  answer: 2, hint: '第二段。',                          explanation: '考点：be good at + 动名词。"Steve is good at jumping." (jumping 是 jump+ing)。注意 at 后面只能跟动名词，不能跟动词原形。' },
          { q: "How many jumps does Steve make?",         options: ['Seventy.', 'Eighty.', 'Ninety.', 'A hundred.'],                                 answer: 2, hint: '第二段，"ninety jumps"。',          explanation: '考点：70/80/90/100 数字拼读。"ninety" = 90。要会区分 nineteen (19) vs ninety (90)，词尾 -teen vs -ty 是高频考点。' },
          { q: "Does Alex win the football game?",        options: ['Yes, she does.', 'No, she does not.', 'They draw.', 'The story does not say.'], answer: 0, hint: '第三段，"She wins the game"。',     explanation: '考点：一般疑问句的回答 Yes/No + 主语 + does/doesn\'t。"She wins" 表示赢了，所以回答 "Yes, she does."。注意第三人称单数动词加 -s。' },
          { q: "How does Alex feel after the game?",      options: ['Sad.', 'Tired.', 'Angry.', 'Hungry.'],                                          answer: 1, hint: '第四段第一句。',                      explanation: '第四段 "Alex is tired" 直接说出。Tired 是形容词表示"累了"，也是常考词。其它三个形容词读音也要会区分。' }
        ]
      }]
    },

    /* ========================================================
     * Unit 5 · Celebrate Special Holidays
     * (Unit 4 是综合复习，本 App 暂不单列)
     * ======================================================== */
    {
      id: 'u5',
      name: 'Unit 5 · Celebrate Holidays',
      cn: '欢度节日',
      phonics: 'wh / ph / ck — what, why, phone, photo, duck, kick',
      words: [
        { en: 'Labour Day',    cn: '劳动节',     ipa: '/ˈleɪbər deɪ/',   emoji: '👷', sentence: '<b>Labour Day</b> is on 1st May in China.' },
        { en: 'holiday',       cn: '节日',       ipa: '/ˈhɑːlədeɪ/',     emoji: '🎉', sentence: "What's your favourite <b>holiday</b>?" },
        { en: 'May',           cn: '五月',       ipa: '/meɪ/',           emoji: '📅', sentence: 'Labour Day is on 1st <b>May</b>.' },
        { en: 'June',          cn: '六月',       ipa: '/dʒuːn/',         emoji: '📅', sentence: "Children's Day is on 1st <b>June</b>." },
        { en: 'July',          cn: '七月',       ipa: '/dʒuˈlaɪ/',       emoji: '📅', sentence: 'Naadam is in <b>July</b> or August.' },
        { en: 'August',        cn: '八月',       ipa: '/ˈɔːɡəst/',       emoji: '📅', sentence: 'Summer holiday is in July and <b>August</b>.' },
        { en: 'September',     cn: '九月',       ipa: '/sepˈtembər/',    emoji: '📅', sentence: 'School begins in <b>September</b>.' },
        { en: 'October',       cn: '十月',       ipa: '/ɑːkˈtoʊbər/',    emoji: '📅', sentence: "China's National Day is on 1st <b>October</b>." },
        { en: 'November',      cn: '十一月',     ipa: '/noʊˈvembər/',    emoji: '📅', sentence: "Children's Day in Canada is on 20th <b>November</b>." },
        { en: 'chore',         cn: '家务',       ipa: '/tʃɔːr/',         emoji: '🧹', sentence: 'I help my parents with the <b>chores</b>.' },
        { en: 'the USA',       cn: '美国',       ipa: '/ðə juː es eɪ/',  emoji: '🇺🇸', sentence: "Labour Day is on the first Monday of September in <b>the USA</b>." },
        { en: 'Canada',        cn: '加拿大',     ipa: '/ˈkænədə/',       emoji: '🇨🇦', sentence: "Children's Day in <b>Canada</b> is on 20th November." },
        { en: 'often',         cn: '经常',       ipa: '/ˈɔːfn/',         emoji: '🔄', sentence: 'Naadam <b>often</b> lasts three to seven days.' },
        { en: 'cinema',        cn: '电影院',     ipa: '/ˈsɪnəmə/',       emoji: '🎬', sentence: 'We go to the <b>cinema</b> on weekends.' },
        { en: 'zoo',           cn: '动物园',     ipa: '/zuː/',           emoji: '🦁', sentence: "Let's go to the <b>zoo</b> on Children's Day." },
        { en: 'National Day',  cn: '国庆节',     ipa: '/ˈnæʃnəl deɪ/',   emoji: '🎆', sentence: '<b>National Day</b> is on 1st October.' },
        { en: 'flag',          cn: '旗',         ipa: '/flæɡ/',          emoji: '🚩', sentence: 'People put up red <b>flags</b>.' },
        { en: 'watch',         cn: '看',         ipa: '/wɑːtʃ/',         emoji: '👀', sentence: 'We <b>watch</b> a film at the cinema.' },
        { en: 'early',         cn: '早的',       ipa: '/ˈɜːrli/',        emoji: '🌅', sentence: 'I get up <b>early</b> on the National Day.' },
        { en: 'special',       cn: '特别的',     ipa: '/ˈspeʃl/',        emoji: '✨', sentence: "Today is a <b>special</b> day." },
        { en: 'Water-Splashing Festival', cn: '泼水节', ipa: '/ˈwɔːtər ˈsplæʃɪŋ ˈfestəvəl/', emoji: '💦', sentence: '<b>Water-Splashing Festival</b> is in April.' },
        { en: 'April',         cn: '四月',       ipa: '/ˈeɪprəl/',       emoji: '📅', sentence: 'Water-Splashing Festival is in <b>April</b>.' },
        { en: 'Inner Mongolia', cn: '内蒙古',    ipa: '/ˈɪnər mɒŋˈɡoʊliə/', emoji: '🐎', sentence: 'Naadam is in <b>Inner Mongolia</b>.' },
        { en: 'Naadam',        cn: '那达慕',     ipa: '/ˈnɑːdɑːm/',      emoji: '🏇', sentence: '<b>Naadam</b> often lasts three to seven days.' }
      ],
      readings: [{
        id: 'u5-r1',
        theme: 'minecraft',
        title: "National Day in the Village",
        emoji: '🚩',
        paragraphs: [
          "Today is a special day. It is 1st October — China's National Day!",
          "Steve gets up early. He puts up a red flag in front of his house.",
          "Alex helps her parents with the chores. Then they watch a film at the cinema.",
          "In the evening, Steve and Alex go to the zoo. They see pandas, tigers, and lions.",
          "\"National Day is the best holiday!\" Alex says. Steve smiles. \"Yes! And next month is my birthday in November!\""
        ],
        paragraphsZh: [
          "今天是个特别的日子。是 10 月 1 日——中国的国庆节！",
          "Steve 早早起床，在家门前升起了一面红色的国旗。",
          "Alex 帮父母做家务。然后他们去电影院看了一场电影。",
          "晚上，Steve 和 Alex 去动物园。他们看到了大熊猫、老虎和狮子。",
          "\"国庆节是最好的节日！\" Alex 说。Steve 笑着说：\"是的！下个月，11 月就是我的生日了！\""
        ],
        questions: [
          { q: "What day is it in the story?",            options: ["Children's Day.", "National Day.", 'Labour Day.', 'Naadam.'],                  answer: 1, hint: '第一段。',                          explanation: '考点：节日日期对照。"It is 1st October — China\'s National Day"。要记住四个节日的日期：Labour Day-1st May / National Day-1st October / Children\'s Day-1st June / Naadam-July or August。' },
          { q: "What does Steve put up?",                 options: ['A photo.', 'A board.', 'A red flag.', 'A light.'],                              answer: 2, hint: '第二段。',                          explanation: '考点：put up 动词词组 = 升起/挂起。第二段 "He puts up a red flag"。注意是 puts up，第三人称单数加 s。' },
          { q: "Where do they go in the evening?",        options: ['Cinema.', 'School.', 'The Great Wall.', 'The zoo.'],                            answer: 3, hint: '第四段。',                          explanation: '考点：地点词。第四段 "go to the zoo" 直接告诉。注意 cinema 是第三段下午做的事，evening 是晚上。要区分时间词 morning/afternoon/evening。' },
          { q: "When is Steve's birthday?",               options: ['October.', 'November.', 'May.', 'July.'],                                       answer: 1, hint: '最后一段，"next month"。',           explanation: '考点：月份顺序 + 推理。最后一段 "next month is my birthday in November"。故事里今天是 10 月 1 日，"next month"（下个月）就是 November。要会按顺序记 May, June, July, August, September, October, November。' }
        ]
      }]
    },

    /* ========================================================
     * Unit 6 · Enjoy a Happy Life
     * 重点新语法：现在进行时 be + V-ing
     * ======================================================== */
    {
      id: 'u6',
      name: 'Unit 6 · Happy Life',
      cn: '快乐生活',
      phonics: 'ng — ring, sing, long, king, morning',
      words: [
        { en: 'grandma',  cn: '奶奶',     ipa: '/ˈɡrænmɑː/',  emoji: '👵', sentence: 'My <b>grandma</b> is singing Beijing opera.' },
        { en: 'grandpa',  cn: '爷爷',     ipa: '/ˈɡrænpɑː/',  emoji: '👴', sentence: '<b>Grandpa</b> is watering the plants.' },
        { en: 'dear',     cn: '亲爱的',   ipa: '/dɪr/',       emoji: '💌', sentence: '<b>Dear</b> Mum, I love you.' },
        { en: 'TV',       cn: '电视',     ipa: '/ˌtiː ˈviː/', emoji: '📺', sentence: 'I am watching <b>TV</b>.' },
        { en: 'plant',    cn: '植物；种植', ipa: '/plænt/',   emoji: '🌱', sentence: 'Grandpa is watering the <b>plants</b>.' },
        { en: 'kitchen',  cn: '厨房',     ipa: '/ˈkɪtʃɪn/',   emoji: '🍳', sentence: 'Dad and I are cooking in the <b>kitchen</b>.' },
        { en: 'weekend',  cn: '周末',     ipa: '/ˈwiːkend/',  emoji: '🗓️', sentence: 'On <b>weekends</b>, we play games.' },
        { en: 'people',   cn: '人们',     ipa: '/ˈpiːpl/',    emoji: '👨‍👩‍👧', sentence: 'Many <b>people</b> are flying kites in the park.' },
        { en: 'they',     cn: '他们',     ipa: '/ðeɪ/',       emoji: '👫', sentence: '<b>They</b> are watching TV together.' },
        { en: 'sky',      cn: '天空',     ipa: '/skaɪ/',      emoji: '☁️', sentence: 'The kite is flying high in the <b>sky</b>.' },
        { en: 'fly',      cn: '飞',       ipa: '/flaɪ/',      emoji: '🪁', sentence: 'Yangyang is <b>flying</b> a kite.' },
        { en: 'put',      cn: '放',       ipa: '/pʊt/',       emoji: '🤲', sentence: 'He is <b>putting</b> on Beijing opera makeup.' },
        { en: 'role',     cn: '角色',     ipa: '/roʊl/',      emoji: '🎭', sentence: 'There are four <b>roles</b> in Beijing opera.' },
        { en: 'paint',    cn: '描绘',     ipa: '/peɪnt/',     emoji: '🎨', sentence: 'She is <b>painting</b> a face on the wall.' },
        { en: 'funny',    cn: '滑稽的',   ipa: '/ˈfʌni/',     emoji: '🤡', sentence: 'The Chou role is very <b>funny</b>.' },
        { en: 'brave',    cn: '勇敢的',   ipa: '/breɪv/',     emoji: '🦁', sentence: 'The Jing role looks <b>brave</b>.' },
        { en: 'enjoy',    cn: '享受',     ipa: '/ɪnˈdʒɔɪ/',   emoji: '😊', sentence: 'I really <b>enjoy</b> the weekend.' },
        { en: 'world',    cn: '世界',     ipa: '/wɜːrld/',    emoji: '🌍', sentence: 'It is the most beautiful <b>world</b>.' },
        { en: 'woman',    cn: '女人 (复 women)', ipa: '/ˈwʊmən/', emoji: '👩', sentence: 'The Dan role plays a <b>woman</b>.' },
        { en: 'tea',      cn: '茶',       ipa: '/tiː/',       emoji: '🍵', sentence: 'Grandma is drinking <b>tea</b>.' },
        { en: 'rabbit',   cn: '兔子',     ipa: '/ˈræbɪt/',    emoji: '🐰', sentence: 'A <b>rabbit</b> is hopping in the garden.' }
      ],
      readings: [{
        id: 'u6-r1',
        theme: 'minecraft',
        title: "A Happy Weekend",
        emoji: '🏡',
        paragraphs: [
          "It is Saturday. Steve is at home with his family.",
          "Grandpa is watering the plants in the garden. Grandma is drinking tea and watching TV.",
          "Dad and Steve are cooking in the kitchen. Mum is painting a funny rabbit on the wall.",
          "Outside, many people are flying kites. The kites fly high in the blue sky.",
          "\"I really enjoy our weekends!\" Steve says. \"Our world is so happy.\""
        ],
        paragraphsZh: [
          "今天是周六，Steve 和家人在家。",
          "爷爷在花园里浇花，奶奶在喝茶看电视。",
          "爸爸和 Steve 在厨房做饭。妈妈在墙上画一只滑稽的兔子。",
          "屋外有很多人在放风筝。风筝在蓝色的天空中飞得很高。",
          "\"我真的很喜欢我们的周末！\" Steve 说。\"我们的世界真幸福。\""
        ],
        questions: [
          { q: "What is Grandpa doing?",                 options: ['Drinking tea.', 'Watering the plants.', 'Cooking.', 'Painting.'],                answer: 1, hint: '第二段。',                          explanation: '★Unit 6 重点考点：现在进行时 be + V-ing。"Grandpa is watering the plants"——is + watering 表示"正在浇水"。注意 water 作为动词意思是"浇水"，加 -ing 变 watering。' },
          { q: "Where are Dad and Steve?",               options: ['In the garden.', 'In the kitchen.', 'In the sky.', 'At school.'],                 answer: 1, hint: '第三段。',                          explanation: '考点：方位介词 in。"in the kitchen"（在厨房里）。注意主语是两个人 (Dad and Steve)，所以用 are 不是 is。复数主语 → are doing，单数 → is doing。' },
          { q: "What is Mum painting?",                  options: ['A cat.', 'A flag.', 'A rabbit.', 'A plant.'],                                    answer: 2, hint: '第三段最后一句。',                  explanation: '考点：现在进行时 + 形容词修饰。"Mum is painting a funny rabbit"。形容词 funny 在名词 rabbit 前面（英语形容词放名词前）。' },
          { q: "What are people doing outside?",         options: ['Watching TV.', 'Flying kites.', 'Sleeping.', 'Painting walls.'],                  answer: 1, hint: '第四段。',                          explanation: '考点：are + 动名词 + 复数宾语。"many people are flying kites"。注意 fly 变 -ing 时直接加 ing 变 flying（fly 不去 y）。kites 是复数。' }
        ]
      }]
    },

    /* ========================================================
     * Unit 7 · Welcome to Our Community
     * 重点：方位介词 + 序数词 + There is/are + 问路
     * ======================================================== */
    {
      id: 'u7',
      name: 'Unit 7 · Our Community',
      cn: '我们的社区',
      phonics: 'Word Stress & Intonation 单词重音与语调',
      words: [
        { en: 'glad',         cn: '高兴的',     ipa: '/ɡlæd/',          emoji: '😄', sentence: 'I am <b>glad</b> to meet you.' },
        { en: 'need',         cn: '需要',       ipa: '/niːd/',          emoji: '🆘', sentence: 'I <b>need</b> some help.' },
        { en: 'buy',          cn: '买',         ipa: '/baɪ/',           emoji: '🛍️', sentence: 'I want to <b>buy</b> some bread.' },
        { en: 'tell',         cn: '告诉',       ipa: '/tel/',           emoji: '🗣️', sentence: 'Could you <b>tell</b> me the way to the shop?' },
        { en: 'way',          cn: '路',         ipa: '/weɪ/',           emoji: '🛤️', sentence: 'This is the <b>way</b> to the library.' },
        { en: 'shop',         cn: '商店',       ipa: '/ʃɑːp/',          emoji: '🏪', sentence: 'There is a <b>shop</b> near here.' },
        { en: 'near',         cn: '在…附近',   ipa: '/nɪr/',           emoji: '📍', sentence: 'The library is <b>near</b> our school.' },
        { en: 'front',        cn: '前面',       ipa: '/frʌnt/',         emoji: '⏩', sentence: 'There is a tree in <b>front</b> of the house.' },
        { en: 'in front of',  cn: '在…前面',   ipa: '/ɪn frʌnt əv/',   emoji: '🚸', sentence: 'A robot stands <b>in front of</b> the building.' },
        { en: 'building',     cn: '房子',       ipa: '/ˈbɪldɪŋ/',       emoji: '🏢', sentence: 'Our <b>building</b> has six floors.' },
        { en: 'far',          cn: '较远的',     ipa: '/fɑːr/',          emoji: '🛣️', sentence: 'The zoo is not <b>far</b> from here.' },
        { en: 'robot',        cn: '机器人',     ipa: '/ˈroʊbɑːt/',      emoji: '🤖', sentence: 'A smart <b>robot</b> can show you the way.' },
        { en: 'know',         cn: '知道',       ipa: '/noʊ/',           emoji: '💡', sentence: 'I do not <b>know</b> the way. Could you tell me?' },
        { en: 'third',        cn: '第三',       ipa: '/θɜːrd/',         emoji: '3️⃣', sentence: 'The book is on the <b>third</b> shelf.' },
        { en: 'shelf',        cn: '架子 (复 shelves)', ipa: '/ʃelf/',   emoji: '📚', sentence: 'The book is on the third <b>shelf</b> with letter M.' },
        { en: 'letter',       cn: '字母',       ipa: '/ˈletər/',        emoji: '🔤', sentence: 'Find the book with the <b>letter</b> M.' },
        { en: 'second',       cn: '第二',       ipa: '/ˈsekənd/',       emoji: '2️⃣', sentence: 'Your classroom is on the <b>second</b> floor.' },
        { en: 'beside',       cn: '在…旁边',   ipa: '/bɪˈsaɪd/',       emoji: '🤝', sentence: 'The library is <b>beside</b> our classroom.' },
        { en: 'playground',   cn: '操场',       ipa: '/ˈpleɪɡraʊnd/',   emoji: '⚽', sentence: 'We play games on the <b>playground</b>.' },
        { en: 'centre',       cn: '中心',       ipa: '/ˈsentər/',       emoji: '🎯', sentence: 'There is a community <b>centre</b> near here.' },
        { en: 'smart',        cn: '智能的',     ipa: '/smɑːrt/',        emoji: '🧠', sentence: 'We live in a <b>smart</b> community.' },
        { en: 'community',    cn: '社区',       ipa: '/kəˈmjuːnəti/',   emoji: '🏘️', sentence: 'Welcome to our <b>community</b>!' },
        { en: 'themselves',   cn: '他们自己',   ipa: '/ðəmˈselvz/',     emoji: '🪞', sentence: 'They build the houses <b>themselves</b>.' },
        { en: 'dark',         cn: '黑暗的',     ipa: '/dɑːrk/',         emoji: '🌑', sentence: 'It is <b>dark</b> in the cave.' },
        { en: 'toilet',       cn: '卫生间',     ipa: '/ˈtɔɪlət/',       emoji: '🚻', sentence: 'The <b>toilet</b> is between two shops.' },
        { en: 'between',      cn: '在…之间',   ipa: '/bɪˈtwiːn/',      emoji: '↔️', sentence: 'The library is <b>between</b> the supermarket and the toilet.' },
        { en: 'supermarket',  cn: '超市',       ipa: '/ˈsuːpərmɑːrkɪt/', emoji: '🛒', sentence: 'I buy fruit at the <b>supermarket</b>.' },
        { en: 'quickly',      cn: '快速地',     ipa: '/ˈkwɪkli/',       emoji: '⚡', sentence: 'The robot answers very <b>quickly</b>.' }
      ],
      readings: [{
        id: 'u7-r1',
        theme: 'minecraft',
        title: "A Smart Village Community",
        emoji: '🏘️',
        paragraphs: [
          "Steve is new in the village. He needs to buy some bread, but he does not know the way.",
          "He sees a smart robot in front of the community centre. Steve says, \"Could you tell me the way to a shop?\"",
          "The robot answers quickly: \"Sure! Walk down this street. The supermarket is on your right, between the library and the toilet.\"",
          "Steve says, \"Is the library near here too?\" The robot says, \"Yes, it is beside the supermarket. The new books are on the third shelf with letter M.\"",
          "Steve is glad. \"Thank you! Our smart community is the best!\""
        ],
        paragraphsZh: [
          "Steve 是村子里的新人。他需要买些面包，但不知道路。",
          "他在社区中心前面看到一个智能机器人。Steve 说：\"你能告诉我去商店怎么走吗？\"",
          "机器人很快回答：\"当然！沿着这条街走。超市在你右边，在图书馆和卫生间之间。\"",
          "Steve 问：\"图书馆离这儿近吗？\" 机器人说：\"近，就在超市旁边。新书在第三层书架上，字母 M 那一排。\"",
          "Steve 很高兴。\"谢谢！我们的智能社区真棒！\""
        ],
        questions: [
          { q: "What does Steve want to buy?",            options: ['A book.', 'Some bread.', 'A flag.', 'A kite.'],                                  answer: 1, hint: '第一段。',                          explanation: '考点：want to + 动词原形，need to + 动词原形。第一段 "He needs to buy some bread"。注意 some 后接不可数名词 bread（面包不能数）。' },
          { q: "Where is the smart robot?",               options: ['In the supermarket.', 'In front of the community centre.', 'On the playground.', 'On the third shelf.'], answer: 1, hint: '第二段。',                          explanation: '★Unit 7 重点考点：方位介词 in front of = 在...前面。第二段 "in front of the community centre"。注意区分 in front of (前面) vs in the front of (内部前部)，以及 behind (后面)、beside (旁边)。' },
          { q: "Where is the supermarket?",               options: ['Far away.', 'Between the library and the toilet.', 'In a building.', 'Near the lake.'],            answer: 1, hint: '第三段。',                          explanation: '考点：方位介词 between A and B = 在 A 和 B 之间。第三段 "between the library and the toilet"。between 后面一定是两个东西，用 and 连接。' },
          { q: "Where are the new books?",                options: ['On the second shelf.', 'On the third shelf with letter M.', 'In the toilet.', 'In the cinema.'],   answer: 1, hint: '第四段最后一句。',                  explanation: '考点：序数词 + 名词。"on the third shelf"（在第三层架子上）。要熟练 first / second / third / fourth / fifth + floor / shelf 这种考查方位的搭配。注意 third 不是 threeth。' }
        ]
      }]
    }

  ],

  /* 鼓励语：方块世界主题 */
  encouragements: [
    '太棒了！+10 经验值！',
    '完美命中！下一关也能赢！',
    '稳！你比昨天又厉害了一点！',
    '建造大师！再来一题！',
    '✦ 解锁新单词 ✦',
    '继续！下一只怪物等着你！',
    '钻石级别答题！'
  ],

  /* 错题提示语：温和不打击 */
  retryTips: [
    '差一点就对啦，再读一遍试试看～',
    '没关系，史莱姆也会被打回来的 💪',
    '提示已经亮起来了，再来一次！',
    '深呼吸，慢慢看，你可以的！',
    '错一次没事，多试一次就掌握了。'
  ],

  /* 成就（徽章）定义 */
  badges: [
    { id: 'first_day',   icon: '🎯', name: '初次出生',   condition: 'streak>=1' },
    { id: 'three_day',   icon: '🔥', name: '三日连击',   condition: 'streak>=3' },
    { id: 'week_warrior',icon: '⚔️', name: '一周战士',   condition: 'streak>=7' },
    { id: 'word_50',     icon: '📚', name: '50词图鉴',   condition: 'words>=50' },
    { id: 'word_100',    icon: '🏆', name: '百词大师',   condition: 'words>=100' },
    { id: 'reader_10',   icon: '📖', name: '阅读小将',   condition: 'reads>=10' },
    { id: 'perfect',     icon: '⭐', name: '满分时刻',   condition: 'perfect>=1' },
    { id: 'level_5',     icon: '🌟', name: 'Lv.5 探险家',condition: 'level>=5' }
  ],

  /* 头像可选项 */
  avatars: ['🧒','👦','👧','🧑','🦸','🧙','🤖','🐲','🦊','🐱']
};
