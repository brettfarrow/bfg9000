export interface ParseResult {
  entries: string[];
  errors: string[];
}

export function parseTextInput(input: string): ParseResult {
  const errors: string[] = [];

  if (!input.trim()) {
    errors.push("Please enter some text for the bingo cards");
    return { entries: [], errors };
  }

  // Split by newlines and clean up each entry
  const entries = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // Remove duplicates
  const uniqueEntries = [...new Set(entries)];

  // Validation
  if (uniqueEntries.length < 24) {
    errors.push(
      `Need at least 24 unique entries. Found ${uniqueEntries.length}.`,
    );
  }

  if (uniqueEntries.some((entry) => entry.length > 50)) {
    errors.push("Some entries are too long (max 50 characters)");
  }

  return {
    entries: uniqueEntries,
    errors,
  };
}

export function validateTextForCards(
  entries: string[],
  enableFreeSpace: boolean,
): string[] {
  const errors: string[] = [];
  const requiredEntries = enableFreeSpace ? 24 : 25;

  if (entries.length < requiredEntries) {
    errors.push(
      `Need at least ${requiredEntries} entries for bingo cards. Found ${entries.length}.`,
    );
  }

  return errors;
}
