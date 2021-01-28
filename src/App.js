import "./App.css";
import Board from "./components/board";
import TitleBar from "./components/titlebar";
import { useState } from "react";
import Game from "./game";
import { getState, getPosition } from "./helper";

const game = new Game();
game.placeShips(game.player.board, [
  { position: { x: 1, y: 2 }, direction: 90 },
  { position: { x: 4, y: 4 }, direction: 0 },
  { position: { x: 4, y: 9 }, direction: 0 },
  { position: { x: 4, y: 1 }, direction: 0 },
  { position: { x: 8, y: 7 }, direction: 90 },
  { position: { x: 5, y: 7 }, direction: 0 },
  { position: { x: 8, y: 1 }, direction: 0 },
]);
game.placeShipsRandom(game.computer.board);
const initialState = getState(game);
let gameOver = false;

const onClick = (event) => {
  const id = event.target.id;
  const result = game.playerAttack(getPosition(id));
  gameOver = result.gameOver;
};

function App() {
  const [state, setState] = useState(initialState);

  game.setState = setState;

  return (
    <div>
      <TitleBar />
      <div className="gameArea">
        <div className="boardContainer">
          <Board id="player" content={state.playerBoard} disabled={true} />
        </div>
        <div className="boardContainer">
          <Board
            id="computer"
            content={state.enemyBoard}
            disabled={gameOver}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
