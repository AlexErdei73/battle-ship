import Ship from "./ship";

function Gameboard() {
  this.ships = [];
  const _shipLengths = [5, 4, 3, 2, 2, 1, 1];

  const _isPieceOnGameboard = (position) => {
    const { x, y } = { ...position };
    return x >= 0 && x < 9 && y >= 0 && y < 10;
  };

  const _isShipOnGameboard = (ship) => {
    const arePiecesOnGameboard = ship
      .getCoordinates()
      .map((position) => _isPieceOnGameboard(position));
    if (arePiecesOnGameboard.indexOf(false) === -1) return true;
    else return false;
  };

  const _minimum = (array) => {
    return array.reduce((min, number) => {
      if (number < min) return number;
      else return min;
    }, array[0]);
  };

  const _distanceFromPiece = (position, ship) => {
    const { x, y } = { ...position };
    const distanceSquares = ship
      .getCoordinates()
      .map((pos) => (x - pos.x) ** 2 + (y - pos.y) ** 2);
    return Math.sqrt(_minimum(distanceSquares));
  };

  const _distance = (ship1, ship2) => {
    const distances = ship1
      .getCoordinates()
      .map((pos) => _distanceFromPiece(pos, ship2));
    return _minimum(distances);
  };

  const _minimumDistance = (ship1, ships) => {
    const distances = ships.map((ship2) => _distance(ship1, ship2));
    return _minimum(distances);
  };

  this.placeShip = (position, direction) => {
    const shipLength = _shipLengths[this.ships.length];
    const ship = new Ship(position, direction, shipLength);
    const isShipOnGameboard = _isShipOnGameboard(ship);
    const isDistanceSafe =
      _minimumDistance(ship, this.ships) >= 2 || this.ships.length === 0;
    const success = isShipOnGameboard && isDistanceSafe;
    if (success) this.ships.push(ship);
    return success;
  };
}

export default Gameboard;
