import { BingoCard as BingoCardType } from "../types/bingo";
import BingoCard from "./BingoCard";

interface PreviewAreaProps {
  cards: BingoCardType[];
  onPrint: () => void;
}

export default function PreviewArea({ cards, onPrint }: PreviewAreaProps) {
  if (cards.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No cards generated yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your bingo items and click &quot;Generate Cards&quot; to
            create your printable bingo cards.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Print Button */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm print:hidden">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Generated Cards ({cards.length})
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ready to print or save as PDF
          </p>
        </div>
        <button
          onClick={onPrint}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors shadow-sm hover:shadow-md"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print Cards
        </button>
      </div>

      {/* Cards Grid - Single Column for Better Text Space */}
      <div className="grid grid-cols-1 gap-8 print:gap-0">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="print:break-after-page print:page-break-after"
          >
            <BingoCard
              card={card}
              cardNumber={index + 1}
              className="print:mx-auto print:max-w-none print:shadow-none max-w-2xl mx-auto"
            />
          </div>
        ))}
      </div>

      {/* Print Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4 print:hidden">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Printing Tips
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
              For best results: Use &quot;Print&quot; or Ctrl+P, select
              &quot;More settings&quot; → &quot;Paper size: Letter&quot; →
              &quot;Margins: Minimum&quot;. Each card will print on a separate
              page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
