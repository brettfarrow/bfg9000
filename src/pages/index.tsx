import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import { useBingoCards } from "../hooks/useBingoCards";
import ControlPanel from "../components/ControlPanel";
import PreviewArea from "../components/PreviewArea";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const {
    textInput,
    setTextInput,
    settings,
    cards,
    isGenerating,
    error,
    updateSettings,
    generateCards,
    clearAll,
    printCards,
  } = useBingoCards();

  return (
    <>
      <Head>
        <title>BFG9000 - Bingo Card Generator</title>
        <meta
          name="description"
          content="Generate unique printable bingo cards from your text. Simple, fast, and print-optimized."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-50 dark:bg-gray-900 font-[family-name:var(--font-geist-sans)]`}
      >
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <header className="text-center mb-8 print:hidden">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              🎯 BFG9000
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Bingo File Generator 9000 - Create Perfect Bingo Cards
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Generate unique, printable bingo cards from your text
            </p>
          </header>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Control Panel - Left Side */}
            <div className="xl:col-span-1 print:hidden">
              <ControlPanel
                settings={settings}
                onSettingsChange={updateSettings}
                onGenerate={generateCards}
                onClear={clearAll}
                isGenerating={isGenerating}
                error={error}
                textInput={textInput}
                onTextInputChange={setTextInput}
              />
            </div>

            {/* Preview Area - Right Side - More Space */}
            <div className="xl:col-span-3">
              <PreviewArea cards={cards} onPrint={printCards} />
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400 print:hidden">
            <p>
              Built with Next.js and Tailwind CSS •
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 underline hover:text-gray-700 dark:hover:text-gray-300"
              >
                View on GitHub
              </a>
            </p>
            <p className="mt-2">
              Perfect for teachers, event organizers, and game enthusiasts!
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
