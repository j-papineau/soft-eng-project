import React, { FC } from "react";
import { PLAYER_NONE, PLAYER_ONE, PLAYER_TWO } from "../constants";

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
      className="Tile grid h-64 w-64 border-2 m-auto bg-tile"
      data-row={row}
      data-column={column}
      onClick={handleClick}
    >
      <span
        className={`text-8xl pt-16 ${owner == PLAYER_ONE ? "text-o" : ""} ${
          owner === PLAYER_TWO ? "text-x" : ""
        }`}
      >
        {owner === PLAYER_ONE ? "O" : ""}
        {owner === PLAYER_TWO ? "X" : ""}
        {owner === PLAYER_NONE ? " " : ""}
      </span>
    </div>
  );
};
