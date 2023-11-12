import { FC } from "react";

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
        <div className="bg-white w-128 h-32 m-auto px-12 py-5 text-2xl text-center">
          {gameOver === 3 && <div>Time Over</div>}
          {gameOver === 2 && <div>Tie</div>}
          {(gameOver === -1 || gameOver === 1) && (
            <div>Winner: Player {(gameOver === 1) ? ("1") : ("2")}</div>
          )}
          <button className="border px-6 py-2 bg-blue-200" onClick={resetGame}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};
