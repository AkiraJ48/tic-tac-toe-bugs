export type Board = string[][];

export const createBoard = (): Board => [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

export const getEmptyCoords = (board: Board): [number, number][] => {
  const empty: [number, number][] = [];
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (!Boolean(board[y][x])) {
        empty.push([x, y]);
      }
    }
  }
  return empty;
};
