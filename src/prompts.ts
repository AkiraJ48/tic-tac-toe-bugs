import { select } from "@inquirer/prompts";
import colors from "yoctocolors-cjs";
import {
  createPrompt,
  isEnterKey,
  makeTheme,
  useKeypress,
  useState,
} from "@inquirer/core";
import { Board } from "./types";

type SetTokenConfig = {
  board: Board;
  icon: string;
};

const setupDisplayCoord =
  (board: Board, cursor: string, icon: string) =>
  (xCoord: number, yCoord: number) => {
    if (board[yCoord][xCoord]) {
      return board[yCoord][xCoord];
    }

    const coord = `${xCoord},${yCoord}`;

    if (cursor === coord) {
      return icon;
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

export const setToken = createPrompt<[number, number], SetTokenConfig>(
  (config, done) => {
    const theme = makeTheme({
      style: { highlight: (text: string) => colors.cyan(text) },
    });
    const [xCoord, setXCoord] = useState(0);
    const [yCoord, setYCoord] = useState(0);
    const cursor = `${xCoord},${yCoord}`;

    const isPermissibleMove = setupIsPermissibleMove(
      config.board,
      config.board.length
    );

    const displayCoord = setupDisplayCoord(
      config.board,
      cursor,
      theme.style.highlight(config.icon)
    );

    useKeypress((key, rl) => {
      rl.clearLine(0);

      if (isEnterKey(key)) {
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
