export type Board = string[][];

export const createBoard = (): Board => [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const setupDisplayCoord = (board: Board) => (x: number, y: number) => {
  if (Boolean(board[y][x])) {
    return board[y][x];
  }

  if (board.length - 1 === y) {
    return " ";
  }

  return "_";
};


export const printFinalBoard = (board: Board) => {
  const displayCoord = setupDisplayCoord(board);
  console.log(`
    ${displayCoord(0, 0)}|${displayCoord(1, 0)}|${displayCoord(2, 0)}
    ${displayCoord(0, 1)}|${displayCoord(1, 1)}|${displayCoord(2, 1)}
    ${displayCoord(0, 2)}|${displayCoord(1, 2)}|${displayCoord(2, 2)}
  `);
};

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
