import { BingoCell as BingoCellType } from "../types/bingo";

interface BingoCellProps {
  cell: BingoCellType;
  className?: string;
}

export default function BingoCell({ cell, className = "" }: BingoCellProps) {
  return (
    <div
      className={`
        border border-gray-800 
        flex items-center justify-center 
        p-3 text-center 
        min-h-[100px] h-[100px]
        text-xs font-medium
        break-words overflow-hidden
        ${
          cell.isFreeSpace
            ? "bg-gray-200 dark:bg-gray-700 font-bold"
            : "bg-white dark:bg-gray-800"
        }
        ${className}
      `}
    >
      <span className="leading-tight px-1 py-1 w-full h-full flex items-center justify-center text-center overflow-hidden">
        {cell.text}
      </span>
    </div>
  );
}
