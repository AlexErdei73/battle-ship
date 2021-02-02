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
  start,
} from "./helper";

const game = new Game();
start(game);
const initialState = getState(game);
let gameResult = {};
let title = "BATTLESHIP";
let animationTarget = false;
let buttonNewGameActive = false;

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
    gameResult = {};
    animationTarget = true;
    setState(initialState);
    setTitleInView(false);
    setTimeout(() => {
      title = "BATTLESHIP";
      animationTarget = false;
      setTitleInView(true);
    }, 5000);
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
            disabled={true}
            areBoardCellsHidden={areBoardCellsHidden}
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
