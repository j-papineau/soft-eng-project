import { getColumn, getRow, getTileIndex } from "./utils";

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
  const player = playerOne ? 1 : -1;
  const copy = [...game];
  copy[index] = player;
  return copy;
}

export function checkEndGame(game: GameType, columns: number, target: number) {
  const usedTiles = game.filter((g) => g !== 0).length;
  if (usedTiles === game.length) return 2;
  for (let i = 0; i < game.length; i++) {
    const res = checkTile(game, columns, i, target);
    if (res !== 0) return res;
  }
  return 0;
}
export function checkTile(
  game: GameType,
  columns: number,
  index: number,
  target: number
) {
  
  const horizontal = checkHorizontal(game, columns, index, target);
  if (horizontal !== 0) return horizontal;
  const vertical = checkVertical(game, columns, index, target);
  if (vertical !== 0) return vertical;
  const diagonal = checkDiagonal(game, columns, index, target);
  if (diagonal !== 0) return diagonal;
  return 0;
}
export function checkHorizontal(
  game: GameType,
  columns: number,
  index: number,
  target: number
) {

  let gameMatrix = listToMatrix(game, columns);
  
  // console.log(gameMatrix[0])

  for(let i = 0; i < columns; i++){
    let row = gameMatrix[i]
    if(checkRow(row, target) !== 0){
      return checkRow(row, target);
    }
  }

  return 0;
}

export function checkRow(row: number[], target: number){
  var lastVal = null;
  var count = 0;
  for(let i = 0; i < row.length; i++){
    if(row[i] != lastVal){
      lastVal = row[i];
      count = 0;
    }
    count += 1;
    if(target <= count){
      return lastVal;
    }
  }
  return 0;
}



export function checkVertical(
  game: GameType,
  columns: number,
  index: number,
  target: number
) {
  
  let gameMatrix = listToMatrix(game, columns);
  
  //check all cols using helper
  for(let i = 0; i < columns; i++){
    var col = getCol(gameMatrix, i);
    var checkColVal = checkCol(col, target);
    if(checkColVal !== 0){
      return checkColVal;
    }
  }

  return 0;
}

export function getCol(game: number[][], col: number){
  var column = [];
  for(let i = 0; i < game.length; i++){
    column.push(game[i][col]);
  }
  return column;
}

export function checkCol(col: number[], target: number){
  var lastVal = null;
  var count = 0;
  for(let i = 0; i < col.length; i++){
    if(col[i] != lastVal){
      lastVal = col[i];
      count = 0;
    }
    count += 1;
    if(target <= count){
      return lastVal;
    }
  }
  return 0;
}

export function checkDiagonal(
  game: GameType,
  columns: number,
  index: number,
  target: number
) {
  //for 3x3 game, win in horiz would be 0,4,8 or 2,4,6
  let gameMatrix = listToMatrix(game, columns);

  // console.log(checkLeftRightDiag(gameMatrix, columns));

  if(checkLeftRightDiag(gameMatrix, columns, target) != 0){
    return checkLeftRightDiag(gameMatrix, columns, target);
  }else if(checkRightLeftDiag(gameMatrix, columns, target) != 0){
    return checkRightLeftDiag(gameMatrix, columns, target);
  }
  return 0;
}

export function checkLeftRightDiag(matrix: number[][], cols: number, target: number){
  var diagAsArr = [];
  for(let i = 0; i < cols; i++){
    diagAsArr.push(matrix[i][i]);
  }

  return checkRow(diagAsArr, target);
}

export function checkRightLeftDiag(matrix: number[][], cols: number, target: number){
  var diagAsArr = []
  for(let i = 0; i < cols; i++){
      diagAsArr.push(matrix[i][cols - 1 - i]);
    }
  return checkRow(diagAsArr, target);
}

export function listToMatrix(
  game: GameType,
   elementsPerSubArray: number): number[][] {
  const matrix: number[][] = [];
  let i, k;

  for (i = 0, k = -1; i < game.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }

    matrix[k].push(game[i]);
  }

  return matrix;
}


