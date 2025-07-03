import { useState } from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function TextInput({
  value,
  onChange,
  placeholder = "Enter bingo items (one per line)...",
  className = "",
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const lineCount = value.split("\n").filter((line) => line.trim()).length;

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Bingo Items
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={12}
          className={`
            w-full px-3 py-2 
            border border-gray-300 dark:border-gray-600 
            rounded-md shadow-sm 
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            dark:bg-gray-800 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            resize-vertical
            ${isFocused ? "ring-2 ring-blue-500 border-blue-500" : ""}
          `}
        />
        {lineCount > 0 && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded">
            {lineCount} items
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Enter one item per line. Need at least 24 items for cards with free
        space, or 25 without.
      </p>
    </div>
  );
}
