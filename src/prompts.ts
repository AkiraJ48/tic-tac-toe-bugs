import colors from "yoctocolors-cjs";
import {
  createPrompt,
  isEnterKey,
  makeTheme,
  useKeypress,
  useState,
} from "@inquirer/core";
import { input, select } from "@inquirer/prompts";
import { Board } from "./board";

type SetTokenConfig = {
  board: Board;
  icon: string;
};

export type Player = {
  id: "1" | "2";
  type: "Human" | "Bot";
  token: "X" | "O";
  name: string;
};

export const playAgain = async () => {
  return select({
    message: "Would you like to play again",
    choices: [
      {
        name: "Yes",
        value: "true",
      },
      {
        name: "No",
        value: "false",
      },
    ],
  });
};

export const setupPlayers = async () => {
  const selectedPlayer = await select({
    message: "Select your player",
    choices: [
      {
        name: "Player 1",
        value: "P1" as const,
        description: "Player 1 has the first move and uses the token X",
      },
      {
        name: "Player 2",
        value: "P2" as const,
        description: "Player 2 has the second move and uses the token O",
      },
    ],
  });

  const name = await input({ message: "Please enter your name" });

  return {
    firstPlayer: {
      id: "1",
      type: selectedPlayer === "P1" ? "Human" : "Bot",
      token: "X",
      name: selectedPlayer === "P1" ? name : undefined,
    } as Player,
    secondPlayer: {
      id: "2",
      type: selectedPlayer === "P2" ? "Human" : "Bot",
      token: "O",
      name: selectedPlayer === "P2" ? name : undefined,
    } as Player,
  };
};

const setupDisplayCoord =
  (board: Board, cursor: string, playerIcon: string) =>
  (xCoord: number, yCoord: number) => {
    const permissibleTheme = makeTheme({ style: permissibleMove });
    const nonPermissibleTheme = makeTheme({ style: nonPermissibleMove });
    const existingPlayerIcon = board[yCoord][xCoord];
    const coordinate = `${xCoord},${yCoord}`;

    if (cursor === coordinate) {
      if (existingPlayerIcon) {
        return nonPermissibleTheme.style.highlight(existingPlayerIcon);
      }

      return permissibleTheme.style.highlight(playerIcon);
    }

    if (existingPlayerIcon) {
      return existingPlayerIcon;
    }

    if (board.length - 1 === yCoord) {
      return " ";
    }

    return "_";
  };

const setupIsPermissibleMove =
  (board: Board) => (xCoord: number, yCoord: number) => {
    const maxBoardLength = board.length;
    if (xCoord < 0 || yCoord < 0) {
      return false;
    }

    if (xCoord >= maxBoardLength || yCoord >= maxBoardLength) {
      return false;
    }

    return true;
  };

const nonPermissibleMove = { highlight: (text: string) => colors.red(text) };
const permissibleMove = { highlight: (text: string) => colors.cyan(text) };

export const choosePosition = createPrompt<[number, number], SetTokenConfig>(
  (config, done) => {
    const [xCoord, setXCoord] = useState(0);
    const [yCoord, setYCoord] = useState(0);
    const cursor = `${xCoord},${yCoord}`;

    const isPermissiblePlacement = !Boolean(config.board[yCoord][xCoord]);
    const isPermissibleMove = setupIsPermissibleMove(config.board);
    const displayCoord = setupDisplayCoord(config.board, cursor, config.icon);

    useKeypress((key, rl) => {
      rl.clearLine(0);

      if (isEnterKey(key) && isPermissiblePlacement) {
        done([xCoord, yCoord]);
      }

      switch (key.name) {
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
  }
);
