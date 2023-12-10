import { FC } from "react";

interface PlayerBoxProps {
  score: number;
  player: number;
  isPlayersTurn: boolean;
}

export const PlayerBox: FC<PlayerBoxProps> = ({
  score,
  player,
  isPlayersTurn,
}) => {
  //const className = isPlayersTurn ? "PlayerBox active" : "PlayerBox";
  return (
    <div
      className={`PlayerBox flex-grow flex border-2 border-black items-center justify-center text-center p-1 ${
        isPlayersTurn && "bg-warning"
      }`}
    >
      <div className="justify-center text-base">
        <h4 className="text-3xl">Player: {player}</h4>
        <h6>Score: {score}</h6>
      </div>
    </div>
  );
};
