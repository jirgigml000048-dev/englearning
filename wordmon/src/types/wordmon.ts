export type Category =
  | 'animal'
  | 'food'
  | 'action'
  | 'object'
  | 'place'
  | 'emotion'
  | 'time';

export interface StageAsset {
  imgUrl: string;
  audioUrl: string;
  displayName: string;
}

export interface Wordmon {
  id: string;
  word: string;
  zh: string;
  category: Category;
  partOfSpeech: 'noun' | 'verb' | 'adj' | 'pronoun' | 'prep' | 'aux';
  stages: {
    1: StageAsset;
    2: StageAsset;
    3: StageAsset;
  };
  exampleSentences: string[];
}
