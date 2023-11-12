import React, { FC, useEffect, useMemo, useState } from "react";
import { Board } from "./Board";
import { Timer } from "./Timer";
import { checkEndGame, claimTile, listToMatrix } from "../lib/GameLogic";
import { GameOverScreen } from "./GameOverScreen";
import { PlayerBox } from "./PlayerBox";

interface GameScreenProps {}

const gameLength = 30; // Seconds 10 by default set to 30 for testing
var columns = 3;
var rows = 3;
var target = 3;
export const GameScreen: FC<GameScreenProps> = (props) => {
  // const [columns, setColumns] = useState(3);
  // const [rows, setRows] = useState(3);
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

  //game handler funcs
  /*
    Function called when change game button is clicked
    changes game size to nxn where n is the input state var set by the spinner UI element
  */
  function changeCols(){
    rows = inputCols;
    columns = inputCols;
    target = winCon;
    resetGame();
  }

  const resetGame = () => {
    setGame(Array.from({ length: rows * columns }, () => 0));
    console.log("resetting game to size:" + rows);
    setGameOver(undefined);
    setIsPlayersOneTurn(true);
    setTimer(Date.now() + gameLength * 1000);
  };

  //this function handles the cpu move, currently makes a random move based on the current game state
  function makeCPUMove(player: number){
    console.log("making cpu move");
    // console.log("current game state");
    //pick first available tile
    let tempGame = listToMatrix(game, columns);
    
    for(let i = 0; i < columns; i++){
      for(let z = 0; z < rows; z++){
        if(tempGame[i][z] == 0){
          console.log("move at: " + i + ", " + z);
          setGame(
            claimTile({
              game,
              row: i,
              column: z,
              columns,
              playerOne: false
            })
          )
          return;
        }
      }
    }


  }

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
  if(!isPlayerOnesTurn && cpuPlayerOn){
    console.log("make cpu move")
    makeCPUMove(1);
    setIsPlayersOneTurn(true);

  }

}, [isPlayerOnesTurn])


  useEffect(() => {
    const res = checkEndGame(game, columns, target);
    console.log("EndGame: ", res);
    if (gameOver === undefined && res !== 0) {
      setGameOver(res);
      if (res === 2) {
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


  return (
    <div className="w-full h-full text-slate-700 font-serif">
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
      <div className="w-full h-32 flex flex-row border border-black">
        <div className="p-3">
          <h2 className="text-xl p-2 font-semibold">Change Game Size (mxn)</h2>
          <input className="border border-black m-4 rounded-md shadow-md" min={3} type="number" defaultValue={3} onChange={(e) => { setInputCols(parseInt(e.target.value)) }}/>
          {/* <input className="border border-black m-4 rounded-md shadow-md" min={3} type="number" defaultValue={3} onChange={(e) => { setInputCols(parseInt(e.target.value)) }}/> */}
          {/* <button className="border border-black m-4 p-2 rounded-md hover:bg-slate-400 shadow-md" onClick={changeCols}>Confirm Game Changes</button> */}
        </div>
        <div className="p-4">
          <h2 className="text-xl p-2 font-semibold">Count needed to win:</h2>
          <input className="border border-black m-4 rounded-md shadow-md" type="number" min={3} defaultValue={3} onChange={(e) => { setWinCon(parseInt(e.target.value))}} />
          <button className="border border-black m-4 p-2 rounded-md hover:bg-slate-400 shadow-md" onClick={changeCols}>Confirm Game Changes</button>
        </div>
        <div className="flex flex-col items-center p-2">
          <h2 className="text-xl p-2 font-semibold">CPU Player (Player 2)</h2>
          <input type="checkbox" className="shadow-md" onChange={(e) => {setCpuPlayerOn(e.target.checked)}}/>
        </div>
        <div>
          
        </div>
        
      </div>
      <Board game={game} columns={columns} handleClick={handleClick} />
      <GameOverScreen gameOver={gameOver} resetGame={resetGame} />
    </div>
  );
};
