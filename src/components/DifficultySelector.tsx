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
    <div className="difficulty-selector mt-4">
      <label className="font-urbanist m-2 font-thin text-lg">difficulty:</label>
      <select
        value={difficulty}
        className="font-urbanist text-lg"
        onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
      >
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select>
    </div>
  );
}

export default DifficultySelector;
