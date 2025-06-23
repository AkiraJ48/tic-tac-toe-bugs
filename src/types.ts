export type CurrentPlayer = "Player" | "Bot";

export type GameStatus =
  | {
      status: "Win";
      type: string;
    }
  | { status: "Draw"; playAgain: string };

export type Player = {
  id: "1" | "2";
  type: "Human" | "Bot";
  token: "X" | "O";
  name: string;
};
