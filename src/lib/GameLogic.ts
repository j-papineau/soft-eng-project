import {
  GAME_STATUS,
  PLAYERS,
  PLAYER_NONE,
  PLAYER_ONE,
  PLAYER_TWO,
} from "../constants";
import { getColumn, getRow, getTileIndex } from "./utils";

export type GameMatrix = number[][];
export type GameType = number[];

export function claimTile({
  game,
  columns,
  playerOne,
  row,
  column,
}: {
  game: GameType;
  columns: number;
  playerOne: boolean;
  row: number;
  column: number;
}) {
  const index = getTileIndex(row, column, columns);
  const player = playerOne ? PLAYER_ONE : PLAYER_TWO;
  const copy = [...game];
  copy[index] = player;
  return copy;
}

export function checkEndGame(
  game: GameType,
  columns: number,
  target: number
): GAME_STATUS {
  const usedTiles = game.filter((g) => g !== PLAYER_NONE).length;
  for (let i = 0; i < game.length; i++) {
    const res = checkTile(game, columns, i, target);
    if (res !== 0) return res;
  }
  if (usedTiles === game.length) return GAME_STATUS.TIE;
  return 0;
}
export function checkTile(
  game: GameType,
  columns: number,
  index: number,
  target: number
): GAME_STATUS {
  if (game[index] === PLAYERS.PLAYER_NONE) return GAME_STATUS.ACTIVE;
  const gameMatrix = listToMatrix(game, columns);
  const row = getRow(index, columns);
  const column = getColumn(index, columns);
  const hz = checkHz(gameMatrix, row, column, target);
  if (hz !== PLAYERS.PLAYER_NONE) return hz;
  const vert = checkVert(gameMatrix, row, column, target);
  if (vert !== PLAYERS.PLAYER_NONE) return vert;
  const fwdDiag = checkFwdDiag(gameMatrix, row, column, target);
  if (fwdDiag !== PLAYERS.PLAYER_NONE) return fwdDiag;
  const bwdDiag = checkBwdDiag(gameMatrix, row, column, target);
  if (bwdDiag !== PLAYERS.PLAYER_NONE) return bwdDiag;
  return GAME_STATUS.ACTIVE;
}
function checkHz(
  gameMatrix: GameMatrix,
  row: number,
  column: number,
  target: number
) {
  const columns = gameMatrix[0].length;

  if (column + target - 1 > columns) return GAME_STATUS.ACTIVE;
  let value = gameMatrix[row][column];
  for (let i = 1; i < target; i++) {
    const next = gameMatrix[row][column + i];
    if (next !== value) value = 0;
  }

  return value;
}
function checkVert(
  gameMatrix: GameMatrix,
  row: number,
  column: number,
  target: number
) {
  const rows = gameMatrix.length - 1;
  if (row + target - 1 > rows) return GAME_STATUS.ACTIVE;
  let value = gameMatrix[row][column];
  for (let i = 1; i < target; i++) {
    if (value !== 0) {
      const next = gameMatrix[row + i][column];
      if (next !== value) value = 0;
    }
  }

  return value;
}
function checkFwdDiag(
  gameMatrix: GameMatrix,
  row: number,
  column: number,
  target: number
) {
  const columns = gameMatrix[0].length;
  if (column + target - 1 > columns - 1) return GAME_STATUS.ACTIVE;
  if (row + target - 1 > gameMatrix.length - 1) return GAME_STATUS.ACTIVE;

  let value = gameMatrix[row][column];
  for (let i = 1; i < target; i++) {
    if (value !== 0) {
      const next = gameMatrix[row + i][column + i];
      if (next !== value) value = 0;
    }
  }

  return value;
}
function checkBwdDiag(
  gameMatrix: GameMatrix,
  row: number,
  column: number,
  target: number
) {
  const rows = gameMatrix.length - 1;
  if (column < target - 1) return GAME_STATUS.ACTIVE;
  if (row + target - 1 > rows) return GAME_STATUS.ACTIVE;
  let value = gameMatrix[row][column];
  for (let i = 1; i < target; i++) {
    if (value !== 0) {
      const next = gameMatrix[row + i * 1][column - i * 1];
      if (next !== value) value = 0;
    }
  }

  return value;
}
export function listToMatrix(game: GameType, elementsPerSubArray: number) {
  const matrix: number[][] = [];
  let i: number, k: number;

  for (i = 0, k = -1; i < game.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }

    matrix[k].push(game[i]);
  }

  return matrix as GameMatrix;
}
