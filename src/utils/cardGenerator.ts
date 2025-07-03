import { BingoCard, BingoCell } from "../types/bingo";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateBingoCards(
  textEntries: string[],
  numberOfCards: number,
  enableFreeSpace: boolean,
  freeSpaceText: string = "FREE",
): BingoCard[] {
  const cards: BingoCard[] = [];
  const gridSize = 5;
  const freeSpaceIndex = enableFreeSpace ? 12 : -1; // Center cell (2,2) in 0-indexed 5x5 grid

  for (let cardIndex = 0; cardIndex < numberOfCards; cardIndex++) {
    // Shuffle entries for each card to ensure uniqueness
    const shuffledEntries = shuffleArray(textEntries);

    // Create 5x5 grid
    const cells: BingoCell[][] = [];
    let entryIndex = 0;

    for (let row = 0; row < gridSize; row++) {
      cells[row] = [];
      for (let col = 0; col < gridSize; col++) {
        const cellIndex = row * gridSize + col;

        if (cellIndex === freeSpaceIndex) {
          // Free space in center
          cells[row][col] = {
            text: freeSpaceText,
            isFreeSpace: true,
          };
        } else {
          // Regular cell with text entry
          cells[row][col] = {
            text: shuffledEntries[entryIndex % shuffledEntries.length],
            isFreeSpace: false,
          };
          entryIndex++;
        }
      }
    }

    cards.push({
      id: `card-${cardIndex + 1}-${Date.now()}`,
      cells,
    });
  }

  return cards;
}

export function validateGenerationInputs(
  textEntries: string[],
  numberOfCards: number,
  enableFreeSpace: boolean,
): string[] {
  const errors: string[] = [];

  const requiredEntries = enableFreeSpace ? 24 : 25;
  if (textEntries.length < requiredEntries) {
    errors.push(
      `Need at least ${requiredEntries} text entries. Found ${textEntries.length}.`,
    );
  }

  if (numberOfCards < 1 || numberOfCards > 99) {
    errors.push("Number of cards must be between 1 and 99");
  }

  return errors;
}
