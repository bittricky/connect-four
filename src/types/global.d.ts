export type Player = 1 | 2;
export type Cell = Player | null;
export type Board = Cell[][];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  isGameOver: boolean;
  scores: Record<Player, number>;
  timeLeft: number;
}

export interface ScoreCardProps {
  player: 1 | 2;
  score: number;
  isCurrentPlayer: boolean;
}
