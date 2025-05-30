import { select } from "@inquirer/prompts";

export const setPlayerPrompt = async () => {
  const answer = await select({
    message: "Do you want to be Player 1 or Player 2",
    choices: [
      {
        name: "Player 1",
        value: "p1",
      },
      {
        name: "Player 2",
        value: "p2",
      },
    ],
  });
  return answer;
};
