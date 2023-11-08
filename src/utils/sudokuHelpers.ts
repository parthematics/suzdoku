import { SudokuCreator } from "@algorithm.ts/sudoku";
import { SudokuCellData, GameState } from "../components/SudokuBoard";
import { Difficulty } from "../components/DifficultySelector";

export function generateInitialGameState(difficulty: Difficulty): GameState {
  const { puzzle, solution } = generateSudokuBoard(difficulty);
  return {
    board: puzzle,
    solution: solution,
  };
}

export function isPuzzleSolved(
  board: SudokuCellData[][],
  solution: SudokuCellData[][]
): boolean {
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
      const cell = board[rowIndex][colIndex];
      const solutionCell = solution[rowIndex][colIndex];

      if (cell.value === null || cell.value !== solutionCell.value) {
        return false; // Sudoku board is not solved
      }
    }
  }
  return true;
}

export function generateSudokuBoard(difficulty: Difficulty) {
  const difficultyMap = {
    [Difficulty.Easy]: 0.2,
    [Difficulty.Medium]: 0.6,
    [Difficulty.Hard]: 1.0,
  };
  const creator = new SudokuCreator({
    childMatrixWidth: 3,
    difficulty: difficultyMap[difficulty],
  });

  const puzzle = creator.createSudoku();
  return {
    puzzle: convertArrayToBoard(puzzle.puzzle),
    solution: convertArrayToBoard(puzzle.solution),
  };
}

function convertArrayToBoard(arr: number[]): SudokuCellData[][] {
  const board: SudokuCellData[][] = [];
  let index = 0;

  for (let row = 0; row < 9; row++) {
    const rowData: SudokuCellData[] = [];
    for (let col = 0; col < 9; col++) {
      const cellValue = arr[index];
      const isInitial = cellValue !== -1;
      rowData.push({
        value: isInitial ? cellValue + 1 : null,
        initial: isInitial,
      });
      index++;
    }
    board.push(rowData);
  }
  return board;
}
