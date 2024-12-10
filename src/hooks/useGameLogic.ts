import { useState, useCallback, useEffect, useRef } from "react";
import { getBestMove } from "../utils/ai";
import { Player, Board, GameState, Mode, Difficulty } from "../types/global";

const createInitialBoard = () =>
  Array(6)
    .fill(null)
    .map(() => Array(7).fill(null));
const TURN_TIME = 30;

const INITIAL_STATE: GameState = {
  board: createInitialBoard(),
  currentPlayer: 1,
  winner: null,
  isGameOver: false,
  scores: {
    1: 0,
    2: 0,
  },
  timeLeft: TURN_TIME,
  mode: null,
  difficulty: "medium",
};

export const useGameLogic = () => {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const stateRef = useRef(state); // Create a ref to store the current state

  // Synchronize the ref with the current state
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const checkWin = useCallback((board: Board, player: Player) => {
    const checkDirection = (rowOffset: number, colOffset: number) => {
      for (let startRow = 0; startRow < 6; startRow++) {
        for (let startCol = 0; startCol < 7; startCol++) {
          const fourCells = [];
          for (let i = 0; i < 4; i++) {
            const row = startRow + i * rowOffset;
            const col = startCol + i * colOffset;
            if (row < 0 || row >= 6 || col < 0 || col >= 7) {
              fourCells.length = 0;
              break;
            }
            fourCells.push(board[row][col]);
          }
          if (
            fourCells.length === 4 &&
            fourCells.every((cell) => cell === player)
          ) {
            return true;
          }
        }
      }
      return false;
    };

    return (
      checkDirection(0, 1) || // Horizontal
      checkDirection(1, 0) || // Vertical
      checkDirection(1, 1) || // Diagonal Down-Right
      checkDirection(-1, 1) // Diagonal Up-Right
    );
  }, []);

  const makeMove = useCallback(
    (column: number) => {
      setState((prev) => {
        if (prev.isGameOver) return prev;

        const newBoard = prev.board.map((row) => [...row]); // Deep clone the board
        let row = -1;

        // Find the lowest empty row in the selected column
        for (let i = 5; i >= 0; i--) {
          if (newBoard[i][column] === null) {
            row = i;
            break;
          }
        }

        if (row < 0) return prev; // Column is full, invalid move

        newBoard[row][column] = prev.currentPlayer; // Place the current player's piece
        const hasWon = checkWin(newBoard, prev.currentPlayer);
        
        const nextPlayer = hasWon ? prev.currentPlayer : (prev.currentPlayer === 1 ? 2 : 1);
        console.log("Making move:", {
          column,
          row,
          currentPlayer: prev.currentPlayer,
          nextPlayer,
          hasWon
        });

        return {
          ...prev,
          board: newBoard,
          timeLeft: TURN_TIME,
          currentPlayer: nextPlayer,
          winner: hasWon ? prev.currentPlayer : null,
          isGameOver: hasWon,
          scores: hasWon
            ? {
                ...prev.scores,
                [prev.currentPlayer]: prev.scores[prev.currentPlayer] + 1,
              }
            : prev.scores,
        };
      });
    },
    [checkWin]
  );

  // AI move effect
  useEffect(() => {
    const { currentPlayer, mode, board, difficulty, isGameOver } = state;
    console.log("AI Move useEffect triggered:", {
      mode,
      currentPlayer,
      difficulty,
      isGameOver,
      boardState: board.some(row => row.some(cell => cell !== null))
    });

    if (!mode || isGameOver) {
      console.log("AI Move skipped - no mode or game over");
      return;
    }
    
    if (mode === "cpu" && currentPlayer === 2) {
      console.log("Starting AI move calculation...");
      const timer = setTimeout(() => {
        const aiMove = getBestMove(board, difficulty);
        console.log("AI calculated move: ", aiMove);
        if (aiMove !== undefined && !isGameOver) {
          makeMove(aiMove);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [state.currentPlayer, state.mode, state.difficulty, state.isGameOver, state.board, makeMove]);

  const startGame = useCallback((mode: Mode, difficulty?: Difficulty) => {
    console.log("Starting game with:", { mode, difficulty });
    setState((prevState) => {
      // Create new state without spreading INITIAL_STATE
      const newState: GameState = {
        board: createInitialBoard(),
        currentPlayer: 1,
        winner: null,
        isGameOver: false,
        scores: { 1: 0, 2: 0 },
        timeLeft: TURN_TIME,
        mode: mode, // Explicitly set the mode
        difficulty: difficulty || "medium"
      };
      console.log("New game state:", newState);
      return newState;
    });
  }, []);

  useEffect(() => {
    console.log("State changed:", {
      mode: state.mode,
      currentPlayer: state.currentPlayer,
      difficulty: state.difficulty
    });
  }, [state.mode, state.currentPlayer, state.difficulty]);

  const resetGame = useCallback(() => {
    setState((prev) => {
      const resetState = {
        ...prev,
        board: createInitialBoard(),
        currentPlayer: 1,
        winner: null,
        isGameOver: false,
        timeLeft: TURN_TIME,
        // Maintain the existing mode and difficulty
        mode: prev.mode,
        difficulty: prev.difficulty
      };
      console.log("Reset game state:", resetState);
      return resetState;
    });
  }, []);

  useEffect(() => {
    if (state.isGameOver || (state.mode === "cpu" && state.currentPlayer === 2))
      return;

    const timer = setInterval(() => {
      setState((prev) => {
        if (prev.timeLeft <= 0) {
          return {
            ...prev,
            currentPlayer: prev.currentPlayer === 1 ? 2 : 1,
            timeLeft: TURN_TIME,
          };
        }
        return {
          ...prev,
          timeLeft: prev.timeLeft - 1,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.isGameOver, state.mode, state.currentPlayer]);

  return {
    state,
    makeMove,
    resetGame,
    startGame,
  };
};
