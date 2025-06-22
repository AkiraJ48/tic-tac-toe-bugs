import { createBoard } from "./board";
import { pickRandomPosition } from "./bot";
import { firstPlayerTurnMessage, welcomeMessage } from "./messages";
import { setupPlayers, choosePosition } from "./prompts";
import { getWinner } from "./win";

async function tictactoe() {
  welcomeMessage();

  const board = createBoard();
  const { firstPlayer, secondPlayer } = await setupPlayers();

  firstPlayerTurnMessage(firstPlayer.type === "Human");

  let currentPlayer = firstPlayer;
  let gameOver = false;

  try {
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

      const winner = getWinner(board, firstPlayer, secondPlayer);

      if (winner) {
        const message = `The ${winner} has won! Well done ${currentPlayer.name.toLocaleUpperCase()}`;
        console.log(message);
        gameOver = true;
      }

      currentPlayer = currentPlayer.id === "1" ? secondPlayer : firstPlayer;
    } while (!gameOver);
  } catch (err) {
    // do something async here but return it
  }

  console.log("Game Over!");
}

tictactoe();
