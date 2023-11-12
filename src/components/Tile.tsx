import React, { FC } from "react";

interface TileProps {
  row: number;
  column: number;
  owner: number;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const Tile: FC<TileProps> = ({ row, column, owner, onClick }) => {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (owner !== 0) {
      console.error("invalid tile click");
      return;
    }
    onClick(e);
  };
  return (
    <div
      className="grid h-64 w-64 border-2 m-auto"
      data-row={row}
      data-column={column}
      onClick={handleClick}
    >
      <span className="text-8xl pt-16">
        {owner < 0 && "X"}
        {owner > 0 && "O"}
        {owner === 0 && " "}
      </span>
    </div>
  );
};
