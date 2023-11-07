import React from "react";
import { useState } from "react";

interface Props {
  value: number | null;
  initial: boolean;
  solution: number | null;
  style: React.CSSProperties;
  onChange: (newValue: number | null) => void;
}

function SudokuCell({ value, initial, solution, style, onChange }: Props) {
  const [highlightClass, setHighlightClass] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);

    const handleResult = (isCorrect: boolean, highlightClass: string) => {
      onChange(newValue);
      setHighlightClass(highlightClass);
      setTimeout(() => {
        setHighlightClass("");
        if (!isCorrect) {
          onChange(null);
        }
      }, 1000);
    };

    if (!isNaN(newValue) && newValue >= 1 && newValue <= 9) {
      const isCorrect = solution === newValue;
      handleResult(isCorrect, isCorrect ? "bg-green-200" : "bg-red-200");
    } else {
      onChange(null);
    }
  };

  return (
    <input
      type="text"
      value={value || ""}
      readOnly={initial}
      onChange={handleChange}
      style={style}
      className={`sudoku-cell ${
        initial ? "bg-gray-200" : "bg-white"
      } w-12 h-12 text-center border border-gray-300 rounded-sm ${highlightClass}`}
    />
  );
}

export default SudokuCell;
