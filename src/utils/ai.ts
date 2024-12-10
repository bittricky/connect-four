/**
 * This file contains the logic for the Connect Four AI.
 *
 * The AI uses the Minimax algorithm to determine the best move. The algorithm
 * works by recursively exploring all possible moves, and then evaluating the
 * best move based on the score of each move.
 *
 * The score of a move is determined by the `evaluateBoard` function, which
 * evaluates the board based on the number of rows, columns, and diagonals that
 * contain four of the same player's pieces.
 *
 * The `minimax` function takes in the current board, the maximum depth to search,
 * and a boolean indicating whether the AI is maximizing or minimizing the score.
 * It returns the best score and the move that led to that score.
 *
 * The `getBestMove` function takes in the current board and the difficulty level,
 * and returns the best move based on the Minimax algorithm.
 *
 * The `evaluateBoard` function takes in the current board and returns a score
 * based on the number of rows, columns, and diagonals that contain four of the
 * same player's pieces.
 *
 * The `isColumnFull` function takes in the current board and a column number,
 * and returns a boolean indicating whether the column is full.
 *
 * The `getLowestEmptyRow` function takes in the current board and a column number,
 * and returns the lowest empty row in the column.
 *
 * The `makeMove` function takes in the current board, a column number, a row
 * number, and a player, and returns a new board with the move made.
 *
 * The `isGameOver` function takes in the current board and returns a boolean
 * indicating whether the game is over.
 *
 * The `isGameOver` function checks if the board is full, and if not, checks for
 * a winner by checking all possible winning combinations of rows, columns, and
 * diagonals.
 */

import { Board, Player, Difficulty } from "../types/global";

const DEPTH_MAP: Record<Difficulty, number> = {
  easy: 2,
  medium: 4,
  hard: 6,
};

export function getBestMove(board: Board, difficulty: Difficulty): number {
  const maxDepth = DEPTH_MAP[difficulty];
  let bestScore = -Infinity;
  let bestMove = 0;

  // Try each column
  for (let col = 0; col < 7; col++) {
    if (!isColumnFull(board, col)) {
      const row = getLowestEmptyRow(board, col);
      const newBoard = makeMove(board, col, row, 2);
      const score = minimax(newBoard, maxDepth, false, -Infinity, Infinity);

      if (score > bestScore) {
        bestScore = score;
        bestMove = col;
      }
    }
  }

  return bestMove;
}

function minimax(
  board: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number
): number {
  if (depth === 0 || isGameOver(board)) {
    return evaluateBoard(board);
  }

  if (isMaximizing) {
    let maxScore = -Infinity;
    for (let col = 0; col < 7; col++) {
      if (!isColumnFull(board, col)) {
        const row = getLowestEmptyRow(board, col);
        const newBoard = makeMove(board, col, row, 2);
        const score = minimax(newBoard, depth - 1, false, alpha, beta);
        maxScore = Math.max(maxScore, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (let col = 0; col < 7; col++) {
      if (!isColumnFull(board, col)) {
        const row = getLowestEmptyRow(board, col);
        const newBoard = makeMove(board, col, row, 1);
        const score = minimax(newBoard, depth - 1, true, alpha, beta);
        minScore = Math.min(minScore, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
    }
    return minScore;
  }
}

function evaluateBoard(board: Board): number {
  let score = 0;

  // Evaluate horizontal windows
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 4; c++) {
      score += evaluateWindow([
        board[r][c],
        board[r][c + 1],
        board[r][c + 2],
        board[r][c + 3],
      ]);
    }
  }

  // Evaluate vertical windows
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 7; c++) {
      score += evaluateWindow([
        board[r][c],
        board[r + 1][c],
        board[r + 2][c],
        board[r + 3][c],
      ]);
    }
  }

  // Evaluate diagonal windows
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      score += evaluateWindow([
        board[r][c],
        board[r + 1][c + 1],
        board[r + 2][c + 2],
        board[r + 3][c + 3],
      ]);
    }
  }

  // Evaluate anti-diagonal windows
  for (let r = 3; r < 6; r++) {
    for (let c = 0; c < 4; c++) {
      score += evaluateWindow([
        board[r][c],
        board[r - 1][c + 1],
        board[r - 2][c + 2],
        board[r - 3][c + 3],
      ]);
    }
  }

  return score;
}

function evaluateWindow(window: (Player | null)[]): number {
  const aiCount = window.filter((cell) => cell === 2).length;
  const playerCount = window.filter((cell) => cell === 1).length;
  const emptyCount = window.filter((cell) => cell === null).length;

  if (aiCount === 4) return 100;
  if (playerCount === 4) return -100;
  if (aiCount === 3 && emptyCount === 1) return 5;
  if (playerCount === 3 && emptyCount === 1) return -5;
  if (aiCount === 2 && emptyCount === 2) return 2;
  if (playerCount === 2 && emptyCount === 2) return -2;

  return 0;
}

function isColumnFull(board: Board, col: number): boolean {
  return board[0][col] !== null;
}

function getLowestEmptyRow(board: Board, col: number): number {
  for (let row = 5; row >= 0; row--) {
    if (board[row][col] === null) {
      return row;
    }
  }
  return -1;
}

function makeMove(
  board: Board,
  col: number,
  row: number,
  player: Player
): Board {
  const newBoard = board.map((row) => [...row]);
  newBoard[row][col] = player;
  return newBoard;
}

function isGameOver(board: Board): boolean {
  // Check if board is full
  if (board[0].every((cell) => cell !== null)) return true;

  // Check for winner
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      if (board[r][c]) {
        // Check horizontal
        if (
          c <= 3 &&
          board[r][c] === board[r][c + 1] &&
          board[r][c] === board[r][c + 2] &&
          board[r][c] === board[r][c + 3]
        ) {
          return true;
        }
        // Check vertical
        if (
          r <= 2 &&
          board[r][c] === board[r + 1][c] &&
          board[r][c] === board[r + 2][c] &&
          board[r][c] === board[r + 3][c]
        ) {
          return true;
        }
        // Check diagonal
        if (
          r <= 2 &&
          c <= 3 &&
          board[r][c] === board[r + 1][c + 1] &&
          board[r][c] === board[r + 2][c + 2] &&
          board[r][c] === board[r + 3][c + 3]
        ) {
          return true;
        }
        // Check anti-diagonal
        if (
          r >= 3 &&
          c <= 3 &&
          board[r][c] === board[r - 1][c + 1] &&
          board[r][c] === board[r - 2][c + 2] &&
          board[r][c] === board[r - 3][c + 3]
        ) {
          return true;
        }
      }
    }
  }
  return false;
}
