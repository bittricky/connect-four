import { useState } from "react";
import { Menu as MenuIcon, RefreshCw } from "lucide-react";

import { useGameLogic } from "./hooks/useGameLogic";

import { ScoreCard, Board, Timer, Menu } from "./components";
function App() {
  const { state, makeMove, resetGame } = useGameLogic();
  const [hoverColumn, setHoverColumn] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-purple-500 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
          </div>
          <button
            onClick={resetGame}
            className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <RefreshCw className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">
          <ScoreCard
            player={1}
            score={state.scores[1]}
            isCurrentPlayer={state.currentPlayer === 1}
          />

          <Board
            board={state.board}
            currentPlayer={state.currentPlayer}
            onColumnClick={makeMove}
            hoverColumn={hoverColumn}
            setHoverColumn={setHoverColumn}
          />

          <ScoreCard
            player={2}
            score={state.scores[2]}
            isCurrentPlayer={state.currentPlayer === 2}
          />
        </div>

        {state.winner ? (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">
                Player {state.winner} Wins! Hooray! 🎉
              </h2>
              <button
                onClick={resetGame}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        ) : (
          <Timer
            timeLeft={state.timeLeft}
            currentPlayer={state.currentPlayer}
          />
        )}

        <Menu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onResetGame={resetGame}
        />
      </div>
    </div>
  );
}

export default App;
