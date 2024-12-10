import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router"; // Import necessary routing components

import { useGameLogic } from "./hooks/useGameLogic";
import { Game, Home, NotFound } from "./components";

const App = () => {
  const { startGame } = useGameLogic();
  // TODO Add state and menu management to hook or here

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
              onShowRules={() => console.log("Show rules")}
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
