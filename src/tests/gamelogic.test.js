import { describe, it, expect } from "vitest";
import {
  checkEndGame,
  checkDiagonal,
  checkVertical,
  checkHorizontal,
} from "../lib/GameLogic";
import { GameType } from "../lib/GameLogic";

//Joel's tests

describe("Joel End Game Tests", () => {
  let emptyBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let player1Diag1 = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  let player1Diag2 = [0, 0, 1, 0, 1, 0, 1, 0, 0];
  let player2Diag1 = [-1, 1, 0, 0, -1, 1, 1, 0, -1];
  let player2Diag2 = [1, 0, -1, 0, -1, 1, -1, 0, 0];
  let player1Vert = [1, 0, -1, 1, -1, 0, 1, 0, -1];
  let player2Vert = [-1, -1, 1, 1, -1, -1, -1, -1, 1];
  describe("checkDiagonal()", () => {
    it("should return correct game state value", () => {
      expect(checkEndGame(emptyBoard, 3, 3)).toBe(0);
      expect(checkEndGame(player1Diag1, 3, 3)).toBe(1);
      expect(checkEndGame(player1Diag2, 3, 3)).toBe(1);
      expect(checkEndGame(player2Diag1, 3, 3)).toBe(-1);
      expect(checkEndGame(player2Diag2, 3, 3)).toBe(-1);
      expect(checkEndGame(player1Vert, 3, 3)).toBe(1);
      expect(checkEndGame(player2Vert, 3, 3)).toBe(-1);
    });
  });
});

