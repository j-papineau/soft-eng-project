import { describe, it, expect } from "vitest";
import { calculateBestMove } from "./AI";

describe("AI Tests", () => {
  it("should find optimal move for simple game", () => {
    const rows = 3,
      columns = 3,
      target = 3;
    const game = [1, 1, 0, -1, 0, 0, 0, 0, 0];
    const game1 = [1, 1, 0, 0, -1, 0, 0, 0, 0];
    const game2 = [1, 1, 0, 0, 0, -1, 0, 0, 0];
    expect(calculateBestMove({ game, target, player: -1, rows, columns })).toBe(
      2
    );
    expect(
      calculateBestMove({ game: game1, target, player: -1, rows, columns })
    ).toBe(2);
    expect(
      calculateBestMove({ game: game2, target, player: -1, rows, columns })
    ).toBe(2);
    
  });
});
