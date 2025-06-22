import { createBoard } from "./board";
import { pickRandomPosition } from "./bot";
import { firstPlayerTurnMessage, welcomeMessage } from "./messages";
import { setupPlayers, choosePosition, Player } from "./prompts";

import { hasStraightLine, isDraw } from "./win";

async function tictactoe() {
  welcomeMessage();

  const board = createBoard();
  const { firstPlayer, secondPlayer } = await setupPlayers();

  firstPlayerTurnMessage(firstPlayer.type === "Human");

  let currentPlayer = firstPlayer;
  let gameOver = false;

  do {
    switch (currentPlayer.type) {
      case "Human":
        const [xCoord, yCoord] = await choosePosition({
          board,
          icon: currentPlayer.token,
        });

        board[yCoord][xCoord] = currentPlayer.token;
        break;
      case "Bot":
        const [x, y] = pickRandomPosition(board);
        board[y][x] = currentPlayer.token;
        break;
    }

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

    currentPlayer = currentPlayer.id === "1" ? secondPlayer : firstPlayer;
  } while (!gameOver);

  console.log("Game Over!");
}

tictactoe();
