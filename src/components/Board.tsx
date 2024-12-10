import { FC } from "react";

import Cell from "./Cell";

import { BoardProps } from "../types/global";

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
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => onColumnClick(colIndex)}
              onMouseEnter={() => setHoverColumn(colIndex)}
              onMouseLeave={() => setHoverColumn(null)}
              isHovered={hoverColumn === colIndex}
              currentPlayer={currentPlayer}
            />
          ))
        )}
      </div>
    </div>
  );
};

Board.displayName = "Board";

export default Board;
