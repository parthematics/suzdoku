import React from "react";
import { useState, useRef } from "react";
import { getRandomCat } from "../utils/apiHandler";

interface GameOverModalProps {
  onClose: () => void;
  userLost: boolean;
}

function GameOverModal({ onClose, userLost }: GameOverModalProps) {
  const [loading, setLoading] = useState(true);
  const catPicSrc = useRef(getRandomCat({ loser: userLost }));
  const title = userLost ? "game over!" : "congratulations!";
  const message = userLost
    ? "it's ok. play again?"
    : "you finished the puzzle!";
  const altText = userLost
    ? "if you're seeing this, you're a loser but the cat image took too long to load :("
    : "if you're seeing this, you're a winner but the cat image took too long to load :(";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 shadow-lg items-center">
        <h2 className="text-2xl font-semibold mb-2 font-urbanist text-center">
          {title}
        </h2>
        <p className="font-urbanist text-center">{message}</p>
        <div className="w-48 h-48 relative">
          <img
            src={catPicSrc.current}
            alt={altText}
            className="mx-auto mt-4 w-full animate-[fadeIn_0.5s]"
            onLoad={() => setLoading(false)}
          />
          {loading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg p-4 max-w-sm w-full mx-auto"></div>
          )}
        </div>
        <div className="mt-2 flex items-center">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white rounded px-3 py-1 mt-3 mb-1 hover:bg-blue-600 focus:outline-none font-urbanist mx-auto"
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOverModal;
