import { setToken } from "./prompts";
import { Board } from "./types";

const isGameOver = (board: Board) => {
  if (board[1][1]) {
    return true;
  }
  return false;
};

type PlayerIcon = "X" | "O";
const getCurrentPlayerIcon = (player: PlayerIcon): PlayerIcon =>
  player === "X" ? "O" : "X";

async function tictactoe() {
  const board: Board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let playerIcon = getCurrentPlayerIcon("O");
  do {
    const [xCoord, yCoord] = await setToken({
      board,
      icon: playerIcon,
    });

    board[yCoord][xCoord] = playerIcon;
    playerIcon = getCurrentPlayerIcon(playerIcon);
  } while (!isGameOver(board));

  console.log("Game Over!");
}

tictactoe();
