import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SudokuCell from "./SudokuCell";
import NumberPad from "./NumberPad";

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
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<{ row: number; col: number } | null>(
    null
  );
  const [feedbackByCell, setFeedbackByCell] = useState<
    Record<string, "correct" | "incorrect">
  >({});

  const feedbackTimers = useRef<Record<string, number>>({});

  const clearTimer = useCallback((key: string) => {
    const t = feedbackTimers.current[key];
    if (t) {
      window.clearTimeout(t);
      delete feedbackTimers.current[key];
    }
  }, []);

  useEffect(() => {
    return () => {
      Object.values(feedbackTimers.current).forEach((t) => window.clearTimeout(t));
      feedbackTimers.current = {};
    };
  }, []);

  const selectCell = useCallback((row: number, col: number) => {
    setSelected({ row, col });
    // keep keyboard entry working on desktop
    window.setTimeout(() => boardRef.current?.focus(), 0);
  }, []);

  const selectedKey = useMemo(() => {
    return selected ? `${selected.row}-${selected.col}` : null;
  }, [selected]);

  const updateBoardCell = useCallback(
    (row: number, col: number, value: number | null) => {
      const next = board.map((r) => r.map((c) => ({ ...c })));
      next[row][col].value = value;
      onCellChange(next);
    },
    [board, onCellChange]
  );

  const applyInputToSelected = useCallback(
    (value: number | null) => {
      if (!selected) return;
      const { row, col } = selected;
      const cell = board[row][col];
      if (cell.initial) return;

      const key = `${row}-${col}`;
      clearTimer(key);

      // clearing doesn't need correctness feedback
      if (value === null) {
        setFeedbackByCell((prev) => {
          const { [key]: _removed, ...rest } = prev;
          return rest;
        });
        updateBoardCell(row, col, null);
        return;
      }

      // ignore anything outside 1-9
      if (value < 1 || value > 9) return;

      const isCorrect = solution[row][col].value === value;
      setFeedbackByCell((prev) => ({ ...prev, [key]: isCorrect ? "correct" : "incorrect" }));
      updateBoardCell(row, col, value);

      feedbackTimers.current[key] = window.setTimeout(() => {
        setFeedbackByCell((prev) => {
          const { [key]: _removed, ...rest } = prev;
          return rest;
        });

        if (!isCorrect) {
          onIncorrectValue();
          updateBoardCell(row, col, null);
        }
      }, 900);
    },
    [board, clearTimer, onIncorrectValue, selected, solution, updateBoardCell]
  );

  const moveSelection = useCallback(
    (dr: number, dc: number) => {
      setSelected((prev) => {
        const start = prev ?? { row: 0, col: 0 };
        const nextRow = Math.max(0, Math.min(8, start.row + dr));
        const nextCol = Math.max(0, Math.min(8, start.col + dc));
        return { row: nextRow, col: nextCol };
      });
      window.setTimeout(() => boardRef.current?.focus(), 0);
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      // allow keyboard entry on desktop when board has focus
      if (!selected) return;

      if (e.key >= "1" && e.key <= "9") {
        e.preventDefault();
        applyInputToSelected(parseInt(e.key, 10));
        return;
      }

      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        e.preventDefault();
        applyInputToSelected(null);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        moveSelection(-1, 0);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        moveSelection(1, 0);
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        moveSelection(0, -1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        moveSelection(0, 1);
        return;
      }
    },
    [applyInputToSelected, moveSelection, selected]
  );

  return (
    <div className="w-full">
      <div
        ref={boardRef}
        tabIndex={0}
        role="application"
        aria-label="Sudoku board"
        onKeyDown={handleKeyDown}
        className="mx-auto my-4 p-4 md:p-8 border border-gray-300 rounded-lg overflow-x-auto outline-none focus:outline-none"
      >
        <div className="w-full flex justify-center">
          <div className="inline-block">
            {board.map((row, rowIndex) => (
              <div className="sudoku-row whitespace-nowrap" key={rowIndex}>
                {row.map((cell, colIndex) => {
                  const key = `${rowIndex}-${colIndex}`;
                  const isSelected =
                    selected?.row === rowIndex && selected?.col === colIndex;
                  return (
                    <SudokuCell
                      key={colIndex}
                      value={cell.value}
                      initial={cell.initial}
                      isSelected={isSelected}
                      feedback={feedbackByCell[key]}
                      style={{
                        borderBottom:
                          rowIndex % 3 === 2 ? "1px solid black" : "none",
                        borderRight:
                          colIndex % 3 === 2 ? "1px solid black" : "none",
                        borderTop:
                          rowIndex === 0 ? "1px solid black" : "gray-300",
                        borderLeft:
                          colIndex === 0 ? "1px solid black" : "gray-300",
                      }}
                      onSelect={() => selectCell(rowIndex, colIndex)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3">
        <NumberPad disabled={!selectedKey} onInput={applyInputToSelected} />
      </div>
    </div>
  );
}

export default SudokuBoard;
