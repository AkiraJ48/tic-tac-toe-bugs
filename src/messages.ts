export const welcomeMessage = () => console.log("Welcome to Tic Tac Toe...\n");

export const firstPlayerTurnMessage = (isFirstPlayer: boolean) => {
  const message = isFirstPlayer
    ? "You will make the first move"
    : "The computer will make the first move";

  console.log(`${message}\n`);
};

export const winningMessage = (type: string, name: string) => {
  const message = `The ${type} has won! Well done ${name.toLocaleUpperCase()}\n`;
  console.log(message);
};

export const drawMessage = () => {
  console.log("The game is a draw!\n");
};

export const gameOverMessage = () => {
  console.log("Game Over!\n");
};
