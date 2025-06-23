export class Draw extends Error {
  constructor(message: string = "Draw!") {
    super(message);
    this.name = "Draw";
  }
}

export class NoEmptyCells extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NoEmptyCellsError";
  }
}
