import React from "react";
import { useState, useEffect } from "react";
import { getRandomCat } from "../utils/apiHandler";

interface GameOverModalProps {
  onClose: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ onClose }) => {
  const [catPic, setCatPic] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatPic = async () => {
      const cat = await getRandomCat();
      setCatPic(URL.createObjectURL(cat.data));
      setLoading(false);
    };
    fetchCatPic();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 shadow-lg items-center">
        <h2 className="text-2xl font-semibold mb-2 font-urbanist text-center">
          congratulations!
        </h2>
        <p className="font-urbanist text-center">you finished the puzzle!</p>
        <img
          src={catPic}
          className="w-3/4 mx-auto mt-4"
          style={{
            display: loading ? "none" : "block",
            width: "100%",
            animation: "fadeIn 0.5s",
          }}
          onLoad={(e) => {
            setLoading(false);
          }}
        />
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
};

export default GameOverModal;
