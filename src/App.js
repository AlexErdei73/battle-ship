import "./App.css";
import Board from "./components/board";
import TitleBar from "./components/titlebar";
import { useState, useEffect } from "react";
import Game from "./game";
import {
  getState,
  getPosition,
  getIndex,
  initialBoardCellsHidden,
  animateBoardCells,
  start,
  getShipIndex,
  addPositions,
  minus,
  deleteShip,
} from "./helper";

let game = new Game();
start(game);
const initialState = getState(game);
let gameResult = {
  gameOver: true,
  winner: "",
};
let title = "BATTLESHIP";
let animationTarget = false;
let buttonNewGameActive = true;
const shipToMove = {};
let oldPosition;
let translation;
let isUserDraging = false;

function App() {
  const [state, setState] = useState(initialState);
  const [scores, setScores] = useState({
    player: 0,
    computer: 0,
  });
  const [isTitleInView, setTitleInView] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);

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
      title = `GAME OVER, ${winner.toUpperCase()} WON`;
      buttonNewGameActive = true;
    }
  };

  const handleClickNewGame = () => {
    if (isGameStarted) {
      buttonNewGameActive = false;
      game = new Game();
      start(game);
      gameResult = {
        gameOver: true,
        winner: "",
      };
      animationTarget = true;
      setTitleInView(false);
      setTimeout(() => {
        title = "BATTLESHIP";
        animationTarget = false;
        buttonNewGameActive = true;
        setState(initialState);
        setTitleInView(true);
        setGameStarted(false);
      }, 4000);
    } else {
      buttonNewGameActive = false;
      gameResult.gameOver = false;
      setGameStarted(true);
    }
  };

  const handleOnMouseDown = (event) => {
    const position = getPosition(Number(event.currentTarget.id));
    const board = game.player.board;
    const ships = board.ships;
    const shipIndex = getShipIndex(board, position);
    if (shipIndex === -1) return;
    const ship = ships[shipIndex];
    shipToMove.position = { ...ship.position };
    shipToMove.direction = ship.direction;
    shipToMove.length = ship.length;
    shipToMove.coordinates = ship.getCoordinates();
    oldPosition = { ...position };
    deleteShip(board, shipIndex);
    isUserDraging = true;
  };

  const handleOnMouseEnter = (event) => {
    if (!isUserDraging) return;
    const position = getPosition(Number(event.currentTarget.id));
    translation = addPositions(position, minus(oldPosition));
    const newState = getState(game);
    const board = newState.playerBoard;
    shipToMove.coordinates.forEach((pos) => {
      const translated = addPositions(pos, translation);
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
    const newPosition = addPositions(shipToMove.position, translation);
    const success = board.placeShip(newPosition, shipToMove.direction);
    if (!success) board.placeShip(shipToMove.position, shipToMove.direction);
    isUserDraging = false;
    setState(getState(game));
  };

  const handleDoubleClick = (event) => {
    const position = getPosition(Number(event.currentTarget.id));
    const board = game.player.board;
    const ships = board.ships;
    const shipIndex = getShipIndex(board, position);
    if (shipIndex === -1) return;
    const ship = ships[shipIndex];
    const oldDirection = ship.direction;
    const oldPosition = ship.position;
    const newDirection = (oldDirection + 90) % 360;
    deleteShip(board, shipIndex);
    const success = board.placeShip(oldPosition, newDirection);
    if (!success) board.placeShip(oldPosition, oldDirection);
    setState(getState(game));
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
            {isGameStarted ? "New Game" : "Start"}
          </button>
          <Board
            id="player"
            content={state.playerBoard}
            disabled={isGameStarted}
            areBoardCellsHidden={areBoardCellsHidden}
            onMouseDown={handleOnMouseDown}
            onMouseEnter={handleOnMouseEnter}
            onMouseUp={handleOnMouseUp}
            onMouseLeave={handleOnMouseUp}
            onDoubleClick={handleDoubleClick}
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
