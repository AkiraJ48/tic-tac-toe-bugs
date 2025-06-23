import { Board, createBoard } from "./board";
import { pickRandomPosition } from "./bot";
import { Draw } from "./errors";
import {
  drawMessage,
  firstPlayerTurnMessage,
  gameOverMessage,
  welcomeMessage,
  winningMessage,
} from "./messages";
import { setupPlayers, choosePosition, playAgain } from "./prompts";
import { GameStatus, Player } from "./types";
import { getWinner } from "./win";

async function run() {
  welcomeMessage();

  const board = createBoard();
  const { firstPlayer, secondPlayer } = await setupPlayers();

  const playAgain = await tictactoe(board, firstPlayer, secondPlayer);

  if (playAgain) {
    await run();
  }

  gameOverMessage();
}

const tictactoe = async (
  board: Board,
  firstPlayer: Player,
  secondPlayer: Player
) => {
  firstPlayerTurnMessage(firstPlayer.type === "Human");

  let playAgain;
  let currentPlayer = firstPlayer;
  let gameOver = false;

  do {
    switch (currentPlayer.type) {
      case "Human":
        // Human player gets to choose their own position
        const [xCoord, yCoord] = await choosePosition({
          board,
          icon: currentPlayer.token,
        });

        board[yCoord][xCoord] = currentPlayer.token;
        break;
      case "Bot":
        // Bot player will randomly select a position
        const [x, y] = pickRandomPosition(board);
        board[y][x] = currentPlayer.token;
        break;
    }

    // @TODO: print the board if the bot wins
    const gameStatus = await getGameStatus(board, firstPlayer, secondPlayer);

    if (gameStatus?.status === "Win") {
      winningMessage(gameStatus.type, currentPlayer.name);
      gameOver = true;
    }

    if (gameStatus?.status === "Draw") {
      drawMessage();
      playAgain = gameStatus.playAgain;
      gameOver = true;
    }

    currentPlayer = currentPlayer.id === "1" ? secondPlayer : firstPlayer;
  } while (!gameOver);

  return playAgain;
};

const getGameStatus = async (
  board: Board,
  firstPlayer: Player,
  secondPlayer: Player
): Promise<GameStatus | undefined> => {
  try {
    return getWinner(board, firstPlayer, secondPlayer);
  } catch (err) {
    if (err instanceof Draw) {
      const again = await playAgain();
      return { status: "Draw", playAgain: again };
    }

    throw err;
  }
};

run();
