import React, { useState } from "react";
import { Menu, RefreshCw } from "lucide-react";
function App() {
  return (
    <div className="min-h-screen bg-purple-500 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => {}}
            className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {/* TODO:Menu Component */}
          </button>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
          </div>
          <button
            onClick={() => {}}
            className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {/* TODO: Restart Game Component */}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">
          {/* TODO: Score Card Component */}

          {/* TODO: Board Component */}

          {/* TODO: Score Card Component */}
        </div>

        {/* TODO: Display Game and Timer */}

        {/* TODO: Game Component */}
      </div>
    </div>
  );
}

export default App;
