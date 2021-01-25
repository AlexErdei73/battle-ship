import { findIndex } from "./helper";

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
    let hit = false;
    if (findIndex(missedShots, position) !== -1) return { success, hit };
    else if (_hasBeenHitEnemyShip(position)) return { success, hit };
    else {
      hit = this.enemy.board.receiveAttack(position);
      success = true;
      return { success, hit };
    }
  };

  this.autoAttack = (positionFn) => {
    while (!this.attack(positionFn()).success);
  };
}

export default Player;
