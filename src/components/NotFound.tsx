import { FC } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Joystick, AlertCircle } from "lucide-react";

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-purple-700 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="mb-8 text-yellow-500"
      >
        <AlertCircle className="w-24 h-24 mx-auto mb-4" />
        <div className="flex gap-2 justify-center mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-yellow-500 mb-2">404</h1>
        <p className="text-yellow-300/80 mb-8">
          Ah dude, well.. this is embarrasing. Didn't expect this to happen.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-yellow-500 px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 font-semibold mx-auto border border-yellow-500"
          onClick={() => navigate("/")}
        >
          <Joystick className="w-5 h-5" />
          Let's get back to the Game
        </motion.button>
      </motion.div>
    </div>
  );
};

NotFound.displayName = "NotFound";

export default NotFound;
