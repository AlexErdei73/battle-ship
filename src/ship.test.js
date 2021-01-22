import Ship from "./ship";

//Testing the Ship object
test("Ship(position, direction, length) is a constructor function", () => {
  expect(typeof new Ship({ x: 1, y: 2 }, 0, 4) === "object").toBeTruthy();
});

//Basic properties
test("new Ship({x: 1, y: 2}, 0, 4).position is {x: 1, y: 2}", () => {
  expect(new Ship({ x: 1, y: 2 }, 0, 4).position).toEqual({ x: 1, y: 2 });
});

test("new Ship({x: 1, y: 2}, 0, 4).direction is 0", () => {
  expect(new Ship({ x: 1, y: 2 }, 0, 4).direction).toEqual(0);
});

test("new Ship({x: 1, y: 2}, 0, 4).length is 4", () => {
  expect(new Ship({ x: 1, y: 2 }, 0, 4).length).toBe(4);
});

//Ship knows its coordinates
test("new Ship({x: 1, y: 2}, 0, 4).coordinates is [{x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2}]", () => {
  expect(new Ship({ x: 1, y: 2 }, 0, 4).coordinates).toEqual([
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
  ]);
});

//even if it's rotated by 270deg (direction can only be: 0, 90, 180 or 270 deg)
test("new Ship({x: 1, y: 5}, 270, 4).coordinates is [{x: 1, y: 5}, {x:1, y:4}, {x:1, y:3}, {x:1, y:2}]", () => {
  expect(new Ship({ x: 1, y: 5 }, 270, 4).coordinates).toEqual([
    { x: 1, y: 5 },
    { x: 1, y: 4 },
    { x: 1, y: 3 },
    { x: 1, y: 2 },
  ]);
});

//testing the hit(position) method
test("new Ship({x: 1, y: 5}, 270, 4).hit({x: 1, y: 4}) should be true", () => {
  expect(new Ship({ x: 1, y: 5 }, 0, 4).hit({ x: 1, y: 4 })).toBeTruthy();
});

test("Hit ship should store the position of the damage", () => {
  const ship = new Ship({ x: 1, y: 5 }, 0, 4);
  ship.hit({ x: 1, y: 4 });
  expect(ship.damages()).toEqual([{ x: 1, y: 4 }]);
});
