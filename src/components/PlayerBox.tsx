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
  const className = isPlayersTurn ? "PlayerBox active" : "PlayerBox";
  return (
    <div className={className}>
      <h4 className="text-3xl">Player: {player}</h4>
      <h6>Score: {score}</h6>
    </div>
  );
};
