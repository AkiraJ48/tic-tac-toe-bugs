// Returns a random element from a non-empty array
export const pickRandom = <T>(arr: T[]): T => {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
};
