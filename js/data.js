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
      }, {
        id: 'u1-r2',
        theme: 'minecraft',
        title: "The Folk Music Festival",
        emoji: '🎵',
        paragraphs: [
          "Today there is a folk music festival in the village. People come from far away.",
          "Alex is a big fan of folk music. She wants to sing today. She is so excited.",
          "Steve asks, \"What kind of music will you sing?\" Alex says, \"An old folk song. My grandma taught me.\"",
          "The song is sweet. Everyone listens. They say Alex sings very well!",
          "Steve is happy for her. Alex is happy too. Folk music brings everyone together."
        ],
        paragraphsZh: [
          "今天村里有个民间音乐节。人们从远方赶来。",
          "Alex 是民间音乐的超级粉丝。她今天想唱歌，非常激动。",
          "Steve 问：\"你要唱哪种音乐？\" Alex 说：\"一首古老的民歌，我奶奶教我的。\"",
          "歌声很甜美，大家都在听。他们都说 Alex 唱得真好！",
          "Steve 替她开心，Alex 也开心。民间音乐让大家聚在一起。"
        ],
        questions: [
          { q: "What is happening in the village today?", options: ['A football game.', 'A folk music festival.', 'A school day.', 'A birthday party.'], answer: 1, hint: '第一段第一句。', explanation: '"Today there is a folk music festival" 直接给答案。考点：there is + 名词 = 有...。' },
          { q: "Why is Alex excited?",                    options: ['She wants to sing.', 'She wants to dance.', 'She wants to eat.', 'She wants to sleep.'], answer: 0, hint: '第二段。', explanation: '"She wants to sing today. She is so excited."。考点：want to + 动词原形 = 想做某事。注意 wants 加 -s（第三人称单数）。' },
          { q: "Who taught Alex the folk song?",          options: ['Steve.', 'Her grandma.', 'Her teacher.', 'A friend.'],                       answer: 1, hint: '第三段。', explanation: '第三段 "My grandma taught me."。考点：teach 的过去式是 taught (不规则变化)。grandma 也是 Unit 6 词。' },
          { q: "How do people feel at the end?",          options: ['Tired.', 'Angry.', 'Happy.', 'Sad.'],                                         answer: 2, hint: '最后一段。', explanation: 'Steve 和 Alex 都 happy，"Folk music brings everyone together" 也是积极情绪。' }
        ]
      }, {
        id: 'u1-r3p',
        theme: 'pokemon',
        title: "Pikachu's Hobby",
        emoji: '⚡',
        paragraphs: [
          "Pikachu has many hobbies. He likes battles, food, and singing.",
          "Today there is a new club. It is the Trainers' Club. Pikachu wants to join.",
          "\"Why do you want to join?\" Eevee asks. Pikachu says, \"Because I am a big fan of Ash. I want to study how to be the best.\"",
          "The club leader is Pikachu's friend. He sings folk songs very well.",
          "Pikachu is happy with his new club. His hobby is now bigger than ever."
        ],
        paragraphsZh: [
          "皮卡丘有很多爱好，他喜欢对战、美食和唱歌。",
          "今天有个新俱乐部，是训练师俱乐部。皮卡丘想加入。",
          "\"你为什么想加入？\" 伊布问。皮卡丘说：\"因为我是小智的超级粉丝，我想研究怎么变最强。\"",
          "俱乐部队长是皮卡丘的朋友，他民歌唱得非常好。",
          "皮卡丘对新俱乐部很满意，他的爱好比以前更大了。"
        ],
        questions: [
          { q: "What are Pikachu's hobbies?",             options: ['Just sleeping.', 'Battles, food, and singing.', 'Reading only.', 'Math.'],     answer: 1, hint: '第一段。', explanation: '"He likes battles, food, and singing"。考点：likes + 动名词或名词 = 喜欢...。' },
          { q: "Why does Pikachu join the club?",         options: ['He is a fan of Ash.', 'He is hungry.', 'He is sleepy.', 'He is alone.'],       answer: 0, hint: '第三段。', explanation: '"Because I am a big fan of Ash"。考点：be a fan of = ...的粉丝；because 引导原因。' },
          { q: "Who sings folk songs well?",              options: ['Pikachu.', 'Eevee.', 'Ash.', 'The club leader.'],                              answer: 3, hint: '第四段。', explanation: '"The club leader is Pikachu\'s friend. He sings folk songs very well"。考点：代词 he 指代上一句的主语 leader。' },
          { q: "How does Pikachu feel?",                  options: ['Sad.', 'Tired.', 'Happy.', 'Angry.'],                                          answer: 2, hint: '最后一段。', explanation: '"Pikachu is happy with his new club"。考点：be happy with = 对...满意。' }
        ]
      }, {
        id: 'u1-r4m',
        theme: 'minecraft',
        title: "Steve's Mining Club",
        emoji: '⛏️',
        paragraphs: [
          "Steve is a big fan of mining. His hobby is digging in caves.",
          "One day his friend says, \"Why don't you start a Mining Club?\"",
          "Steve says, \"Good idea! What kind of mining do we want to study?\"",
          "\"Diamond, gold, and redstone!\" his friend says. \"We can travel to deep caves together.\"",
          "Many friends join the club. Steve is the leader. He explains mining well. The club is fun."
        ],
        paragraphsZh: [
          "Steve 是挖矿的超级粉丝，他的爱好是在洞穴里挖东西。",
          "有一天朋友说：\"你为什么不办个挖矿俱乐部？\"",
          "Steve 说：\"好主意！我们想研究哪种挖矿？\"",
          "\"钻石、金子和红石！\"朋友说，\"我们能一起去深洞探险。\"",
          "很多朋友加入了俱乐部。Steve 是队长，他讲挖矿讲得很清楚，俱乐部很有趣。"
        ],
        questions: [
          { q: "What is Steve's hobby?",                  options: ['Cooking.', 'Mining (digging in caves).', 'Reading books.', 'Travel only.'],   answer: 1, hint: '第一段。', explanation: '"His hobby is digging in caves"。考点：动名词 digging 作表语。is doing 这里不是进行时，而是 is + 动名词描述爱好。' },
          { q: "What does the friend suggest?",           options: ['Start a Mining Club.', 'Stop mining.', 'Buy a diamond.', 'Sleep more.'],       answer: 0, hint: '第二段。', explanation: '"Why don\'t you start a Mining Club?"。考点：Why don\'t you + V 是建议句型。' },
          { q: "What will the club study?",               options: ['Cooking.', 'Football.', 'Diamond, gold, and redstone.', 'Music.'],            answer: 2, hint: '第四段。', explanation: '"Diamond, gold, and redstone!"。考点：列举用 and 连接最后一项。' },
          { q: "How is the club?",                        options: ['Boring.', 'Tired.', 'Fun.', 'Sad.'],                                          answer: 2, hint: '最后一段。', explanation: '"The club is fun"。考点：fun 在这里作形容词表语。' }
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
      }, {
        id: 'u2-r2',
        theme: 'minecraft',
        title: "Don't Throw Things!",
        emoji: '🚫',
        paragraphs: [
          "Steve lives on the third floor. One day he throws an apple out of the window.",
          "The apple falls down. It almost hits a man on the street. The man is angry.",
          "Mum says, \"Steve! Don't throw things out of the window. It is very dangerous.\"",
          "Steve says, \"Sorry, Mum. I will not do it again.\"",
          "Now Steve is more careful. He puts things in the bin, not out of the window."
        ],
        paragraphsZh: [
          "Steve 住在三楼。有一天他从窗户扔了一个苹果出去。",
          "苹果掉了下来，差点砸到街上的一个男人。那个男人很生气。",
          "妈妈说：\"Steve！别从窗户扔东西，太危险了。\"",
          "Steve 说：\"对不起，妈妈，我下次不会了。\"",
          "现在 Steve 更小心了，他把东西放进垃圾桶，不再扔出窗外。"
        ],
        questions: [
          { q: "Where does Steve live?",                  options: ['First floor.', 'Second floor.', 'Third floor.', 'Fourth floor.'],            answer: 2, hint: '第一段第一句。', explanation: '"Steve lives on the third floor"。考点：on the + 序数词 + floor = 在第几层楼。' },
          { q: "What does Steve throw out of the window?", options: ['A book.', 'An apple.', 'A toy.', 'A board.'],                                answer: 1, hint: '第一段第二句。', explanation: '"throws an apple out of the window"。考点：throw...out of = 扔出。out of + 地点。' },
          { q: "Why is Mum angry?",                       options: ['Because it is too cold.', 'Because Steve fell down.', 'Because throwing things is dangerous.', 'Because Steve is late.'], answer: 2, hint: '第三段。', explanation: '"It is very dangerous"。考点：dangerous 是 Unit 2 高频词。It is + adj + to do 是常考句型。' },
          { q: "What does Steve do now?",                 options: ['He is more careful.', 'He throws more things.', 'He goes downstairs.', 'He sleeps.'], answer: 0, hint: '最后一段。', explanation: '"Now Steve is more careful"。考点：more + 形容词 = 比较级，表示"更..."。' }
        ]
      }, {
        id: 'u2-r3m',
        theme: 'minecraft',
        title: "Don't Dig Straight Down!",
        emoji: '⛏️',
        paragraphs: [
          "Steve is mining. He is careful. He does not dig straight down.",
          "\"Why? It's faster!\" his friend says.",
          "Steve says, \"Don't dig down! It is dangerous. You may fall into lava!\"",
          "The cave is dark. Steve puts a light on the wall. Now they can see well.",
          "\"Be careful again next time,\" Steve says. \"Safe mining is good mining.\""
        ],
        paragraphsZh: [
          "Steve 在挖矿，他很小心，不会直直地往下挖。",
          "\"为什么不？这样更快！\"朋友说。",
          "Steve 说：\"别向下挖！太危险了，你可能掉进岩浆！\"",
          "洞穴很黑。Steve 在墙上挂了一盏灯，现在他们能看清楚了。",
          "\"下次也要小心，\"Steve 说，\"安全挖矿才是好挖矿。\""
        ],
        questions: [
          { q: "What is Steve doing?",                    options: ['Cooking.', 'Mining.', 'Sleeping.', 'Watching TV.'],                            answer: 1, hint: '第一段。', explanation: '"Steve is mining"。考点：现在进行时 be + V-ing。' },
          { q: "Why shouldn't they dig straight down?",   options: ['It is too slow.', 'It is dangerous, may fall into lava.', 'It is too cold.', 'It is fun.'], answer: 1, hint: '第三段。', explanation: '"It is dangerous. You may fall into lava!"。考点：It is + adj + to do 句型 + may 表可能。' },
          { q: "What does Steve put on the wall?",        options: ['A board.', 'A flag.', 'A light.', 'A picture.'],                               answer: 2, hint: '第四段。', explanation: '"Steve puts a light on the wall"。考点：put + 物 + on + 地点。' },
          { q: "What is Steve's safety rule?",            options: ['Dig fast.', 'Be careful and safe.', 'Dig in the dark.', 'No mining.'],          answer: 1, hint: '最后一段。', explanation: '"Safe mining is good mining"。考点：careful + safe 是 Unit 2 高频词。' }
        ]
      }, {
        id: 'u2-r4d',
        theme: 'delta',
        title: "The Scout Mission",
        emoji: '🔦',
        paragraphs: [
          "Captain Alex tells her team, \"Today's mission: scout the dark forest. Be careful!\"",
          "The forest is dark and dangerous. The team walks slowly.",
          "They see a crowd of strange shadows. Alex says, \"No pushing. Stay safe.\"",
          "Steve carries a small light. He helps everyone see the way.",
          "After two hours, they go home safely. \"Good job, team! Be careful again next mission.\""
        ],
        paragraphsZh: [
          "Alex 队长对队员说：\"今天任务：侦察暗林。注意安全！\"",
          "森林又黑又危险，队员慢慢走。",
          "他们看到一群奇怪的影子。Alex 说：\"不要推，注意安全。\"",
          "Steve 拿着一盏小灯，帮大家看清前路。",
          "两小时后他们安全回家。\"干得好，队友们！下次任务也要小心。\""
        ],
        questions: [
          { q: "What is the team's mission?",             options: ['Cook dinner.', 'Scout the dark forest.', 'Build a house.', 'Watch TV.'],       answer: 1, hint: '第一段。', explanation: '"scout the dark forest"。考点：scout = 侦察。dark forest 形容词修饰名词。' },
          { q: "How does the team walk?",                 options: ['Fast.', 'Slowly.', 'Backwards.', 'They run.'],                                 answer: 1, hint: '第二段。', explanation: '"The team walks slowly"。考点：副词 slowly 修饰动词 walk。' },
          { q: "Who carries the light?",                  options: ['Alex.', 'Steve.', 'The captain.', 'Nobody.'],                                  answer: 1, hint: '第四段。', explanation: '"Steve carries a small light"。考点：carry + 物 = 携带。' },
          { q: "How does the mission end?",               options: ['They get hurt.', 'They go home safely.', 'They get lost.', 'They fight.'],     answer: 1, hint: '最后一段。', explanation: '"they go home safely"。考点：副词 safely 修饰动词 go。Be careful + again 是 Unit 2 词。' }
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
      }, {
        id: 'u3-r2',
        theme: 'minecraft',
        title: "Kung Fu King",
        emoji: '🥋',
        paragraphs: [
          "Steve learns kung fu in the village. His teacher is very strong.",
          "One day Steve falls down. His leg hurts a lot. It hurts badly.",
          "\"Don't worry,\" his teacher says. \"Even kung fu kings hurt sometimes.\"",
          "Steve listens to his teacher. He is brave. He stands up again.",
          "Next year, Steve visits the Great Wall. He shows his kung fu there. He is a small hero now."
        ],
        paragraphsZh: [
          "Steve 在村里学功夫。他的老师非常强壮。",
          "有一天 Steve 摔了一跤，腿很疼，伤得很严重。",
          "\"别担心，\"老师说，\"功夫之王有时也会受伤。\"",
          "Steve 听老师的话，他很勇敢，又站了起来。",
          "第二年，Steve 去长城游玩，在那里展示功夫。他成了一个小英雄。"
        ],
        questions: [
          { q: "What is Steve learning?",                 options: ['Football.', 'Kung fu.', 'Music.', 'Painting.'],                               answer: 1, hint: '第一段。', explanation: '"Steve learns kung fu"。考点：kung fu 拼写。' },
          { q: "How badly is Steve hurt?",                options: ['Not at all.', 'A little.', 'Badly.', 'Just a tiny bit.'],                     answer: 2, hint: '第二段。', explanation: '"It hurts badly"。考点：副词 badly 修饰动词 hurt 表示程度。' },
          { q: "What does Steve do after he falls?",      options: ['He goes home.', 'He cries.', 'He stands up again.', 'He sleeps.'],            answer: 2, hint: '第四段。', explanation: '"He stands up again"。考点：动词词组 stand up = 站起来。again 表示再一次。' },
          { q: "Where does Steve visit next year?",       options: ['A zoo.', 'The Great Wall.', 'A cinema.', 'A lake.'],                          answer: 1, hint: '最后一段。', explanation: '"Steve visits the Great Wall"。考点：visit + 地点。专有名词 the Great Wall 中 the 不能丢。' }
        ]
      }, {
        id: 'u3-r3p',
        theme: 'pokemon',
        title: "The Pokemon Gym Battle",
        emoji: '⚡',
        paragraphs: [
          "Pikachu and Charmander play a game in the Pokemon Gym. It is so much fun!",
          "Charmander is good at fire moves. But Pikachu is good at Thunderbolt.",
          "Pikachu uses Thunderbolt one hundred times. Charmander's leg hurts a little, but not badly.",
          "\"I am tired,\" Charmander says. Pikachu wins the game!",
          "\"You are my hero, Pikachu!\" Ash shouts. Pikachu is the gym champion today."
        ],
        paragraphsZh: [
          "皮卡丘和小火龙在宝可梦道馆里玩游戏，太有趣了！",
          "小火龙擅长火系招式，但皮卡丘擅长十万伏特。",
          "皮卡丘用了一百次十万伏特，小火龙腿有点疼，但不严重。",
          "\"我累了，\"小火龙说。皮卡丘赢了！",
          "\"皮卡丘，你是我的英雄！\"小智喊。皮卡丘今天是道馆冠军。"
        ],
        questions: [
          { q: "Where do they play?",                     options: ['At home.', 'In the Pokemon Gym.', 'In a cave.', 'On the street.'],             answer: 1, hint: '第一段。', explanation: '"in the Pokemon Gym"。考点：in + 地点。' },
          { q: "What is Pikachu good at?",                options: ['Fire moves.', 'Thunderbolt.', 'Sleeping.', 'Cooking.'],                       answer: 1, hint: '第二段。', explanation: '"Pikachu is good at Thunderbolt"。考点：be good at = 擅长，后接名词或动名词。' },
          { q: "How many times does Pikachu use Thunderbolt?", options: ['Seventy.', 'Eighty.', 'Ninety.', 'One hundred.'],                          answer: 3, hint: '第三段。', explanation: '"one hundred times"。考点：数字 hundred 100。times = 次。' },
          { q: "Who wins the game?",                      options: ['Charmander.', 'Pikachu.', 'Ash.', 'Nobody.'],                                  answer: 1, hint: '第四段。', explanation: '"Pikachu wins the game"。考点：win 一般现在时第三人称单数 wins。' }
        ]
      }, {
        id: 'u3-r4m',
        theme: 'minecraft',
        title: "Steve's Parkour Race",
        emoji: '🏃',
        paragraphs: [
          "Today is Parkour Day. Steve and Alex play a jumping game on the blocks.",
          "Steve is good at jumping. He jumps from block to block very fast.",
          "Alex is also good at it. She jumps over a hundred blocks!",
          "Steve's leg hurts a little, but not badly. He finishes the race tired but happy.",
          "Alex wins the game. \"You are my parkour hero, Alex!\" Steve says."
        ],
        paragraphsZh: [
          "今天是跑酷日，Steve 和 Alex 在方块上玩跳跃游戏。",
          "Steve 擅长跳跃，他从一块跳到另一块跳得很快。",
          "Alex 也很擅长，她跳过了一百多个方块！",
          "Steve 的腿有点疼，但不严重。他累但很开心地完赛。",
          "Alex 赢了。\"Alex，你是我的跑酷英雄！\"Steve 说。"
        ],
        questions: [
          { q: "What kind of game do they play?",         options: ['A football game.', 'A jumping game on blocks.', 'A music game.', 'A reading game.'], answer: 1, hint: '第一段。', explanation: '"a jumping game on the blocks"。考点：动名词 jumping 修饰 game。' },
          { q: "Who is good at jumping?",                 options: ['Only Steve.', 'Only Alex.', 'Both Steve and Alex.', 'Neither.'],               answer: 2, hint: '第二段 + 第三段。', explanation: '"Steve is good at jumping" + "Alex is also good at it"。考点：also = 也。both A and B。' },
          { q: "How many blocks does Alex jump over?",    options: ['Seventy.', 'Eighty.', 'Ninety.', 'Over a hundred.'],                          answer: 3, hint: '第三段。', explanation: '"over a hundred blocks"。考点：over + 数字 = 超过。' },
          { q: "Who wins?",                               options: ['Steve.', 'Alex.', 'Both win.', 'Nobody.'],                                    answer: 1, hint: '最后一段。', explanation: '"Alex wins the game"。考点：win 主语第三人称单数 + s。' }
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
      }, {
        id: 'u5-r2',
        theme: 'minecraft',
        title: "Children's Day Around the World",
        emoji: '🎈',
        paragraphs: [
          "Children's Day is a special holiday. But it is on different days around the world.",
          "In China, Children's Day is on 1st June. Many children go to the zoo.",
          "In Canada, it is on 20th November. The children sing songs at school.",
          "In the USA, children often have a fun day in the summer too.",
          "\"Every country has its own day,\" Mum says. \"But children all enjoy it!\""
        ],
        paragraphsZh: [
          "儿童节是一个特别的节日。但世界各地的日期不同。",
          "在中国，儿童节是 6 月 1 日。很多孩子会去动物园。",
          "在加拿大，儿童节是 11 月 20 日。孩子们在学校唱歌。",
          "在美国，孩子们也常常在夏天有一个欢乐的日子。",
          "\"每个国家都有自己的节日，\"妈妈说，\"但孩子们都喜欢！\""
        ],
        questions: [
          { q: "When is Children's Day in China?",        options: ['1st May.', '1st June.', '1st October.', '20th November.'],                    answer: 1, hint: '第二段。', explanation: '"Children\'s Day is on 1st June"。考点：on + 序数词 + 月份。1st 读作 the first。' },
          { q: "When is Children's Day in Canada?",       options: ['20th November.', '1st June.', '4th July.', '25th December.'],                 answer: 0, hint: '第三段。', explanation: '"In Canada, it is on 20th November"。考点：注意区分中国 vs 加拿大儿童节日期，常考连线题。' },
          { q: "What do Chinese children often do?",      options: ['Sing at school.', 'Go to the zoo.', 'Have a fun day.', 'Watch a film.'],       answer: 1, hint: '第二段。', explanation: '"Many children go to the zoo"。考点：go to + 地点，zoo 是 Unit 5 词。' },
          { q: "How is Children's Day in different countries?", options: ['The same day.', 'On different days.', 'Not celebrated.', 'Only in summer.'], answer: 1, hint: '第一段或最后一段。', explanation: '"on different days around the world"。考点：different + 复数 days = 不同的（多个）日子。' }
        ]
      }, {
        id: 'u5-r3p',
        theme: 'pokemon',
        title: "Pokemon Center Festival",
        emoji: '⚡',
        paragraphs: [
          "The Pokemon Center has a special holiday on 1st June. It is Trainer Day.",
          "Trainers get up early. They put up colorful flags. Pikachu watches and smiles.",
          "Children from many countries come — from the USA, Canada, and more.",
          "They often play games and battles. The Pokemon Center is full of fun.",
          "\"Trainer Day is the best holiday!\" Ash says. He hugs Pikachu."
        ],
        paragraphsZh: [
          "宝可梦中心 6 月 1 日有个特别节日，是训练师节。",
          "训练师们一早起来，挂上五彩的旗帜。皮卡丘看着笑了。",
          "来自很多国家的孩子来这里——美国、加拿大等等。",
          "他们经常玩游戏、对战。宝可梦中心充满欢乐。",
          "\"训练师节是最棒的节日！\"小智说。他抱了抱皮卡丘。"
        ],
        questions: [
          { q: "When is Trainer Day?",                    options: ['1st May.', '1st June.', '1st October.', '20th November.'],                    answer: 1, hint: '第一段。', explanation: '"a special holiday on 1st June"。考点：on + 序数词 + 月份。' },
          { q: "What do trainers do early?",              options: ['Sleep.', 'Put up flags.', 'Play games.', 'Eat food.'],                         answer: 1, hint: '第二段。', explanation: '"They put up colorful flags"。考点：put up = 升起/挂起，是 Unit 5 高频词组。' },
          { q: "Where do the children come from?",        options: ['Only China.', 'Many countries (USA, Canada).', 'Mars.', 'A small village.'], answer: 1, hint: '第三段。', explanation: '"from the USA, Canada, and more"。考点：from + 国家。注意 the USA 前面要加 the。' },
          { q: "How does Ash feel?",                      options: ['Sad.', 'Tired.', 'Happy.', 'Angry.'],                                          answer: 2, hint: '最后一段。', explanation: '"He hugs Pikachu" + "is the best holiday" 都是积极。考点：hug = 拥抱。' }
        ]
      }, {
        id: 'u5-r4m',
        theme: 'minecraft',
        title: "Anniversary in the Village",
        emoji: '🏘️',
        paragraphs: [
          "The village has a special anniversary in October. It is Village Day.",
          "Steve gets up early. He puts up a flag in front of his house.",
          "Alex watches the parade. There are mobs from the zoo too — a tame wolf, a fox, and a panda.",
          "People often build new houses on this day. Steve builds a tower.",
          "\"Village Day is special!\" Alex says. \"Next month is also Children's Day in November.\""
        ],
        paragraphsZh: [
          "村庄在 10 月有一个特别的纪念日，叫村庄日。",
          "Steve 一早起来，在家门前升起一面旗。",
          "Alex 看着游行队伍，里面还有动物园来的友好生物——一只驯服的狼、一只狐狸、一只熊猫。",
          "这一天人们常常建新房子。Steve 建了一座塔。",
          "\"村庄日很特别！\"Alex 说，\"下个月 11 月也是儿童节。\""
        ],
        questions: [
          { q: "When is Village Day?",                    options: ['May.', 'June.', 'October.', 'November.'],                                      answer: 2, hint: '第一段。', explanation: '"a special anniversary in October"。考点：in + 月份 = 在某月。' },
          { q: "What does Steve put up?",                 options: ['A photo.', 'A flag.', 'A board.', 'A light.'],                                 answer: 1, hint: '第二段。', explanation: '"He puts up a flag"。考点：put up + 物 = 升起。' },
          { q: "What does Steve build?",                  options: ['A house.', 'A tower.', 'A bridge.', 'A boat.'],                                answer: 1, hint: '第四段。', explanation: '"Steve builds a tower"。考点：第三人称单数 builds。' },
          { q: "When is Children's Day in the story?",    options: ['October.', 'November.', 'May.', 'July.'],                                      answer: 1, hint: '最后一段。', explanation: '"Next month is also Children\'s Day in November"。考点：next month + 推理（10 月的下个月就是 11 月）。' }
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
      }, {
        id: 'u6-r2',
        theme: 'minecraft',
        title: "Beijing Opera at Home",
        emoji: '🎭',
        paragraphs: [
          "It is Sunday. Mum is painting a Beijing opera face on Steve's face.",
          "\"What role am I?\" Steve asks. Mum says, \"You are the Jing role. He is brave!\"",
          "Dad is putting on Dan makeup. The Dan role plays a woman. Dad looks funny!",
          "Grandma watches them and laughs. \"I really enjoy Beijing opera.\"",
          "The four roles in Beijing opera are Sheng, Dan, Jing, and Chou. They are very special."
        ],
        paragraphsZh: [
          "今天是周日。妈妈在 Steve 脸上画京剧脸谱。",
          "\"我是什么角色？\"Steve 问。妈妈说：\"你是净角，他很勇敢！\"",
          "爸爸正在化旦角的妆。旦角扮演女性。爸爸看起来很滑稽！",
          "奶奶看着他们笑：\"我真的很喜欢京剧。\"",
          "京剧有四大行当：生、旦、净、丑。它们非常特别。"
        ],
        questions: [
          { q: "What is Mum doing?",                      options: ['Cooking.', 'Painting Steve\'s face.', 'Watching TV.', 'Singing.'],            answer: 1, hint: '第一段。', explanation: '"Mum is painting a Beijing opera face on Steve\'s face"。考点：现在进行时 is + V-ing。paint = 描绘。' },
          { q: "Which role does Steve play?",             options: ['Sheng.', 'Dan.', 'Jing.', 'Chou.'],                                            answer: 2, hint: '第二段。', explanation: '"You are the Jing role"。考点：京剧四大行当文化常识 + Jing 角色 brave 描述。' },
          { q: "Who plays a woman?",                      options: ['Sheng.', 'Dan.', 'Jing.', 'Chou.'],                                            answer: 1, hint: '第三段。', explanation: '"The Dan role plays a woman"。考点：Dan 角色扮演女性。这是 Unit 6 文化常识考点。' },
          { q: "How many roles are in Beijing opera?",    options: ['Two.', 'Three.', 'Four.', 'Five.'],                                            answer: 2, hint: '最后一段。', explanation: '"The four roles in Beijing opera are Sheng, Dan, Jing, and Chou"。考点：京剧四大行当数字。' }
        ]
      }, {
        id: 'u6-r3p',
        theme: 'pokemon',
        title: "The Pokemon Family",
        emoji: '⚡',
        paragraphs: [
          "It is Saturday at the Pokemon Center. Pikachu is at home with friends.",
          "Bulbasaur is watering the plants. Squirtle is drinking water and watching TV.",
          "Ash and Brock are cooking in the kitchen. Misty is painting a brave Charizard on the wall.",
          "Outside, many Pokemon are flying high in the sky — Pidgey, Butterfree, and more.",
          "\"I really enjoy our Saturdays!\" Ash says. \"Our Pokemon world is so happy.\""
        ],
        paragraphsZh: [
          "今天是周六。皮卡丘和朋友们在宝可梦中心。",
          "妙蛙种子在浇花，杰尼龟在喝水看电视。",
          "小智和小刚在厨房做饭，小霞在墙上画一只勇敢的喷火龙。",
          "屋外许多宝可梦在天空高飞——波波、巴大蝶等等。",
          "\"我真喜欢我们的周六！\"小智说，\"我们的宝可梦世界真幸福。\""
        ],
        questions: [
          { q: "What is Bulbasaur doing?",                options: ['Cooking.', 'Watering the plants.', 'Watching TV.', 'Painting.'],               answer: 1, hint: '第二段。', explanation: '"Bulbasaur is watering the plants"。★Unit 6 重点：现在进行时 is + V-ing。' },
          { q: "Where are Ash and Brock?",                options: ['In the garden.', 'In the kitchen.', 'In the sky.', 'At the gym.'],             answer: 1, hint: '第三段。', explanation: '"in the kitchen"。考点：复数主语 (Ash and Brock) → are cooking。' },
          { q: "What is Misty painting?",                 options: ['A cat.', 'A flag.', 'A brave Charizard.', 'A plant.'],                         answer: 2, hint: '第三段最后一句。', explanation: '"painting a brave Charizard"。考点：现在进行时 + 形容词修饰名词。' },
          { q: "What are the Pokemon outside doing?",     options: ['Sleeping.', 'Flying high in the sky.', 'Cooking.', 'Reading.'],                answer: 1, hint: '第四段。', explanation: '"many Pokemon are flying high in the sky"。考点：are + V-ing 复数主语。fly 加 ing 不去 y。' }
        ]
      }, {
        id: 'u6-r4m',
        theme: 'minecraft',
        title: "A Day in the Minecraft Farm",
        emoji: '🌾',
        paragraphs: [
          "It is the weekend. Steve is at his Minecraft farm.",
          "His grandpa is watering the plants. His grandma is drinking tea in the sun.",
          "Steve and his sister are cooking pumpkin pie in the kitchen.",
          "Outside, many people are flying with Elytras. The wings glide in the blue sky.",
          "\"Our farm is so peaceful,\" Steve says. \"Mum is painting a brave Iron Golem on the wall.\""
        ],
        paragraphsZh: [
          "今天是周末，Steve 在他的我的世界农场。",
          "爷爷在浇花，奶奶在阳光下喝茶。",
          "Steve 和姐姐在厨房做南瓜派。",
          "屋外许多人在用鞘翅飞行，翅膀在蓝天上滑翔。",
          "\"我们的农场很安静，\"Steve 说，\"妈妈在墙上画一只勇敢的铁傀儡。\""
        ],
        questions: [
          { q: "What is grandpa doing?",                  options: ['Drinking tea.', 'Watering the plants.', 'Cooking.', 'Sleeping.'],              answer: 1, hint: '第二段。', explanation: '"His grandpa is watering the plants"。★Unit 6 重点：现在进行时 is + V-ing 单数主语。' },
          { q: "What are Steve and his sister cooking?",  options: ['A cake.', 'Pumpkin pie.', 'Bread.', 'Beef.'],                                  answer: 1, hint: '第三段。', explanation: '"cooking pumpkin pie"。考点：复数主语 → are cooking + 名词搭配。' },
          { q: "How do people fly?",                      options: ['On a kite.', 'With Elytras.', 'On a horse.', 'In a plane.'],                   answer: 1, hint: '第四段。', explanation: '"flying with Elytras"。考点：fly with + 工具。Elytras 是 Minecraft 鞘翅。' },
          { q: "What is Mum painting?",                   options: ['A cat.', 'A flag.', 'A brave Iron Golem.', 'A horse.'],                        answer: 2, hint: '最后一段。', explanation: '"painting a brave Iron Golem"。考点：brave 修饰名词。' }
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
      }, {
        id: 'u7-r2',
        theme: 'minecraft',
        title: "Looking for the Library",
        emoji: '📚',
        paragraphs: [
          "Alex needs a book. She wants to go to the library, but she does not know the way.",
          "A girl says, \"The library is near here. Walk down this street.\"",
          "\"Is it far?\" Alex asks. \"No, it is between the supermarket and the toilet.\"",
          "Alex finds the library. She looks for the book on the third shelf.",
          "The book is there, with the letter A. Alex is very glad."
        ],
        paragraphsZh: [
          "Alex 需要一本书。她想去图书馆，但不知道路。",
          "一个女孩说：\"图书馆就在附近。沿着这条街走。\"",
          "\"远吗？\"Alex 问。\"不远，它在超市和卫生间之间。\"",
          "Alex 找到了图书馆，在第三层书架上找那本书。",
          "书在那儿，标着字母 A。Alex 非常高兴。"
        ],
        questions: [
          { q: "What does Alex want to do?",              options: ['Buy bread.', 'Go to the library.', 'Watch a film.', 'Sleep.'],                answer: 1, hint: '第一段。', explanation: '"She wants to go to the library"。考点：want to + 动词原形。' },
          { q: "Where is the library?",                   options: ['Far away.', 'Near here.', 'In a building.', 'On a lake.'],                    answer: 1, hint: '第二段。', explanation: '"near here"。考点：方位副词 near = 在...附近。' },
          { q: "What is the library between?",            options: ['Two parks.', 'The supermarket and the toilet.', 'Two schools.', 'A robot and a tree.'], answer: 1, hint: '第三段。', explanation: '"between the supermarket and the toilet"。考点：between A and B = 在 A 和 B 之间。between 后必接两件事物。' },
          { q: "Where is the book?",                      options: ['On the second shelf.', 'On the third shelf.', 'In the toilet.', 'In the dark.'], answer: 1, hint: '第四段。', explanation: '"on the third shelf"。考点：序数词 third + 名词 shelf。' }
        ]
      }, {
        id: 'u7-r3p',
        theme: 'pokemon',
        title: "Pokemon Center Community",
        emoji: '⚡',
        paragraphs: [
          "Welcome to the Pokemon Center Community! Ash is new here.",
          "He needs Pokeballs. The Poke Mart is in front of the Pokemon Center.",
          "\"Could you tell me the way?\" Ash asks. Joy says, \"Walk down. The shop is between the gym and the lake.\"",
          "The Poke Mart is smart. Pokeballs are on the third shelf with letter P.",
          "Ash is glad. \"What a nice community! Pikachu and I love it here.\""
        ],
        paragraphsZh: [
          "欢迎来到宝可梦中心社区！小智是新来的。",
          "他需要精灵球。精灵商店就在宝可梦中心前面。",
          "\"能告诉我怎么走吗？\"小智问。乔伊小姐说：\"沿这条路走，商店在道馆和湖之间。\"",
          "精灵商店很智能，精灵球在第三层货架，字母 P。",
          "小智很高兴。\"多好的社区！皮卡丘和我都喜欢这儿。\""
        ],
        questions: [
          { q: "What does Ash need to buy?",              options: ['Bread.', 'Pokeballs.', 'A book.', 'A flag.'],                                  answer: 1, hint: '第二段。', explanation: '"He needs Pokeballs"。考点：need + 复数名词。' },
          { q: "Where is the Poke Mart?",                 options: ['In front of the Pokemon Center.', 'Far away.', 'In a cave.', 'On a tree.'],   answer: 0, hint: '第二段。', explanation: '"in front of the Pokemon Center"。★Unit 7 重点：in front of = 在...前面。' },
          { q: "Where is the shop located?",              options: ['Far away.', 'Between the gym and the lake.', 'On the moon.', 'Inside Ash\'s bag.'], answer: 1, hint: '第三段。', explanation: '"between the gym and the lake"。★Unit 7 重点：between A and B = 在 A 和 B 之间。' },
          { q: "Where are the Pokeballs?",                options: ['On the second shelf.', 'On the third shelf with letter P.', 'In the lake.', 'On the moon.'], answer: 1, hint: '第四段。', explanation: '"on the third shelf with letter P"。考点：序数词 third + 名词 shelf。' }
        ]
      }, {
        id: 'u7-r4m',
        theme: 'minecraft',
        title: "Minecraft Village Centre",
        emoji: '🏘️',
        paragraphs: [
          "The Minecraft village has a smart community centre. There is a robot in front of it.",
          "Steve is new and needs to buy bread. \"Could you tell me the way to a shop?\" he asks.",
          "The robot says, \"The supermarket is between the library and the toilet. It is near here.\"",
          "Steve goes to the library too. The new books are on the third shelf, beside an iron golem.",
          "\"I am glad I live here,\" Steve says. \"Our smart village is the best!\""
        ],
        paragraphsZh: [
          "我的世界村有一个智能社区中心。中心前面有一个机器人。",
          "Steve 是新来的，需要买面包。\"能告诉我去商店的路吗？\"他问。",
          "机器人说：\"超市在图书馆和卫生间之间，就在附近。\"",
          "Steve 也去了图书馆。新书在第三层书架，旁边有一个铁傀儡。",
          "\"我很高兴住在这儿，\"Steve 说，\"我们的智能村子最棒！\""
        ],
        questions: [
          { q: "Where is the robot?",                     options: ['In a cave.', 'In front of the community centre.', 'On a tree.', 'In the school.'], answer: 1, hint: '第一段。', explanation: '"There is a robot in front of it"。★Unit 7 重点：in front of。it 指 community centre。' },
          { q: "What does Steve want to buy?",            options: ['A book.', 'Bread.', 'A flag.', 'A horse.'],                                    answer: 1, hint: '第二段。', explanation: '"needs to buy bread"。考点：need to + 动词原形。bread 是不可数名词。' },
          { q: "Where is the supermarket?",               options: ['Far away.', 'Between the library and the toilet.', 'In a cave.', 'On the third shelf.'], answer: 1, hint: '第三段。', explanation: '"between the library and the toilet"。★Unit 7 重点：between A and B。' },
          { q: "What is beside the new books?",           options: ['A robot.', 'An iron golem.', 'A horse.', 'A cat.'],                            answer: 1, hint: '第四段。', explanation: '"beside an iron golem"。考点：beside = 在...旁边。Iron Golem 是 Minecraft 守护生物。' }
        ]
      }]
    }

  ],

  /* 彩蛋词字典 — 课文里出现这些词时变成可点击的金色字, 点击除发音外还弹出小百科 */
  easterEggDict: {
    // 宝可梦
    'pikachu':    '⚡ Pikachu (皮卡丘) — Ash 的最强搭档, 大招是十万伏特！',
    'charmander': '🔥 Charmander (小火龙) — 火属性, 进化后变成喷火龙。',
    'charizard':  '🐉 Charizard (喷火龙) — 小火龙的最终进化, 能在天空飞。',
    'squirtle':   '💧 Squirtle (杰尼龟) — 水属性, 缩进壳里防御。',
    'eevee':      '🦊 Eevee (伊布) — 可以进化成 8 种形态！',
    'bulbasaur':  '🌱 Bulbasaur (妙蛙种子) — 草+毒属性, 背上有植物种子。',
    'misty':      '🌊 Misty (小霞) — 华蓝道馆水系训练师。',
    'brock':      '🪨 Brock (小刚) — 深灰道馆岩石系训练师。',
    'ash':        '👦 Ash (小智) — 立志成为宝可梦大师！',
    'pokeball':   '⚪ Pokeball (精灵球) — 用来捕获宝可梦的红白球。',
    'pokemon':    '⚡ Pokemon (宝可梦) — 神奇的口袋怪兽世界！',
    'thunderbolt': '⚡ Thunderbolt (十万伏特) — 皮卡丘的招牌技能！',
    'pidgey':     '🕊 Pidgey (波波) — 普通+飞行属性的小鸟。',
    'butterfree': '🦋 Butterfree (巴大蝶) — 虫+飞行属性的蝴蝶。',
    // 我的世界
    'creeper':    '💚 Creeper (苦力怕) — 嘶嘶嘶...靠近你就爆炸！',
    'zombie':     '🧟 Zombie (僵尸) — 阳光下会燃烧, 别在白天接近！',
    'skeleton':   '💀 Skeleton (骷髅) — 用弓箭射你, 阳光下也会燃烧。',
    'enderman':   '🌑 Enderman (末影人) — 不要直视它的眼睛！',
    'blaze':      '🔥 Blaze (烈焰人) — 在地狱出没, 会喷火球。',
    'slime':      '🟢 Slime (史莱姆) — 跳跃移动的绿色史莱姆。',
    'redstone':   '⚙️ Redstone (红石) — 我的世界的"电"！',
    'golem':      '🤖 Iron Golem (铁傀儡) — 村民的守护者。',
    'wolf':       '🐺 Wolf (狼) — 喂骨头可以驯服成你的伙伴。',
    'elytra':     '🪽 Elytra (鞘翅) — 让你像鸟一样滑翔！',
    'minecraft':  '⛏ Minecraft (我的世界) — 一切皆可建造的方块世界！',
    'parkour':    '🏃 Parkour (跑酷) — 在方块上跳来跳去的极限运动。',
    'lava':       '🌋 Lava (岩浆) — 别掉进去！会瞬间烧死。',
    'diamond':    '💎 Diamond (钻石) — 最坚硬的工具材料。',
    // 文化
    'naadam':     '🐎 Naadam (那达慕) — 蒙古族传统节日, 赛马 + 摔跤。',
    'beijing':    '🏛 Beijing (北京) — 中国首都！'
  },

  /* 战利品定义 (每完成一关掉落) */
  loot: {
    warmup:  { icon: '📜', name: '卷轴',   color: '#fbbf24' },
    words:   { icon: '💎', name: '钻石',   color: '#60a5fa' },
    reading: { icon: '📕', name: '古书',   color: '#c084fc' },
    fun:     { icon: '⚔️', name: '剑',     color: '#94a3b8' },
    perfect: { icon: '💚', name: '绿宝石', color: '#34d399' }, // 满分加掉
    chest:   { icon: '🎁', name: '宝箱',   color: '#f59e0b' }  // 4 关全完成加掉
  },

  /* 主题徽章 */
  themeBadge: {
    pokemon:   { icon: '⚡', label: '宝可梦特别篇',    color: '#fbbf24' },
    minecraft: { icon: '⛏',  label: '方块世界',        color: '#6ab04a' },
    delta:     { icon: '🔦', label: '侦察任务',        color: '#22d3ee' }
  },

  /* 主页人物问候（随机抽，连击 3+ 触发庆祝口吻） */
  greetings: {
    normal: [
      { who: '⚡ 皮卡丘', say: 'Pika pika! 训练师，今天的任务等你出击！' },
      { who: '🧒 Steve',  say: '我新挖到了 4 个钻石！要不要一起去图书馆看看？' },
      { who: '🦊 Alex',   say: '今日侦察任务已就位，准备好了吗？' },
      { who: '🐉 训练员', say: '英语对战吧！今天我们打哪只词兽？' },
      { who: '⛏ 苦力怕', say: '嘶嘶嘶...来背单词，别让我贴上来。' },
      { who: '🪙 商人',   say: '完成今天的关卡，能换 4 颗绿宝石！' }
    ],
    streak3: [
      { who: '⚡ 皮卡丘', say: '皮卡卡！连击 3 天，我送你一个十万伏特鼓掌！' },
      { who: '🧒 Steve',  say: '三连击！你比红石电路还稳定。' },
      { who: '🦊 Alex',   say: '三日侦察成功，你已晋升副队长！' }
    ],
    streak7: [
      { who: '⚡ 皮卡丘', say: 'PIKA！一周冠军训练师就是你！' },
      { who: '🧒 Steve',  say: '连续 7 天，我用钻石给你做了个奖杯！' },
      { who: '🦊 Alex',   say: '一周战士勋章已发放！' },
      { who: '👑 训练馆长', say: '七连胜！你已经超越了大多数训练师。' }
    ]
  },

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
