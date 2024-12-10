import { FC } from "react";
import { SmilePlus } from "lucide-react";

import { ScoreCardProps } from "../types/global";

const ScoreCard: FC<ScoreCardProps> = ({ player, score, isCurrentPlayer }) => {
  return (
    <div
      className={`bg-white rounded-lg p-4 shadow-md transition-all ${
        isCurrentPlayer ? "ring-2 ring-purple-500 scale-105" : ""
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <SmilePlus
          className={`w-6 h-6 ${
            player === 1 ? "text-pink-500" : "text-yellow-400"
          }`}
        />
        <span className="font-bold">Player {player}</span>
      </div>
      <div className="text-3xl font-bold text-center">{score}</div>
    </div>
  );
};

ScoreCard.displayName = "ScoreCard";

export default ScoreCard;
