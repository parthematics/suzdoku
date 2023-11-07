import { SudokuCreator } from "@algorithm.ts/sudoku";
import { SudokuCellData, GameState } from "../components/SudokuBoard";
import { Difficulty } from "../components/DifficultySelector";

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

export function generateInitialGameState(difficulty: Difficulty): GameState {
  const { puzzle, solution } = generateSudokuBoard(difficulty);
  return {
    board: puzzle,
    solution: solution,
  };
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
