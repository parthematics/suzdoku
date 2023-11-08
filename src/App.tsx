// App.tsx
import React, { useState } from "react";
import SudokuBoard from "./components/SudokuBoard";
import { GameState } from "./components/SudokuBoard";
import {
  generateSudokuBoard,
  generateInitialGameState,
} from "./utils/sudokuHelpers";
import { Difficulty } from "./components/DifficultySelector";
import DifficultySelector from "./components/DifficultySelector";

const initialGameState: GameState = generateInitialGameState(Difficulty.Medium);
console.log(initialGameState);

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Medium);
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [numStrikes, setNumStrikes] = useState<number>(0);

  const handleDifficultyChange = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    // Generate a new Sudoku board based on the selected difficulty
    const { puzzle, solution } = generateSudokuBoard(difficulty);
    setGameState({
      board: puzzle,
      solution: solution,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-thin mb-4 font-urbanist">suzdoku</h1>
      <SudokuBoard
        board={gameState.board}
        solution={gameState.solution}
        onCellChange={(newBoard) => {
          setGameState({ ...gameState, board: newBoard });
        }}
      />
      <DifficultySelector
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
      />
    </div>
  );
}

export default App;
