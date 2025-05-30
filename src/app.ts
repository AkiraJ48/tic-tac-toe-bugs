import { setPlayerPrompt } from "./prompts";

const isGameOver = (board: string[][]) => false;

async function tictactoe() {
  const player_1 = "X";
  const player_2 = "O";
  const board: string[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  setPlayerPrompt();

  do {} while (!isGameOver(board));

  console.log("Game Over!");
}

tictactoe();
