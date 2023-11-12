import { expect, test } from "vitest";
import { createGame } from "./utils";

test("should create game with specified rows + columns", () => {
  const rows = 3;
  const columns = 3;
  const game = createGame(rows, columns);
  expect(game.length).toBe(rows * columns);
  game.forEach((t) => {
    expect(t).toBe(0);
  });
});
