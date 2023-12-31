import React, { useEffect, useState } from "react";
import SudokuBoard from "./components/SudokuBoard";
import { GameState } from "./components/SudokuBoard";
import GameOverModal from "./components/GameOverModal";
import {
  generateSudokuBoard,
  generateInitialGameState,
  isPuzzleSolved,
} from "./utils/sudokuHelpers";
import { Difficulty } from "./components/DifficultySelector";
import DifficultySelector from "./components/DifficultySelector";

const initialGameState: GameState = generateInitialGameState(Difficulty.Medium);

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Medium);
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [strikes, setStrikes] = useState<string>("");
  const [showModal, setShowModal] = React.useState(false);
  const [userLost, setUserLost] = React.useState(false);
  const [funMode, setFunMode] = React.useState(true);

  useEffect(() => {
    if (isPuzzleSolved(gameState.board, gameState.solution)) {
      setUserLost(false);
      setShowModal(true);
    }
  }, [gameState]);

  const handleDifficultyChange = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    // Generate a new Sudoku board based on the selected difficulty
    const { puzzle, solution } = generateSudokuBoard(difficulty);
    setGameState({
      board: puzzle,
      solution: solution,
    });
  };

  const handleIncorrectValue = () => {
    if (!funMode) {
      setStrikes(strikes.concat("😾"));
      // Check if the player has reached 3 strikes
      if (strikes === "😾😾") {
        setUserLost(true);
        setShowModal(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-thin mb-4 font-urbanist">suzdoku</h1>
      {!funMode && (
        <p className="text-center font-urbanist text-xl font-bold">
          {`strikes: ${strikes}`}
        </p>
      )}
      <SudokuBoard
        board={gameState.board}
        solution={gameState.solution}
        onCellChange={(newBoard) => {
          setGameState({ ...gameState, board: newBoard });
        }}
        onIncorrectValue={handleIncorrectValue}
      />
      <DifficultySelector
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
      />
      {showModal && (
        <GameOverModal
          onClose={() => {
            setShowModal(false);
            setStrikes("");
          }}
          userLost={userLost}
        />
      )}
      <div className="mt-4">
        <label
          className="inline-block pr-[0.15rem] hover:cursor-pointer font-urbanist"
          htmlFor="flexSwitchCheckDefault"
        >
          fun mode
        </label>
        <input
          className="mr-2 ml-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-green-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] 
            after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-blue-300 checked:after:absolute 
            checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-blue-400 checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] 
            checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] 
            focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] 
            checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
          type="checkbox"
          checked={funMode}
          onChange={() => setFunMode(!funMode)}
          role="switch"
          id="flexSwitchCheckDefault"
        />
      </div>
    </div>
  );
}

export default App;
