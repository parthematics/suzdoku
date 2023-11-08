import React from "react";

interface GameOverModalProps {
  onClose: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <h2 className="text-2xl font-semibold mb-2 font-urbanist">
          congratulations!
        </h2>
        <p className="font-urbanist">you finished the puzzle!</p>
        <div className="mt-2 flex items-center">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white rounded px-3 py-1 mt-4 hover:bg-blue-600 focus:outline-none font-urbanist mx-auto"
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
