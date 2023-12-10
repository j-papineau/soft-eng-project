import "./index.css";
//import "./App.css";
//import "./Game.css";
import { GameScreen } from "./components/GameScreen";

function App() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold p-3 text-center underline">
        TicTacToe
      </h1>
      <GameScreen />
    </div>
  );
}

export default App;
