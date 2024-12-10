import { FC, useState } from "react";
import { motion } from "framer-motion";
import { SmilePlus, Bot, Book } from "lucide-react";

import { HomeProps, Difficulty } from "../types/global";

const Home: FC<HomeProps> = ({ onStartGame, onShowRules }) => {
  const [showDifficulty, setShowDifficulty] = useState<boolean>(false);

  const buttonVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const difficulties: { label: string; value: Difficulty }[] = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
  ];

  return (
    <div className="min-h-screen bg-purple-500 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-12 flex flex-col items-center"
      >
        <div className="flex gap-2 mb-4">
          <div className="w-4 h-4 rounded-full bg-red-500" />
          <div className="w-4 h-4 rounded-full bg-yellow-500" />
          <div className="w-4 h-4 rounded-full bg-red-500" />
          <div className="w-4 h-4 rounded-full bg-yellow-500" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Connect Four</h1>
        <p className="text-white/80">Classic strategy game for two players</p>
      </motion.div>

      <div className="space-y-4 w-full max-w-sm">
        {!showDifficulty ? (
          <>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "spring" }}
              className="w-full bg-pink-500 text-white p-4 rounded-xl shadow-lg flex items-center justify-center gap-3 font-semibold"
              onClick={() => setShowDifficulty(true)}
            >
              <Bot className="w-6 h-6" />
              Play vs CPU
            </motion.button>

            <motion.button
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "spring", delay: 0.1 }}
              className="w-full bg-yellow-400 text-white p-4 rounded-xl shadow-lg flex items-center justify-center gap-3 font-semibold"
              onClick={() => onStartGame("player")}
            >
              <SmilePlus className="w-6 h-6" />
              Play vs Player
            </motion.button>
          </>
        ) : (
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-center mb-4"
            >
              Select Difficulty
            </motion.div>
            {difficulties.map((diff, index) => (
              <motion.button
                key={diff.value}
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                transition={{ type: "spring", delay: index * 0.1 }}
                className="w-full bg-white text-purple-600 p-4 rounded-xl shadow-lg font-semibold"
                onClick={() => onStartGame("cpu", diff.value)}
              >
                {diff.label}
              </motion.button>
            ))}
            <motion.button
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "spring", delay: 0.3 }}
              className="w-full bg-purple-600 text-white p-3 rounded-xl shadow-lg font-semibold"
              onClick={() => setShowDifficulty(false)}
            >
              Back
            </motion.button>
          </div>
        )}

        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          transition={{ type: "spring", delay: 0.2 }}
          className="w-full bg-white text-purple-600 p-4 rounded-xl shadow-lg flex items-center justify-center gap-3 font-semibold"
          onClick={onShowRules}
        >
          <Book className="w-6 h-6" />
          Game Rules
        </motion.button>
      </div>
    </div>
  );
};

Home.displayName = "Home";

export default Home;
