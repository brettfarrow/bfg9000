import { useState, useCallback } from "react";
import { BingoSettings, GeneratorState } from "../types/bingo";
import { parseTextInput } from "../utils/textParser";
import {
  generateBingoCards,
  validateGenerationInputs,
} from "../utils/cardGenerator";

const defaultSettings: BingoSettings = {
  numberOfCards: 5,
  enableFreeSpace: true,
  freeSpaceText: "FREE",
  textEntries: [],
};

export function useBingoCards() {
  const [textInput, setTextInput] = useState("");
  const [state, setState] = useState<GeneratorState>({
    settings: defaultSettings,
    cards: [],
    isGenerating: false,
    error: null,
  });

  const updateSettings = useCallback((newSettings: BingoSettings) => {
    setState((prev) => ({
      ...prev,
      settings: newSettings,
      error: null,
    }));
  }, []);

  const generateCards = useCallback(() => {
    setState((prev) => ({ ...prev, isGenerating: true, error: null }));

    // Parse text input
    const parseResult = parseTextInput(textInput);
    if (parseResult.errors.length > 0) {
      setState((prev) => ({
        ...prev,
        isGenerating: false,
        error: parseResult.errors.join(" "),
      }));
      return;
    }

    // Validate generation inputs
    const validationErrors = validateGenerationInputs(
      parseResult.entries,
      state.settings.numberOfCards,
      state.settings.enableFreeSpace,
    );

    if (validationErrors.length > 0) {
      setState((prev) => ({
        ...prev,
        isGenerating: false,
        error: validationErrors.join(" "),
      }));
      return;
    }

    // Generate cards
    try {
      const cards = generateBingoCards(
        parseResult.entries,
        state.settings.numberOfCards,
        state.settings.enableFreeSpace,
        state.settings.freeSpaceText,
      );

      setState((prev) => ({
        ...prev,
        cards,
        isGenerating: false,
        settings: {
          ...prev.settings,
          textEntries: parseResult.entries,
        },
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        isGenerating: false,
        error: "Failed to generate cards. Please try again.",
      }));
    }
  }, [textInput, state.settings]);

  const clearAll = useCallback(() => {
    setTextInput("");
    setState({
      settings: defaultSettings,
      cards: [],
      isGenerating: false,
      error: null,
    });
  }, []);

  const printCards = useCallback(() => {
    window.print();
  }, []);

  return {
    textInput,
    setTextInput,
    settings: state.settings,
    cards: state.cards,
    isGenerating: state.isGenerating,
    error: state.error,
    updateSettings,
    generateCards,
    clearAll,
    printCards,
  };
}
