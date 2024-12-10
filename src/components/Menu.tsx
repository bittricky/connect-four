import { FC } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router";

import { motion, AnimatePresence } from "framer-motion";

import { MenuProps } from "../types/global";

const Menu: FC<MenuProps> = ({
  isOpen,
  onClose,
  onResetGame = () => {},
  mode,
}) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 p-6"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-2">Game Rules</h3>
              <div className="space-y-2 text-gray-600">
                <p>1. Players take turns dropping colored discs.</p>
                <p>2. Each player has 30 seconds per turn.</p>
                <p>
                  3. Connect four discs vertically, horizontally, or diagonally
                  to win.
                </p>
                <p>
                  4. If the timer runs out, the turn passes to the other player.
                </p>
              </div>

              {mode !== null && (
                <div className="space-y-4 mt-8">
                  <button
                    onClick={() => {
                      onResetGame();
                      onClose();
                    }}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors mt-8"
                  >
                    New Game
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Main Menu
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

Menu.displayName = "Menu";

export default Menu;
