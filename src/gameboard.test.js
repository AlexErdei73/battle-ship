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
