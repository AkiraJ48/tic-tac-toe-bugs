import { Board, createBoard } from "./board";
import { pickRandomPosition } from "./bot";
import { firstPlayerTurnMessage, welcomeMessage } from "./messages";
import { setupPlayers, choosePosition, Player, playAgain } from "./prompts";
import { GameStatus } from "./types";
import { getWinner } from "./win";

async function run() {
  welcomeMessage();

  const board = createBoard();
  const { firstPlayer, secondPlayer } = await setupPlayers();

  await tictactoe(board, firstPlayer, secondPlayer);
}

const tictactoe = async (
  board: Board,
  firstPlayer: Player,
  secondPlayer: Player
) => {
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

    const gameStatus = await getGameStatus(board, firstPlayer, secondPlayer);

    if (gameStatus?.status === "Win") {
      const message = `The ${gameStatus.type} has won! Well done ${currentPlayer.name.toLocaleUpperCase()}\n`;
      console.log(message);
      gameOver = true;
    }

    if (gameStatus?.status === "Draw") {
      console.log("The game is a draw!");
      gameOver = true;
    }

    currentPlayer = currentPlayer.id === "1" ? secondPlayer : firstPlayer;
  } while (!gameOver);

  console.log("Game Over!\n");
};

const getGameStatus = async (
  board: Board,
  firstPlayer: Player,
  secondPlayer: Player
): Promise<GameStatus | undefined> => {
  try {
    return getWinner(board, firstPlayer, secondPlayer);
  } catch (err) {
    const again = await playAgain();
    return { status: "Draw", playAgain: again };
  }
};

run();
