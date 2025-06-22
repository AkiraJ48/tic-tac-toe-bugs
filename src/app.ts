import { createBoard } from "./board";
import { welcomeMessage } from "./messages";
import { getPlayer, setToken } from "./prompts";

import { hasStraightLine, isDraw } from "./win";

type PlayerIcon = "X" | "O";
const getCurrentPlayerIcon = (player: PlayerIcon): PlayerIcon =>
  player === "X" ? "O" : "X";

type CurrentPlayer = "Player" | "Bot";

async function tictactoe() {
  welcomeMessage();

  const board = createBoard();
  const player = await getPlayer();

  

  if (player === "P1") {
    console.log("You will make the first move");
  } else {
    console.log("The computer will make the first move");
  }

  let currentPlayer: CurrentPlayer = player === "P1" ? "Player" : "Bot";
  let gameOver = false;
  let playerIcon = getCurrentPlayerIcon("O");
  do {
    if (currentPlayer === "Player") {
      const [xCoord, yCoord] = await setToken({
        board,
        icon: playerIcon,
      });

      board[yCoord][xCoord] = playerIcon;
    } else {
    }

    // @TODO: Make this return either player1 or player2
    // @TODO: Do more assetions so its not strange this is the only one....
    const winner = hasStraightLine(board) as string;
    if (winner) {
      console.log(`Winner is ${winner}`);
      gameOver = true;
      break;
    }

    if (isDraw(board)) {
      // @TODO: Then do a string function on winner
      console.log(`Its a draw! So ${winner} does not win!`);
      gameOver = true;
      break;
    }

    playerIcon = getCurrentPlayerIcon(playerIcon);
  } while (!gameOver);

  console.log("Game Over!");
}

tictactoe();
