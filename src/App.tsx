import { BrowserRouter as Router, Routes, Route } from "react-router"; // Import necessary routing components

import { Mode, Difficulty } from "./types/global";
import { useGameLogic } from "./hooks/useGameLogic";
import { Game, Home, NotFound } from "./components";

const App = () => {
  const { startGame } = useGameLogic();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              onStartGame={(mode: Mode, difficulty?: Difficulty) => {
                startGame(mode, difficulty);
              }}
            />
          }
        />
        <Route path="/Game" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
