import { selectPlayer, setToken } from "./prompts";
import { Board } from "./types";

const isGameOver = (board: Board) => true;

async function tictactoe() {
  const board: Board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const player = await selectPlayer();
  setToken({ board });

  do {
    break;
  } while (!isGameOver(board));

  console.log("Game Over!");
}

tictactoe();
