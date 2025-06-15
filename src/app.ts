import { setToken } from "./prompts";
import { Board } from "./types";

type PlayerIcon = "X" | "O";
const getCurrentPlayerIcon = (player: PlayerIcon): PlayerIcon =>
  player === "X" ? "O" : "X";

const hasStraightLine = (board: Board): string | null => {
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
  return null;
};

async function tictactoe() {
  const board: Board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let gameOver = false;
  let playerIcon = getCurrentPlayerIcon("O");
  do {
    const [xCoord, yCoord] = await setToken({
      board,
      icon: playerIcon,
    });

    board[yCoord][xCoord] = playerIcon;

    const winner = hasStraightLine(board);
    if (winner) {
      console.log(`Winner is ${winner}`);
      gameOver = true;
      break;
    }

    playerIcon = getCurrentPlayerIcon(playerIcon);
  } while (!gameOver);

  console.log("Game Over!");
}

tictactoe();
