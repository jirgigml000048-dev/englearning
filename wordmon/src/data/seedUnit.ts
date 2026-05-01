import type { Wordmon } from '../types/wordmon';

const stub = (emoji: string): Wordmon['stages'][1] => ({
  imgUrl: emoji,
  audioUrl: '',
  displayName: '???',
});

const stage = (emoji: string, displayName: string): Wordmon['stages'][1] => ({
  imgUrl: emoji,
  audioUrl: '',
  displayName,
});

export const seedUnit: Wordmon[] = [
  {
    id: 'wm_i',
    word: 'I',
    zh: '我',
    category: 'emotion',
    partOfSpeech: 'pronoun',
    stages: {
      1: stub('🥚'),
      2: stage('👶', 'i'),
      3: stage('🧒', 'I / 我'),
    },
    exampleSentences: ['I eat apples.', 'I can swim.'],
  },
  {
    id: 'wm_cat',
    word: 'cat',
    zh: '猫',
    category: 'animal',
    partOfSpeech: 'noun',
    stages: {
      1: stub('🥚'),
      2: stage('🐾', 'cat'),
      3: stage('🐱', 'Cat / 猫'),
    },
    exampleSentences: ['There is a cat.', 'The cat eats fish.'],
  },
  {
    id: 'wm_dog',
    word: 'dog',
    zh: '狗',
    category: 'animal',
    partOfSpeech: 'noun',
    stages: {
      1: stub('🥚'),
      2: stage('🐶', 'dog'),
      3: stage('🐕', 'Dog / 狗'),
    },
    exampleSentences: ['There are dogs.', 'I can run with a dog.'],
  },
  {
    id: 'wm_apple',
    word: 'apple',
    zh: '苹果',
    category: 'food',
    partOfSpeech: 'noun',
    stages: {
      1: stub('🥚'),
      2: stage('🍏', 'apple'),
      3: stage('🍎', 'Apple / 苹果'),
    },
    exampleSentences: ['I eat apples.', 'There is an apple.'],
  },
  {
    id: 'wm_bread',
    word: 'bread',
    zh: '面包',
    category: 'food',
    partOfSpeech: 'noun',
    stages: {
      1: stub('🥚'),
      2: stage('🌾', 'bread'),
      3: stage('🍞', 'Bread / 面包'),
    },
    exampleSentences: ['I eat bread.', 'There is bread.'],
  },
  {
    id: 'wm_eat',
    word: 'eat',
    zh: '吃',
    category: 'action',
    partOfSpeech: 'verb',
    stages: {
      1: stub('🥚'),
      2: stage('🍴', 'eat'),
      3: stage('😋', 'Eat / 吃'),
    },
    exampleSentences: ['I eat apples.', 'The cat eats fish.'],
  },
  {
    id: 'wm_run',
    word: 'run',
    zh: '跑',
    category: 'action',
    partOfSpeech: 'verb',
    stages: {
      1: stub('🥚'),
      2: stage('👟', 'run'),
      3: stage('🏃', 'Run / 跑'),
    },
    exampleSentences: ['I can run.', 'The dog can run.'],
  },
  {
    id: 'wm_swim',
    word: 'swim',
    zh: '游泳',
    category: 'action',
    partOfSpeech: 'verb',
    stages: {
      1: stub('🥚'),
      2: stage('💧', 'swim'),
      3: stage('🏊', 'Swim / 游泳'),
    },
    exampleSentences: ['I can swim.', 'The cat can swim.'],
  },
  {
    id: 'wm_can',
    word: 'can',
    zh: '能',
    category: 'action',
    partOfSpeech: 'aux',
    stages: {
      1: stub('🥚'),
      2: stage('✨', 'can'),
      3: stage('💪', 'Can / 能'),
    },
    exampleSentences: ['I can swim.', 'I can run.'],
  },
  {
    id: 'wm_there',
    word: 'there',
    zh: '那里',
    category: 'place',
    partOfSpeech: 'pronoun',
    stages: {
      1: stub('🥚'),
      2: stage('📍', 'there'),
      3: stage('🗺️', 'There / 那里'),
    },
    exampleSentences: ['There is a cat.', 'There are dogs.'],
  },
];
