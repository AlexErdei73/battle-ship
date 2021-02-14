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
    if (!position) return { success, hit };
    if (findIndex(missedShots, position) !== -1) return { success, hit };
    else if (_hasBeenHitEnemyShip(position)) return { success, hit };
    else {
      hit = this.enemy.board.receiveAttack(position);
      success = this.enemy.board.isPieceOnGameboard(position);
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

  const isEqual = (pos1, pos2) => pos1.x === pos2.x && pos1.y === pos2.y;

  this.autoAttackSmart = (positionFn) => {
    let attackResult = {};
    const board = this.enemy.board;
    let position;
    do {
      if (isEqual(firstHit, { x: -1, y: -1 })) position = positionFn();
      else position = nextAttacks.pop();
      if (board.isAttackTooCloseToSunkShips(position)) {
        attackResult.success = false;
        attackResult.hit = -1;
      } else attackResult = this.attack(position);
      if (!attackResult.success && !isEqual(direction, { x: 0, y: 0 }))
        direction = minus(direction);
    } while (!attackResult.success);
    if (attackResult.hit !== -1) {
      if (board.ships[attackResult.hit].isSunk()) {
        firstHit = { x: -1, y: -1 };
        nextAttacks = [];
        direction = { x: 0, y: 0 };
      } else if (isEqual(firstHit, { x: -1, y: -1 })) {
        firstHit = position;
        if (nextAttacks.length === 0) {
          nextAttacks.push(addPositions(firstHit, { x: 0, y: -1 }));
          nextAttacks.push(addPositions(firstHit, { x: -1, y: 0 }));
          nextAttacks.push(addPositions(firstHit, { x: 0, y: 1 }));
          nextAttacks.push(addPositions(firstHit, { x: 1, y: 0 }));
        }
      } else {
        if (isEqual(direction, { x: 0, y: 0 })) {
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
      !isEqual(firstHit, { x: -1, y: -1 }) &&
      !isEqual(direction, { x: 0, y: 0 })
    ) {
      direction = minus(direction);
    }
    return attackResult;
  };
}

export default Player;
