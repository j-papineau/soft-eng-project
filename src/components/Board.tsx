import React, { FC } from "react";
import { getColumn, getRow } from "../lib/utils";
import { Tile } from "./Tile";

interface BoardProps {
  game: number[];
  columns: number;
  handleClick: React.MouseEventHandler<HTMLDivElement>;
}

export const Board: FC<BoardProps> = ({ game, handleClick, columns }) => {
  const numberRows = game.length / columns;
  const rows = Array.from({ length: numberRows }, (_, i) =>
    game.slice(i * columns, (i + 1) * columns)
  );
  return (
    <div className="Board text-center bg-base">
      <div className="inline-flex flex-col">
        {rows.map((row, rowIndex) => (
          <div
            className="BoardRow grid grid-flow-col auto-cols-fr"
            key={`row-${rowIndex}`}
          >
            {row.map((val, index) => (
              <Tile
                key={rowIndex * columns + index}
                row={getRow(rowIndex * columns + index, columns)}
                column={getColumn(rowIndex * columns + index, columns)}
                owner={val}
                onClick={handleClick}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
