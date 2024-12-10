import { useState, useCallback, useEffect } from "react";

import { getBestMove } from "../utils/ai";
import { Player, Board, GameState } from "../types/global";

/**
 * Creates an initial game board. The board is a 6x7 grid with each cell initially
 * set to null. This function is used to create the initial state of the game.
 * @returns {Board} The initial game board.
 */
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

/**
 * Hook that handles the game state and logic for Connect Four.
 *
 * @returns An object with the following properties:
 * - state: The current game state.
 * - makeMove: A function that makes a move in the game. It takes the column number
 *   as an argument.
 * - resetGame: A function that resets the game state to the initial state.
 */
export const useGameLogic = () => {
  const [state, setState] = useState<GameState>(INITIAL_STATE);

  const checkWin = useCallback((board: Board, player: Player) => {
    /**
     * Checks if there are four cells in a row in the given direction.
     *
     * @param {number} rowOffset The row offset.
     * @param {number} colOffset The column offset.
     * @returns {boolean} If there are four cells in a row in the given direction.
     */
    const checkDirection = (rowOffset: number, colOffset: number) => {
      for (let startRow = 0; startRow < 6; startRow++) {
        for (let startCol = 0; startCol < 7; startCol++) {
          const fourCells = [];
          for (let i = 0; i < 4; i++) {
            const row = startRow + i * rowOffset;
            const col = startCol + i * colOffset;
            if (row < 0 || row >= 6 || col < 0 || col >= 7) {
              // Out of bounds, skip this direction
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
      checkDirection(0, 1) ||
      checkDirection(1, 0) ||
      checkDirection(1, 1) ||
      checkDirection(-1, 1)
    );
  }, []);

  const makeMove = useCallback(
    (column: number) => {
      if (state.isGameOver) return;

      setState((prev) => {
        const newBoard = [...prev.board.map((row) => [...row])];

        let row = -1;

        for (let i = 5; i >= 0; i--) {
          if (newBoard[i][column] === null) {
            row = i;
            break;
          }
        }

        if (row < 0) return prev;

        newBoard[row][column] = prev.currentPlayer;

        const hasWon = checkWin(newBoard, prev.currentPlayer);

        const newGameState: GameState = {
          ...prev,
          board: newBoard,
          timeLeft: TURN_TIME,
        };

        if (hasWon) {
          newGameState.winner = prev.currentPlayer;
          newGameState.isGameOver = true;
          newGameState.scores = {
            ...prev.scores,
            [prev.currentPlayer]: prev.scores[prev.currentPlayer] + 1,
          };
        } else {
          newGameState.currentPlayer = prev.currentPlayer === 1 ? 2 : 1;
        }

        return newGameState;
      });
    },
    [checkWin, state]
  );

  // AI move effect
  useEffect(() => {
    if (
      state.mode === "cpu" &&
      state.currentPlayer === 2 &&
      !state.isGameOver
    ) {
      const timer = setTimeout(() => {
        const aiMove = getBestMove(state.board, state.difficulty);
        makeMove(aiMove);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [
    state.currentPlayer,
    state.mode,
    state.isGameOver,
    state.board,
    state.difficulty,
    makeMove,
  ]);

  const startGame = useCallback((mode: Mode, difficulty?: Difficulty) => {
    setState({
      ...INITIAL_STATE,
      mode: mode,
      difficulty: difficulty || "medium",
    });
  }, []);

  const resetGame = useCallback(() => {
    setState((prev) => ({
      ...prev,
      board: createInitialBoard(),
      currentPlayer: 1,
      winner: null,
      isGameOver: false,
      timeLeft: TURN_TIME,
    }));
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
