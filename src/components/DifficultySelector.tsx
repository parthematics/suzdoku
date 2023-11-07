import React from "react";

interface Props {
  difficulty: Difficulty;
  onDifficultyChange: (selectedDifficulty: Difficulty) => void;
}

export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

function DifficultySelector({ difficulty, onDifficultyChange }: Props) {
  return (
    <div className="difficulty-selector">
      <label>Difficulty:</label>
      <select
        value={difficulty}
        onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}

export default DifficultySelector;
