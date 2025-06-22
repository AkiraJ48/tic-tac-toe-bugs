import { Board } from "./board";

export const hasStraightLine = (board: Board) => {
  const size = board.length;

  // Check rows
  for (let i = 0; i < size; i++) {
    if (board[i][0] && board[i].every((cell) => cell === board[i][0])) {
      return board[i][0];
    }
  }
  // Check columns
  for (let j = 0; j < size; j++) {
    if (board[0][j] && board.every((row) => row[j] === board[0][j])) {
      return board[0][j];
    }
  }
  // Check main diagonal
  if (board[0][0] && board.every((row, idx) => row[idx] === board[0][0])) {
    return board[0][0];
  }
  // Check anti-diagonal
  if (
    board[0][size - 1] &&
    board.every((row, idx) => row[size - 1 - idx] === board[0][size - 1])
  ) {
    return board[0][size - 1];
  }
};

export const isDraw = (board: Board) =>
  board.every((column) => column.every((row) => Boolean(row)));
