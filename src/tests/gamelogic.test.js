import { describe, it, expect } from "vitest";
import { checkEndGame, checkDiagonal, checkVertical, checkHorizontal} from "../lib/GameLogic";
import { GameType } from "../lib/GameLogic";

//Joel's tests

describe('Joel End Game Tests', () => {
    let emptyBoard = [0,0,0,0,0,0,0,0,0];
    let player1Diag1 = [1,0,0,0,1,0,0,0,1];
    let player1Diag2 = [0,0,1,0,1,0,1,0,0];
    let player2Diag1 = [-1,1,0,0,-1,1,1,0,-1];
    let player2Diag2 = [1,0,-1,0,-1,1,-1,0,0];
    let player1Vert = [1,0,-1,1,-1,0,1,0,-1];
    let player2Vert = [-1,-1,1,1,-1,1,-1,-1,1];
    describe('checkDiagonal()', () => {
        it('should return correct game state value', () => {
            expect(checkDiagonal(emptyBoard, 3, 0, 0)).toBe(0);
            expect(checkDiagonal(player1Diag1, 3, 0, 0)).toBe(1);
            expect(checkDiagonal(player1Diag2, 3, 0, 0)).toBe(1);
            expect(checkDiagonal(player2Diag1, 3, 0, 0)).toBe(-1);
            expect(checkDiagonal(player2Diag2,3, 0, 0)).toBe(-1);

        })
    })
    describe('checkVertical()', () => {
        it('should return correct game state value', () => {
            expect(checkVertical(player1Vert, 3, 0, 0)).toBe(1);
            expect(checkVertical(player2Vert, 3, 0, 0)).toBe(-1);
            expect(checkVertical(emptyBoard, 3, 0, 0)).toBe(0);
        })
    })
    describe('checkHorizontal()', () => {
        it('should return correct game state value', () => {
            
        })
    })
})