import { select } from "@inquirer/prompts";
import {
  createPrompt,
  isEnterKey,
  useKeypress,
  useState,
} from "@inquirer/core";
import { Board } from "./types";

type Player = "p1" | "p2";

export const selectPlayer = async (): Promise<Player> => {
  const answer = await select({
    message: "Do you want to be Player 1 or Player 2",
    choices: [
      {
        name: "Player 1",
        value: "p1" as const,
      },
      {
        name: "Player 2",
        value: "p2" as const,
      },
    ],
  });

  return answer;
};

type SetTokenConfig = {
  board: Board;
};

const setupDisplayCoord =
  (board: Board, cursor: string) => (xCoord: number, yCoord: number) => {
    if (board[yCoord][xCoord]) {
      return board[yCoord][xCoord];
    }

    const coord = `${xCoord},${yCoord}`;

    if (cursor === coord) {
      return "X";
    }

    if (board.length - 1 === yCoord) {
      return " ";
    }

    return "_";
  };

const setupIsPermissibleMove =
  (board: Board, maxBoardLength: number) =>
  (xCoord: number, yCoord: number) => {
    if (xCoord < 0 || yCoord < 0) {
      return false;
    }

    if (xCoord >= maxBoardLength || yCoord >= maxBoardLength) {
      return false;
    }

    if (board[yCoord][xCoord]) {
      return false;
    }

    return true;
  };

export const setToken = createPrompt<Board, SetTokenConfig>((config, done) => {
  const [xCoord, setXCoord] = useState(0);
  const [yCoord, setYCoord] = useState(0);
  const cursor = `${xCoord},${yCoord}`;

  const isPermissibleMove = setupIsPermissibleMove(
    config.board,
    config.board.length
  );

  const displayCoord = setupDisplayCoord(config.board, cursor);

  useKeypress((key, rl) => {
    rl.clearLine(0);

    switch (key.name) {
      case "enter":
        done(config.board);
        break;
      case "left":
        if (isPermissibleMove(xCoord - 1, yCoord)) {
          setXCoord(xCoord - 1);
        }
        break;
      case "right":
        if (isPermissibleMove(xCoord + 1, yCoord)) {
          setXCoord(xCoord + 1);
        }
        break;
      case "up":
        if (isPermissibleMove(xCoord, yCoord - 1)) {
          setYCoord(yCoord - 1);
        }
        break;
      case "down":
        if (isPermissibleMove(xCoord, yCoord + 1)) {
          setYCoord(yCoord + 1);
        }
        break;
    }
  });

  return `
    ${displayCoord(0, 0)}|${displayCoord(1, 0)}|${displayCoord(2, 0)}
    ${displayCoord(0, 1)}|${displayCoord(1, 1)}|${displayCoord(2, 1)}
    ${displayCoord(0, 2)}|${displayCoord(1, 2)}|${displayCoord(2, 2)}
  `;
});
