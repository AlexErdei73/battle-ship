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
    if (findIndex(missedShots, position) !== -1) return false;
    else if (_hasBeenHitEnemyShip(position)) return false;
    else {
      this.enemy.board.receiveAttack(position);
      return true;
    }
  };

  this.autoAttack = (positionFn) => {
    while (!this.attack(positionFn()));
  };
}

export default Player;
