import Player from "./player";
import Gameboard from "./gameboard";

//mocking the enemy gameboard
const enemyboard = {
  receivedAttacks: [],
  ships: [{}, {}, {}],
};
enemyboard.receiveAttack = (position) => {
  enemyboard.receivedAttacks.push(position);
  return true;
};
enemyboard.isPieceOnGameboard = (position) => {
  return true;
};
enemyboard.ships[0].getDamages = () => {
  return [
    { x: 1, y: 2 },
    { x: 1, y: 4 },
  ];
};
enemyboard.ships[1].getDamages = () => {
  return [{ x: 3, y: 5 }];
};
enemyboard.ships[2].getDamages = () => {
  return [];
};
enemyboard.missedShots = [
  { x: 5, y: 4 },
  { x: 6, y: 4 },
  { x: 7, y: 4 },
];

//testing the attack function
test("player.attack(position) should call the enemy.board.receiveAttack(position) function", () => {
  const enemy = new Player();
  enemy.board = enemyboard;
  const player = new Player();
  player.enemy = enemy;
  player.attack({ x: 1, y: 5 });
  expect(enemyboard.receivedAttacks).toEqual([{ x: 1, y: 5 }]);
});

test("player.attack(position) should return success: true if the position has never been shot before", () => {
  const enemy = new Player();
  enemy.board = enemyboard;
  const player = new Player();
  player.enemy = enemy;
  expect(player.attack({ x: 1, y: 5 }).success).toBe(true);
});

test("player.attack(position) should return false if the position has been a missed shot before", () => {
  const enemy = new Player();
  enemy.board = enemyboard;
  const player = new Player();
  player.enemy = enemy;
  expect(player.attack({ x: 6, y: 4 }).success).toBe(false);
});

test("player.attack(position) should return false if the position has hit a ship before", () => {
  const enemy = new Player();
  enemy.board = enemyboard;
  const player = new Player();
  player.enemy = enemy;
  expect(player.attack({ x: 3, y: 5 }).success).toBe(false);
});

test("player.attack(position) should return hit: true if the position hits a ship", () => {
  const enemy = new Player();
  enemy.board = enemyboard;
  const player = new Player();
  player.enemy = enemy;
  expect(player.attack({ x: 1, y: 5 }).hit).toBe(true);
});

//tesitng the player.autoAttack(positionFunction) function

//mock function for the randomPosition() function
let numberOfCalls = 0;
const randomPosition = () => {
  const positions = [
    { x: 5, y: 4 }, //autoAttack test
    { x: 3, y: 5 },
    { x: 2, y: 3 },
    { x: 2, y: 5 }, //autoAttackSmart test
    { x: 3, y: 5 },
    { x: 3, y: 8 },
  ];
  const position = positions[numberOfCalls];
  numberOfCalls++;
  return position;
};

test("player.autoAttack(randomPosition) should call the _randomPosition 3 times", () => {
  const enemy = new Player();
  enemy.board = enemyboard;
  const player = new Player();
  player.enemy = enemy;
  player.autoAttack(randomPosition);
  expect(numberOfCalls).toBe(3);
});

//test the autoAttackSmart(positionFn) method
//we use the Gameboard unit instead of mocking it (it's a kind of integration test)
test("player.autoAttackSmart(randomPosition) after 6 calls should call randomPosition 3 times", () => {
  const enemy = new Player();
  enemy.board = new Gameboard();
  enemy.board.placeShip({ x: 1, y: 6 }, 270);
  enemy.board.placeShip({ x: 3, y: 6 }, 90);
  enemy.board.receiveAttack({ x: 1, y: 6 });
  enemy.board.receiveAttack({ x: 1, y: 5 });
  enemy.board.receiveAttack({ x: 1, y: 4 });
  enemy.board.receiveAttack({ x: 1, y: 3 });
  enemy.board.receiveAttack({ x: 1, y: 2 }); //first ship is sunk
  const player = new Player();
  player.enemy = enemy;
  for (let i = 0; i < 6; i++) {
    player.autoAttackSmart(randomPosition);
  }
  expect(numberOfCalls).toBe(6);
});

test("player.autoAttackSmart(randomPosition) after 6 calls should sink the second ship", () => {
  numberOfCalls = 3;
  const enemy = new Player();
  enemy.board = new Gameboard();
  enemy.board.placeShip({ x: 1, y: 6 }, 270);
  enemy.board.placeShip({ x: 3, y: 6 }, 90);
  enemy.board.receiveAttack({ x: 1, y: 6 });
  enemy.board.receiveAttack({ x: 1, y: 5 });
  enemy.board.receiveAttack({ x: 1, y: 4 });
  enemy.board.receiveAttack({ x: 1, y: 3 });
  enemy.board.receiveAttack({ x: 1, y: 2 }); //first ship is sunk
  const player = new Player();
  player.enemy = enemy;
  for (let i = 0; i < 6; i++) {
    player.autoAttackSmart(randomPosition);
  }
  expect(enemy.board.isAllShipSunk()).toBe(true);
});
