import "./App.css";
import Board from "./components/board";
import TitleBar from "./components/titlebar";
import { useState, useEffect } from "react";
import Game from "./game";
import {
  findIndex,
  getState,
  getPosition,
  getIndex,
  initialBoardCellsHidden,
  animateBoardCells,
  start,
} from "./helper";

const game = new Game();
start(game);
const initialState = getState(game);
let gameResult = {
  gameOver: true,
  winner: "",
};
let title = "BATTLESHIP";
let animationTarget = false;
let buttonNewGameActive = false;
const shipToMove = {};
const oldPosition = {};
const translation = {};
let isUserDraging = false;

function App() {
  const [state, setState] = useState(initialState);
  const [scores, setScores] = useState({
    player: 0,
    computer: 0,
  });
  const [isTitleInView, setTitleInView] = useState(false);

  const onClick = (event) => {
    const id = event.target.id;
    if (!id) return;
    const result = game.playerAttack(getPosition(id));
    gameResult = { ...result };
    if (result.gameOver) {
      const newScores = { ...scores };
      const winner = result.winner.name;
      newScores[winner] += 1;
      setScores(newScores);
      title = `GAME OVER, ${winner} won`;
      buttonNewGameActive = true;
    }
  };

  const handleClickNewGame = () => {
    buttonNewGameActive = false;
    start(game);
    gameResult = {
      gameOver: true,
      winner: "",
    };
    animationTarget = true;
    setState(initialState);
    setTitleInView(false);
    setTimeout(() => {
      title = "BATTLESHIP";
      animationTarget = false;
      setTitleInView(true);
    }, 5000);
  };

  const handleOnMouseDown = (event) => {
    const position = getPosition(Number(event.currentTarget.id));
    const ships = game.player.board.ships;
    const indexes = ships.map((ship) => {
      const positions = ship.getCoordinates();
      const index = findIndex(positions, position);
      return index;
    });
    const shipIndex = indexes.findIndex((index) => {
      return index !== -1;
    });
    if (shipIndex === -1) return;
    shipToMove.position = { ...ships[shipIndex].position };
    shipToMove.direction = ships[shipIndex].direction;
    shipToMove.length = ships[shipIndex].length;
    shipToMove.coordinates = ships[shipIndex].getCoordinates();
    oldPosition.x = position.x;
    oldPosition.y = position.y;
    ships.splice(shipIndex, 1);
    game.player.board.changeShipLengths(shipIndex);
    isUserDraging = true;
  };

  const handleOnMouseEnter = (event) => {
    if (!isUserDraging) return;
    const position = getPosition(Number(event.currentTarget.id));
    translation.x = position.x - oldPosition.x;
    translation.y = position.y - oldPosition.y;
    const newState = getState(game);
    const board = newState.playerBoard;
    shipToMove.coordinates.forEach((pos) => {
      const translated = {};
      translated.x = pos.x + translation.x;
      translated.y = pos.y + translation.y;
      const index = getIndex(translated);
      if (
        translated.x >= 0 &&
        translated.x < 10 &&
        translated.y >= 0 &&
        translated.y < 10
      )
        board[index] = "B";
    });
    setState(newState);
  };

  const handleOnMouseUp = (event) => {
    if (!isUserDraging) return;
    const board = game.player.board;
    console.log(board.ships.length);
    const newPosition = {};
    newPosition.x = shipToMove.position.x + translation.x;
    newPosition.y = shipToMove.position.y + translation.y;
    const success = board.placeShip(newPosition, shipToMove.direction);
    if (!success) board.placeShip(shipToMove.position, shipToMove.direction);
    const newState = getState(game);
    isUserDraging = false;
    console.log(board.ships.length);
    setState(newState);
  };

  game.setState = setState;

  //animation reveiling gameboard
  const [areBoardCellsHidden, setAreBoardCellsHidden] = useState(
    initialBoardCellsHidden()
  );

  useEffect(() => {
    if (areBoardCellsHidden.indexOf(!animationTarget) !== -1) {
      let newBoardCellsHidden = animateBoardCells(
        [...areBoardCellsHidden],
        animationTarget
      );
      newBoardCellsHidden = animateBoardCells(
        newBoardCellsHidden,
        animationTarget
      );
      setAreBoardCellsHidden(newBoardCellsHidden);
    }
  }, [areBoardCellsHidden, isTitleInView]);

  useEffect(() => {
    setTitleInView(true);
  }, []);

  return (
    <div>
      <TitleBar
        isTitleInView={isTitleInView}
        playerScore={scores.player}
        computerScore={scores.computer}
        text={title}
      />
      <div className="gameArea">
        <div className="boardContainer">
          <button
            className="gameControl"
            onClick={handleClickNewGame}
            disabled={!buttonNewGameActive}
          >
            New Game
          </button>
          <Board
            id="player"
            content={state.playerBoard}
            disabled={false}
            areBoardCellsHidden={areBoardCellsHidden}
            onMouseDown={handleOnMouseDown}
            onMouseEnter={handleOnMouseEnter}
            onMouseUp={handleOnMouseUp}
            onMouseLeave={handleOnMouseUp}
          />
        </div>
        <div className="boardContainer">
          <button className="gameControl">Reset</button>
          <Board
            id="computer"
            content={state.enemyBoard}
            disabled={gameResult.gameOver}
            onClick={onClick}
            areBoardCellsHidden={areBoardCellsHidden}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
