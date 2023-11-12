import { expect, test } from "vitest";
import { checkEndGame } from "./GameLogic";
import { createGame } from "./utils";

test("Should test victory conditions", () => {
  const game = createGame(3, 3);
  const columns = 3;
  const target = 3;
  expect(checkEndGame(game, columns, target));
});
