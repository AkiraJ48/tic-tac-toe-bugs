import { Board } from "./board";
import { Player } from "./prompts";
import { GameStatus } from "./types";

const hasStraightLine = (board: Board, token: string) => {
  const size = board.length;

  // Check rows
  for (let i = 0; i < size; i++) {
    if (board[i].every((cell) => cell === token)) {
      return true;
    }
  }
  // Check columns
  for (let j = 0; j < size; j++) {
    if (board.every((row) => row[j] === token)) {
      return true;
    }
  }
  // Check main diagonal
  if (board.every((row, idx) => row[idx] === token)) {
    return true;
  }
  // Check anti-diagonal
  if (board.every((row, idx) => row[size - 1 - idx] === token)) {
    return true;
  }

  return false;
};

const hasHumanWon = (board: Board, humanToken: string) =>
  hasStraightLine(board, humanToken);

const hasBotWon = (board: Board, botToken: string) =>
  hasStraightLine(board, botToken);

const isDraw = (board: Board) =>
  board.every((column) => column.every((row) => Boolean(row)));

export const getWinner = async (
  board: Board,
  firstPlayer: Player,
  secondPlayer: Player
): Promise<GameStatus | undefined> => {
  const humanToken =
    firstPlayer.type === "Human" ? firstPlayer.token : secondPlayer.token;

  const botToken =
    firstPlayer.type === "Bot" ? firstPlayer.token : secondPlayer.token;

  if (hasHumanWon(board, humanToken)) {
    return { status: "Win", type: "Human" };
  } else if (hasBotWon(board, botToken)) {
    return { status: "Win", type: "Bot" };
  } else if (isDraw(board)) {
    throw new Error("Neither the human or bot has won");
  }
};
