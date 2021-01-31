import "./App.css";
import Board from "./components/board";
import TitleBar from "./components/titlebar";
import { useState, useEffect } from "react";
import Game from "./game";
import {
  getState,
  getPosition,
  initialBoardCellsHidden,
  animateBoardCells,
} from "./helper";

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
  if (!id) return;
  const result = game.playerAttack(getPosition(id));
  gameOver = result.gameOver;
};

function App() {
  const [state, setState] = useState(initialState);

  game.setState = setState;

  //animation reveiling gameboard
  const [areBoardCellsHidden, setAreBoardCellsHidden] = useState(
    initialBoardCellsHidden()
  );

  useEffect(() => {
    if (areBoardCellsHidden.indexOf(true) !== -1) {
      let newBoardCellsHidden = animateBoardCells([...areBoardCellsHidden]);
      for (let i = 0; i < 3; i++) {
        newBoardCellsHidden = animateBoardCells(newBoardCellsHidden);
      }
      setAreBoardCellsHidden(newBoardCellsHidden);
    }
  }, [areBoardCellsHidden]);

  return (
    <div>
      <TitleBar />
      <div className="gameArea">
        <div className="boardContainer">
          <Board
            id="player"
            content={state.playerBoard}
            disabled={true}
            areBoardCellsHidden={areBoardCellsHidden}
          />
        </div>
        <div className="boardContainer">
          <Board
            id="computer"
            content={state.enemyBoard}
            disabled={gameOver}
            onClick={onClick}
            areBoardCellsHidden={areBoardCellsHidden}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
