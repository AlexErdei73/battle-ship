import Gameboard from "./gameboard";

//testing the placeShip(position, direction) method, the first ship is 5 pieces long
test("gameboard.placeShip({x: 1, y: 6}, 270) should be true", () => {
  expect(new Gameboard().placeShip({ x: 1, y: 6 }, 270)).toBe(true);
});

test("gameboard.placeShip({x: 1, y: 3}, 270) should be false", () => {
  expect(new Gameboard().placeShip({ x: 1, y: 3 }, 270)).toBe(false);
});

test("placeing another ship to a safe distace from the first one should give true", () => {
  const board = new Gameboard();
  board.placeShip({ x: 1, y: 6 }, 270);
  expect(board.placeShip({ x: 3, y: 6 }, 0)).toBe(true);
});

test("placeing another ship too close to the first one should give false", () => {
  const board = new Gameboard();
  board.placeShip({ x: 1, y: 6 }, 270);
  expect(board.placeShip({ x: 2, y: 7 }, 0)).toBe(false);
});

//testing the receiveAttack(position) function
test("if the attack is out of the gameboard the result should be false", () => {
  const board = new Gameboard();
  board.placeShip({ x: 1, y: 6 }, 270);
  expect(board.receiveAttack({ x: 0, y: 10 })).toBe(false);
});

test("if the attack missed the ship the result should be false", () => {
  const board = new Gameboard();
  board.placeShip({ x: 1, y: 6 }, 270);
  expect(board.receiveAttack({ x: 2, y: 5 })).toBe(false);
});

test("if the attack missed the ship the position of the missed shot should be recorded", () => {
  const board = new Gameboard();
  board.placeShip({ x: 1, y: 6 }, 270);
  board.receiveAttack({ x: 2, y: 5 });
  expect(board.missedShots[0]).toEqual({ x: 2, y: 5 });
});

test("if the attack hit the ship the result should be true", () => {
  const board = new Gameboard();
  board.placeShip({ x: 1, y: 6 }, 270);
  expect(board.receiveAttack({ x: 1, y: 5 })).toBe(true);
});

test("if the attack hit the ship the position of the shot should be recorded at the ship", () => {
  const board = new Gameboard();
  board.placeShip({ x: 1, y: 6 }, 270);
  board.receiveAttack({ x: 1, y: 5 });
  expect(board.ships[0].getDamages()).toEqual([{ x: 1, y: 5 }]);
});
