export const findIndex = (array, pos) => {
  return array.findIndex(function (element) {
    return element.x === pos.x && element.y === pos.y;
  });
};

export function randomPosition() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  return { x, y };
}

export function randomDirection() {
  return 90 * Math.floor(Math.random() * 4);
}

function getIndex(position) {
  const x = position.x;
  const y = position.y;
  return 10 * (9 - y) + x;
}

export function getPosition(index) {
  const y = 9 - Math.floor(index / 10);
  const x = index % 10;
  return { x, y };
}

function getBoard(board, showShips) {
  const gameboard = [];
  for (let i = 0; i < 100; i++) {
    gameboard.push(" ");
  }
  board.missedShots.forEach((position) => {
    const index = getIndex(position);
    gameboard[index] = "/";
  });
  board.ships.forEach((ship) => {
    if (ship.isSunk()) {
      ship.getCoordinates().forEach((position) => {
        const index = getIndex(position);
        gameboard[index] = "S";
      });
    } else {
      if (showShips) {
        ship.getCoordinates().forEach((position) => {
          const index = getIndex(position);
          gameboard[index] = "B";
        });
      }
      ship.getDamages().forEach((position) => {
        const index = getIndex(position);
        gameboard[index] = "X";
      });
    }
  });
  return gameboard;
}

export function getState(game) {
  const playerBoard = getBoard(game.player.board, true);
  const enemyBoard = getBoard(game.computer.board, false);
  return { playerBoard, enemyBoard };
}

//animation reveiling gameboard
export function initialBoardCellsHidden() {
  const initialBoardCellsHidden = [];
  for (let i = 0; i < 100; i++) {
    initialBoardCellsHidden.push(true);
  }
  return initialBoardCellsHidden;
}

export function animateBoardCells(areBoardCellsHidden) {
  console.log("animating...");
  if (areBoardCellsHidden.indexOf(true) === -1) return areBoardCellsHidden;
  else {
    let index;
    do {
      index = getIndex(randomPosition());
    } while (areBoardCellsHidden[index] !== true);
    areBoardCellsHidden[index] = false;
    return areBoardCellsHidden;
  }
}
