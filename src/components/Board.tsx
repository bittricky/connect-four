import { FC } from "react";

import { BoardProps, Cell as CellType, Player } from "../types/global";

const Board: FC<BoardProps> = ({
  board,
  currentPlayer,
  onColumnClick,
  hoverColumn,
  setHoverColumn,
}) => {
  return (
    <div className="relative">
      <div
        className="grid grid-cols-7 gap-2 bg-white rounded-lg p-4 shadow-lg"
        style={{ aspectRatio: "7/6" }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => <div>Cell</div>)
        )}
      </div>
    </div>
  );
};

Board.displayName = "Board";

export default Board;
