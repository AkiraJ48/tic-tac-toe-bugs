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

const isPermissiblePlacement = (
  board: Board,
  xCoord: number,
  yCoord: number
) => {
  return !Boolean(board[yCoord][xCoord]);
};

const nonPermissibleMove = { highlight: (text: string) => colors.red(text) };
const permissibleMove = { highlight: (text: string) => colors.cyan(text) };

export const setToken = createPrompt<[number, number], SetTokenConfig>(
  (config, done) => {
    const [xCoord, setXCoord] = useState(0);
    const [yCoord, setYCoord] = useState(0);
    const cursor = `${xCoord},${yCoord}`;

    const isPermisslbePlacement = isPermissiblePlacement(
      config.board,
      xCoord,
      yCoord
    );
    const isPermissibleMove = setupIsPermissibleMove(config.board);
    const displayCoord = setupDisplayCoord(config.board, cursor, config.icon);

    useKeypress((key, rl) => {
      rl.clearLine(0);

      if (isEnterKey(key) && isPermisslbePlacement) {
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
