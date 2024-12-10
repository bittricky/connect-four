export type Player = 1 | 2;
export type Cell = Player | null;
export type Board = Cell[][];
export type Mode = "cpu" | "player" | null;
export type Difficulty = "easy" | "medium" | "hard";

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  isGameOver: boolean;
  scores: Record<Player, number>;
  timeLeft: number;
  mode: Mode;
  difficulty: Difficulty;
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

export interface CellProps {
  cell: CellType;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isHovered: boolean;
  currentPlayer: Player;
}

export interface TimerProps {
  timeLeft: number;
  currentPlayer: Player;
}

export interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onResetGame: () => void;
}

export interface HomeProps {
  onStartGame: (mode: Mode, difficulty?: Difficulty) => void;
  onShowRules: () => VideoDecoder;
}

export interface Settings {
  mode: Mode;
  difficulty: Difficulty;
}
