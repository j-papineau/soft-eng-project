import React, { FC, useCallback, useEffect, useState } from "react";
import { Board } from "./Board";
import { Timer } from "./Timer";
import {
  checkEndGame,
  claimTile,
  listToMatrix,
} from "../lib/GameLogic";
import { GameOverScreen } from "./GameOverScreen";
import { PlayerBox } from "./PlayerBox";
import {
  BaseTheme,
  BlueTheme,
  DarkTheme,
  GreenTheme,
  makeTheme,
} from "../lib/AbstractThemeFactory";
import { calculateBestMove } from "../lib/AI";
import { getColumn, getRow } from "../lib/utils";
import { GAME_STATUS } from "../constants";

interface GameScreenProps {}

const Themes = [BaseTheme, DarkTheme, BlueTheme, GreenTheme];
const gameLength = 30; // Seconds 10 by default set to 30 for testing
let columns = 3;
let rows = 3;
let target = 3;
type CPUDifficulty = "easy" | "hard";
export const GameScreen: FC<GameScreenProps> = () => {
  //this var is the temp var for the input spinner
  const [inputCols, setInputCols] = useState(3);
  const [inputRows, setInputRows] = useState(3);
  const [winCon, setWinCon] = useState(3);
  const [score, setScore] = useState([0, 0]);
  const [gameOver, setGameOver] = useState<number | undefined>(undefined);
  const [isPlayerOnesTurn, setIsPlayersOneTurn] = useState(true);
  const [timer, setTimer] = useState(Date.now() + gameLength * 1000);
  // const [cpuText, setCpuText] = useState("");
  const [game, setGame] = useState(
    Array.from({ length: rows * columns }, () => 0)
  );
  //cpu player check value def FALSE
  const [cpuPlayerOn, setCpuPlayerOn] = useState(false);
  const [cpuDifficulty, setCpuDifficulty] = useState<CPUDifficulty>("easy");

  //game handler funcs
  /*
    Function called when change game button is clicked
    changes game size to nxn where n is the input state var set by the spinner UI element
  */
  function changeCols(e: React.ChangeEvent) {
    e.preventDefault();
    console.log("cols: " + inputCols + " rows: " + rows);
    if (inputRows != 3) rows = inputRows;
    else rows = 3;
    if (inputCols != 3) columns = inputCols;
    else columns = 3;
    target = winCon;
    resetGame();
  }

  const resetGame = () => {
    setGame(Array.from({ length: rows * columns }, () => 0));
    console.log("new game matrix:");
    console.log(game);

    setGameOver(undefined);
    setIsPlayersOneTurn(true);
    setTimer(Date.now() + gameLength * 1000);
  };

  //this function handles the cpu move, currently makes a random move based on the current game state
  const makeCPUMove = useCallback(() => {
    //player;
    console.log("making cpu move");
    // console.log("current game state");
    //pick first available tile
    const tempGame = listToMatrix(game, columns);
    if (cpuDifficulty === "easy") {
      for (let i = 0; i < columns; i++) {
        for (let z = 0; z < rows; z++) {
          if (tempGame[i][z] == 0) {
            console.log("move at: " + i + ", " + z);
            setGame(
              claimTile({
                game,
                row: i,
                column: z,
                columns,
                playerOne: false,
              })
            );
          }
        }
      }
    } else {
      const move = calculateBestMove({
        game,
        target,
        rows,
        columns,
        player: -1,
      });
      if (move !== undefined)
        setGame(
          claimTile({
            game,
            row: getRow(move, columns),
            column: getColumn(move, columns),
            columns,
            playerOne: false,
          })
        );
    }
  }, [game, setGame, cpuDifficulty]);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const { row, column } = e.currentTarget.dataset;
    if (!row || !column) return;
    setGame(
      claimTile({
        game,
        row: parseInt(row),
        column: parseInt(column),
        columns,
        playerOne: isPlayerOnesTurn,
      })
    );
    setIsPlayersOneTurn((old) => !old);
    e.preventDefault();

    // //maybe put logic here to handle CPU player
    // if(isPlayerOnesTurn && cpuPlayerOn){
    //   makeCPUMove(1);
    //   setIsPlayersOneTurn(true);
    // }

    setTimer(Date.now() + gameLength * 1000);
  };

  //handles cpu moves, executes on game state change
  useEffect(() => {
    if (!isPlayerOnesTurn && cpuPlayerOn) {
      console.log("make cpu move");
      makeCPUMove();
      setIsPlayersOneTurn(true);
    }
  }, [isPlayerOnesTurn, cpuDifficulty, makeCPUMove, cpuPlayerOn]);

  useEffect(() => {
    const res = checkEndGame(game, columns, target)!;
    console.log("EndGame: ", res);
    if (gameOver === undefined && res !== GAME_STATUS.ACTIVE) {
      setGameOver(res);
      if (res === GAME_STATUS.TIE) {
        console.log("tie");
        return;
      }
      let p1 = score[0];
      let p2 = score[1];
      if (res > 0) p1 += 1;
      if (res < 0) p2 += 1;
      setScore([p1, p2]);
    }
  }, [game, gameOver, score, setScore]);
  const handleThemeChange = (e) => {
    const val = e.nativeEvent.target?.value;
    const Theme = Themes.find((t) => t.name === val);
    if (Theme) makeTheme(new Theme());
  };
  const themes = Themes.map((theme) => (
    <option key={theme.name} value={theme.name}>
      {theme.name}
    </option>
  ));
  const handleDifficultyChange = (e) => {
    const val = e.nativeEvent.target?.value;
    setCpuDifficulty(val);
  };
  const difficulties = ["easy", "hard"].map((diff) => (
    <option key={diff} value={diff}>
      {diff}
    </option>
  ));

  return (
    <div className="GameScreen w-full h-full text-base font-serif bg-base">
      <div className="flex h-32">
        <PlayerBox
          score={score[0]}
          player={1}
          isPlayersTurn={!gameOver && isPlayerOnesTurn}
        />
        <Timer endTime={timer} setGameOver={setGameOver} />
        <PlayerBox
          score={score[1]}
          player={2}
          isPlayersTurn={!gameOver && !isPlayerOnesTurn}
        />
      </div>
      {/* Input box for options box */}
      <div className="w-full flex flex-row border border-black">
        <div className="p-3">
          <h2 className="text-xl p-2 font-semibold">Change Game Size (mxn)</h2>
          <p className="italic">Rows must be greater than columns</p>
          <div className="flex flex-row">
            <div>
              <p>rows</p>
              <input
                className="border border-black m-4 rounded-md shadow-md bg-input text-input"
                min={3}
                type="number"
                defaultValue={3}
                onChange={(e) => {
                  setInputRows(parseInt(e.target.value));
                }}
              />
            </div>
            <div>
              <p>cols</p>
              <input
                className="border border-black m-4 rounded-md shadow-md  bg-input text-input"
                min={3}
                type="number"
                defaultValue={3}
                onChange={(e) => {
                  setInputCols(parseInt(e.target.value));
                }}
              />
            </div>
          </div>
          {/* <button className="border border-black m-4 p-2 rounded-md hover:bg-slate-400 shadow-md" onClick={changeCols}>Confirm Game Changes</button> */}
        </div>
        <div className="flex flex-col items-center p-2">
          <h2 className="text-xl p-2 font-semibold">Count needed to win:</h2>
          <input
            className="border border-black m-4 rounded-md shadow-md  bg-input text-input"
            type="number"
            min={3}
            defaultValue={3}
            onChange={(e) => {
              setWinCon(parseInt(e.target.value));
            }}
          />
          <button
            className="border border-black m-4 p-2 rounded-md hover:bg-slate-400 shadow-md bg-button text-button"
            onClick={(e) => {
              changeCols(e);
            }}
          >
            Confirm Game Changes
          </button>
        </div>
        <div className="flex flex-col items-center p-2">
          <h2 className="text-xl p-2 font-semibold">CPU Player (Player 2)</h2>
          <div className="grid items-center m-auto w-full">
            <div className="grid grid-cols-2">
              <label htmlFor="cpuPlayerOn">CPU</label>
              <input
                type="checkbox"
                className="shadow-md bg-input mx-auto text-input "
                onChange={(e) => {
                  setCpuPlayerOn(e.target.checked);
                }}
              />
            </div>
            <div className="grid grid-cols-2">
              <label htmlFor="cpuPlayerOn">Difficulty</label>
              <select
                className="shadow-md bg-input text-input"
                disabled={!cpuPlayerOn}
                onChange={handleDifficultyChange}
              >
                {difficulties}
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center p-2">
          <h2 className="text-xl p-2 font-semibold">Theme</h2>
          <div className="grid grid-cols-1 justify-center items-center m-auto">
            <select
              className="shadow-md bg-input text-input"
              onChange={handleThemeChange}
            >
              {themes}
            </select>
          </div>
        </div>

        <div></div>
      </div>
      <Board game={game} columns={columns} handleClick={handleClick} />
      <GameOverScreen gameOver={gameOver} resetGame={resetGame} />
    </div>
  );
};
