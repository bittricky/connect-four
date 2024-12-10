import { useState, useCallback, useEffect } from "react";
import { Player, Board, GameState } from "../types/game";

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
};

export const useGameLogic = () => {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const checkWin = useCallback(
    (board: Board, row: number, col: number, player: Player) => {
      const checkDirection = (dr: number, dc: number) => {
        for (let r = 0; r < 6; r++) {
          for (let c = 0; c < 4; c++) {
            /*
                (dr, dc) represents the direction: 
                (0,1) horizontal, 
                (1,0) vertical, 
                (1,1) diagonal, 
                (-1,1) anti-diagonal
            */
            if (
              board[(r + 0 * dr) % 6][(c + 0 * dc) % 7] === player &&
              board[(r + 1 * dr) % 6][(c + 1 * dc) % 7] === player &&
              board[(r + 2 * dr) % 6][(c + 2 * dc) % 7] === player &&
              board[(r + 3 * dr) % 6][(c + 3 * dc) % 7] === player
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
    },
    []
  );

  const makeMove = useCallback(
    (column: number) => {
      if (state.isGameOver) return;

      setState((prev) => {
        const newBoard = [...prev.board.map((row) => [...row])];
        let row = 5;

        const firstEmptyRow = newBoard.reduceRight(
          (acc, row, rowIdx) => (row[column] === null ? rowIdx : acc),
          -1
        );

        if (firstEmptyRow < 0) return prev;

        row = firstEmptyRow;

        if (row < 0) return prev;

        newBoard[row][column] = prev.currentPlayer;

        const hasWon = checkWin(newBoard, row, column, prev.currentPlayer);

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

  const resetGame = useCallback(() => {
    setState((prev) => ({
      ...prev,
      board: createInitialBoard(),
      currentPlayer: 1,
      winner: null,
      isGameOver: false,
      scores: {
        1: 0,
        2: 0,
      },
      timeLeft: TURN_TIME,
    }));
  }, []);

  useEffect(() => {
    if (state.isGameOver) return;

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
  }, [state.isGameOver]);

  return {
    state,
    makeMove,
    resetGame,
  };
};
