import { BingoSettings } from "../types/bingo";
import TextInput from "./TextInput";

interface ControlPanelProps {
  settings: BingoSettings;
  onSettingsChange: (settings: BingoSettings) => void;
  onGenerate: () => void;
  onClear: () => void;
  isGenerating: boolean;
  error: string | null;
  textInput: string;
  onTextInputChange: (text: string) => void;
}

export default function ControlPanel({
  settings,
  onSettingsChange,
  onGenerate,
  onClear,
  isGenerating,
  error,
  textInput,
  onTextInputChange,
}: ControlPanelProps) {
  const updateSettings = (updates: Partial<BingoSettings>) => {
    onSettingsChange({ ...settings, ...updates });
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          🎯 BFG9000 - Bingo Card Generator
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Generate unique bingo cards from your text
        </p>
      </div>

      {/* Text Input */}
      <TextInput value={textInput} onChange={onTextInputChange} />

      {/* Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Number of Cards */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Number of Cards: {settings.numberOfCards}
          </label>
          <input
            type="range"
            min="1"
            max="99"
            value={settings.numberOfCards}
            onChange={(e) =>
              updateSettings({ numberOfCards: parseInt(e.target.value) })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>1</span>
            <span>99</span>
          </div>
        </div>

        {/* Free Space Settings */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="freeSpace"
              checked={settings.enableFreeSpace}
              onChange={(e) =>
                updateSettings({ enableFreeSpace: e.target.checked })
              }
              className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="freeSpace"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Enable Free Space
            </label>
          </div>

          {settings.enableFreeSpace && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Free Space Text
              </label>
              <input
                type="text"
                value={settings.freeSpaceText}
                onChange={(e) =>
                  updateSettings({ freeSpaceText: e.target.value })
                }
                placeholder="FREE"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className={`
            flex-1 px-4 py-2 rounded-md font-medium transition-colors
            ${
              isGenerating
                ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md"
            }
          `}
        >
          {isGenerating ? "Generating..." : "Generate Cards"}
        </button>

        <button
          onClick={onClear}
          disabled={isGenerating}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
