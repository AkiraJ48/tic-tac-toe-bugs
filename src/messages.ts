export const welcomeMessage = () => console.log("Welcome to Tic Tac Toe...\n");

export const firstPlayerTurnMessage = (isFirstPlayer: boolean) => {
  const message = isFirstPlayer
    ? "You will make the first move with the token X"
    : "The computer will make the first move with the token X";

  console.log(`${message}\n`);
};

export const winningMessage = (type: string, name: string) => {
  const message = `The ${type} has won! Well done ${name.toLocaleLowerCase()}!\n`;
  console.log(message);
};

export const drawMessage = () => {
  console.log("The game is a draw!\n");
};

export const gameOverMessage = () => {
  console.log("Game Over!\n");
};
