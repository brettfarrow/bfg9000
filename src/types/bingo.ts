export interface BingoCell {
  text: string;
  isFreeSpace: boolean;
}

export interface BingoCard {
  id: string;
  cells: BingoCell[][];
}

export interface BingoSettings {
  numberOfCards: number;
  enableFreeSpace: boolean;
  freeSpaceText: string;
  textEntries: string[];
}

export interface GeneratorState {
  settings: BingoSettings;
  cards: BingoCard[];
  isGenerating: boolean;
  error: string | null;
}
