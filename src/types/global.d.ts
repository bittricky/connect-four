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

export interface BoardProps {
  board: CellType[][];
  currentPlayer: Player;
  onColumnClick: (column: number) => void;
  hoverColumn: number | null;
  setHoverColumn: (column: number | null) => void;
}
