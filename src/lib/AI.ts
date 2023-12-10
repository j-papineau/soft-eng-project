import { GameType, listToMatrix } from "./GameLogic";
import { getColumn, getRow } from "./utils";

function findEmptyCells(game: number[]) {
  return game
    .map((tile, index) => (tile === 0 ? index : undefined))
    .filter((tile) => tile !== undefined) as number[];
}
const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
export function calculateBestMove({
  game,
  player,
  rows,
  target,
  columns,
}: {
  game: number[];
  player: number;
  target: number;
  rows: number;
  columns: number;
}) {
  const available = findEmptyCells(game);
  if (available.length === 0) return;
  const gameMatrix = listToMatrix(game, columns);
  const scores = available.map((index) => {
    const row = getRow(index, columns);
    const column = getColumn(index, columns);
    const score = directions.reduce((acc, [dx, dy]) => {
      let k = 1;
      while (k > 0 && k < target - 0) {
        const i = row + dx * k;
        const j = column + dy * k;
        if (i < 0 || i >= rows - 1 || j < 0 || j > columns - 1) {
          k = -1;
          return acc;
        }
        const tile = gameMatrix[i][j];
        if (tile === player) {
          k = -1;
          return acc;
        } else if (tile === 0) {
          k = -1;
        } else if (tile === player * -1) {
          acc += k ** 2;
        }
        k++;
      }
      return acc;
    }, 0);
    //console.log({ index, row, column, score });
    return { index, score };
  });
  return scores.sort((a, b) => b.score - a.score)[0].index;
}
