import { CurrentPlayer } from "./types";

export const welcomeMessage = () => console.log("Welcome to Tic Tac Toe...\n");

export const firstPlayerTurnMessage = (isFirstPlayer: boolean) => {
  const message = isFirstPlayer
    ? "You will make the first move"
    : "The computer will make the first move";

  console.log(`${message}\n`);
};
