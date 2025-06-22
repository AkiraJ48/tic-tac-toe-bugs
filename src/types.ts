export type CurrentPlayer = "Player" | "Bot";

export type GameStatus =
  | {
      status: "Win";
      type: string;
    }
  | { status: "Draw"; playAgain: string };
