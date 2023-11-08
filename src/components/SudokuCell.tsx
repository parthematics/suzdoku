import React, { useState } from "react";

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
      console.log("HIGH: ", highlightClass);
      setTimeout(() => {
        if (!isCorrect) {
          onChange(null);
        }
        setHighlightClass("");
        console.log("HIGH: ", highlightClass);
      }, 1000);
    };

    if (!isNaN(newValue) && newValue >= 1 && newValue <= 9) {
      const isCorrect = solution === newValue;
      handleResult(isCorrect, isCorrect ? "bg-green" : "bg-red");
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
      className={`${
        initial ? "bg-gray-200" : highlightClass ? highlightClass : "bg-white"
      } w-10 h-10 md:w-12 md:h-12 text-center font-urbanist border border-gray-300 rounded-sm`}
    />
  );
}

export default SudokuCell;
