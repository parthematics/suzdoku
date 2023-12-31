import React from "react";
import SudokuCell from "./SudokuCell";

export interface GameState {
  board: SudokuCellData[][];
  solution: SudokuCellData[][];
}

export interface SudokuCellData {
  value: number | null;
  initial: boolean;
}

interface Props {
  board: SudokuCellData[][];
  solution: SudokuCellData[][];
  onCellChange: (newBoard: SudokuCellData[][]) => void;
  onIncorrectValue: () => void;
}

function SudokuBoard({
  board,
  solution,
  onCellChange,
  onIncorrectValue,
}: Props) {
  return (
    <div className="mx-auto my-4 p-4 md:p-8 border border-gray-300 rounded-lg overflow-x-auto">
      {board.map((row, rowIndex) => (
        <div className="sudoku-row whitespace-nowrap" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <SudokuCell
              key={colIndex}
              value={cell.value}
              initial={cell.initial}
              solution={solution[rowIndex][colIndex].value}
              style={{
                borderBottom: rowIndex % 3 === 2 ? "1px solid black" : "none",
                borderRight: colIndex % 3 === 2 ? "1px solid black" : "none",
                borderTop: rowIndex === 0 ? "1px solid black" : "gray-300",
                borderLeft: colIndex === 0 ? "1px solid black" : "gray-300",
              }}
              onChange={(newValue) => {
                const newBoard = [...board];
                newBoard[rowIndex][colIndex].value = newValue;
                onCellChange(newBoard);
              }}
              onIncorrectValue={onIncorrectValue}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default SudokuBoard;
