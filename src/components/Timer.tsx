import { FC } from "react";
import { TimerIcon } from "lucide-react";

import { TimerProps } from "../types/global";

const Timer: FC<TimerProps> = ({ timeLeft, currentPlayer }) => {
  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-lg p-4 shadow-lg ${
        currentPlayer === 1 ? "bg-pink-50" : "bg-yellow-50"
      }`}
    >
      <div className="flex items-center gap-2">
        <TimerIcon className="w-5 h-5" />
        <span className="font-bold">
          Player {currentPlayer}'s Turn: {timeLeft}s
        </span>
      </div>
    </div>
  );
};

Timer.displayName = "Timer";

export default Timer;
