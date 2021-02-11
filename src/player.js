import { findIndex, addPositions, minus } from "./helper";

function Player() {
  this.name = "";
  this.enemy = {};
  this.board = {};

  const _hasBeenHitEnemyShip = (shot) => {
    const ships = this.enemy.board.ships;
    const areShipsHit = ships.map((ship) => {
      return !(findIndex(ship.getDamages(), shot) === -1);
    });
    return areShipsHit.indexOf(true) !== -1;
  };

  this.attack = (position) => {
    const missedShots = this.enemy.board.missedShots;
    let success = false;
    let hit = -1;
    if (findIndex(missedShots, position) !== -1) return { success, hit };
    else if (_hasBeenHitEnemyShip(position)) return { success, hit };
    else {
      hit = this.enemy.board.receiveAttack(position);
      success = true;
      return { success, hit };
    }
  };

  this.autoAttack = (positionFn) => {
    let attackResult = {};
    do {
      attackResult = this.attack(positionFn());
    } while (!attackResult.success);
    return attackResult;
  };

  let firstHit = { x: -1, y: -1 };
  let nextAttacks = [];
  let direction = { x: 0, y: 0 };

  this.autoAttackSmart = (positionFn) => {
    let attackResult = {};
    const board = this.enemy.board;
    let position;
    do {
      if (firstHit.x === -1 && firstHit.y === -1) position = positionFn();
      else position = nextAttacks.pop();
      if (
        board.isAttackTooCloseToSunkShips(position) ||
        !board.isPieceOnGameboard(position)
      ) {
        attackResult.success = false;
        attackResult.hit = -1;
      } else attackResult = this.attack(position);
    } while (!attackResult.success);
    if (attackResult.hit !== -1) {
      if (board.ships[attackResult.hit].isSunk()) {
        firstHit = { x: -1, y: -1 };
        nextAttacks = [];
        direction = { x: 0, y: 0 };
      } else if (firstHit.x === -1 && firstHit.y === -1) {
        firstHit = position;
        if (nextAttacks.length === 0) {
          nextAttacks.push(addPositions(firstHit, { x: 0, y: -1 }));
          nextAttacks.push(addPositions(firstHit, { x: -1, y: 0 }));
          nextAttacks.push(addPositions(firstHit, { x: 0, y: 1 }));
          nextAttacks.push(addPositions(firstHit, { x: 1, y: 0 }));
        }
      } else {
        if (direction.x === 0 && direction.y === 0) {
          direction = addPositions(position, minus(firstHit));
          nextAttacks = [
            addPositions(firstHit, minus(direction)),
            addPositions(position, direction),
          ];
        } else {
          nextAttacks.push(addPositions(position, direction));
        }
      }
    } else if (
      (firstHit.x !== -1 || firstHit.y !== -1) &&
      (direction.x !== 0 || direction.y !== 0)
    )
      direction = minus(direction);
    return attackResult;
  };
}

export default Player;
