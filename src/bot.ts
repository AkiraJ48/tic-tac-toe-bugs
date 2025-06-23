import { Board, getEmptyCoords } from "./board";
import { NoEmptyCells } from "./errors";

export const pickRandomPosition = (board: Board): [number, number] => {
  const emptyCoordinates = getEmptyCoords(board);

  if (emptyCoordinates.length === 0) {
    throw new NoEmptyCells("No empty cells available");
  }

  const idx = Math.floor(Math.random() * emptyCoordinates.length);
  return emptyCoordinates[idx];
};
