import React, { FC, useEffect, useState } from "react";

interface TimerProps {
  endTime: number;
  setGameOver: (res: number) => void;
}

export const Timer: FC<TimerProps> = ({ endTime, setGameOver }) => {
  const [time, setTime] = useState(endTime - Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      const timeRemaining = endTime - Date.now();
      if (timeRemaining <= 0) {
        setGameOver(3);
        setTime(0);
        return;
      }
      setTime(endTime - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime, setGameOver]);
  return (
    <div className="flex-grow flex border-2 border-black  items-center justify-center text-center px-2 py-4">
      <div className="justify-center">
        <h4 className="text-xl">Timer: {Math.floor(time / 1000)}</h4>
      </div>
    </div>
  );
};
