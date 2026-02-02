import React from "react";

interface Props {
  value: number | null;
  initial: boolean;
  style: React.CSSProperties;
  isSelected: boolean;
  feedback?: "correct" | "incorrect";
  onSelect: () => void;
}

function SudokuCell({
  value,
  initial,
  style,
  isSelected,
  feedback,
  onSelect,
}: Props) {
  const backgroundClass = initial
    ? "bg-gray-200"
    : feedback === "correct"
      ? "bg-green"
      : feedback === "incorrect"
        ? "bg-red"
        : "bg-white";

  return (
    <button
      type="button"
      onClick={onSelect}
      style={style}
      className={`${
        backgroundClass
      } w-10 h-10 md:w-12 md:h-12 text-center font-urbanist border border-gray-300 rounded-sm align-middle ${
        isSelected ? "ring-2 ring-blue-400 ring-inset" : ""
      } ${initial ? "font-semibold text-gray-700" : "text-gray-900"} `}
      aria-label={
        initial
          ? `Given cell value ${value ?? ""}`
          : `Sudoku cell ${value ?? "empty"}`
      }
    >
      {value ?? ""}
    </button>
  );
}

export default SudokuCell;
