import { BingoCard as BingoCardType } from "../types/bingo";
import BingoGrid from "./BingoGrid";

interface BingoCardProps {
  card: BingoCardType;
  cardNumber: number;
  className?: string;
}

export default function BingoCard({
  card,
  cardNumber,
  className = "",
}: BingoCardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg print:shadow-none print:bg-white print:p-4 ${className}`}
    >
      <div className="text-center mb-6 print:mb-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white print:text-black print:text-2xl">
          BFG9000
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 print:text-black">
          Card #{cardNumber}
        </p>
      </div>

      <BingoGrid
        cells={card.cells}
        className="mx-auto max-w-lg print:max-w-full"
      />
    </div>
  );
}
