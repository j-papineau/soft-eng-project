import { FC, useEffect, useState } from "react";

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
  return <div className="Timer">Timer: {Math.floor(time / 1000)}</div>;
};
