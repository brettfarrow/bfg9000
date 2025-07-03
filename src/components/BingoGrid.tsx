import { BingoCell as BingoCellType } from "../types/bingo";
import BingoCell from "./BingoCell";

interface BingoGridProps {
  cells: BingoCellType[][];
  className?: string;
}

export default function BingoGrid({ cells, className = "" }: BingoGridProps) {
  return (
    <div
      className={`grid grid-cols-5 gap-0 border-2 border-gray-800 ${className}`}
    >
      {cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <BingoCell key={`${rowIndex}-${colIndex}`} cell={cell} />
        )),
      )}
    </div>
  );
}
