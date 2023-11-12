export function getTileIndex(row: number, column: number, columns: number) {
  return row * columns + column;
}
export function getRow(index: number, columns: number) {
  return Math.floor(index / columns);
}
export function getColumn(index: number, columns: number) {
  return index % columns;
}
export function createGame(rows: number, columns: number) {
  return Array.from({ length: rows * columns }, () => 0);
}
