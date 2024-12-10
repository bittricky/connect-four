import { FC } from "react";
import { motion } from "framer-motion";

import { Cell as CellType, CellProps } from "../types/global";

const Cell: FC<CellProps> = ({
  cell,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isHovered,
  currentPlayer,
}) => {
  const getCellColor = (cell: CellType) => {
    if (cell === 1) return "bg-red-500";
    if (cell === 2) return "bg-yellow-500";
    return "bg-purple-100";
  };

  return (
    <motion.div
      className="relative aspect-square"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="absolute inset-0 rounded-full bg-purple-200" />
      <motion.div
        className={`absolute inset-0 rounded-full ${getCellColor(cell)}`}
        initial={{ scale: 0 }}
        animate={{ scale: cell ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
      {isHovered && !cell && (
        <motion.div
          className={`absolute inset-0 rounded-full ${
            currentPlayer === 1 ? "bg-pink-500/20" : "bg-yellow-400/20"
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      )}
    </motion.div>
  );
};

Cell.displayName = "Cell";

export default Cell;
