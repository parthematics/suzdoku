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
}

function SudokuBoard({ board, solution, onCellChange }: Props) {
  return (
    <div className="sudoku-board mx-auto my-4 p-4 border border-gray-300 rounded-lg">
      {board.map((row, rowIndex) => (
        <div className="sudoku-row" key={rowIndex}>
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
            />
          ))}
        </div>
      ))}
      {/* Display strike count here */}
    </div>
  );
}

export default SudokuBoard;
