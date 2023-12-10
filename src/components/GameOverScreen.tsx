import  { FC } from "react";
import { GAME_STATUS, PLAYER_TWO } from "../constants";

interface GameOverScreenProps {
  gameOver?: number;
  resetGame: () => void;
}

export const GameOverScreen: FC<GameOverScreenProps> = ({
  gameOver,
  resetGame,
}) => {
  return gameOver === undefined ? null : (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-red-600/25">
      <div className="relative w-full h-full flex items-center">
        <div className="bg-modal w-128 h-32 m-auto px-12 py-5 text-2xl text-center">
          {gameOver === GAME_STATUS.TIME_OVER && <div>Time Over</div>}
          {gameOver === GAME_STATUS.TIE && <div>Tie</div>}
          {(gameOver === GAME_STATUS.PLAYER_ONE || gameOver === PLAYER_TWO) && (
            <div>
              Winner: Player {gameOver === GAME_STATUS.PLAYER_ONE ? "1" : "2"}
            </div>
          )}
          <button
            className="border px-6 py-2 bg-button text-button"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};
