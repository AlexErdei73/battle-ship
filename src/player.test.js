import Player from "./player";

//mocking the enemy gameboard
const enemyboard = {
  receivedAttacks: [],
  ships: [{}, {}, {}],
};
enemyboard.receiveAttack = (position) => {
  enemyboard.receivedAttacks.push(position);
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

test("player.attack(position) should return true if the position has never been shot before", () => {
  const enemy = new Player();
  enemy.board = enemyboard;
  const player = new Player();
  player.enemy = enemy;
  expect(player.attack({ x: 1, y: 5 })).toBe(true);
});

test("player.attack(position) should return false if the position has been a missed shot before", () => {
  const enemy = new Player();
  enemy.board = enemyboard;
  const player = new Player();
  player.enemy = enemy;
  expect(player.attack({ x: 6, y: 4 })).toBe(false);
});

test("player.attack(position) should return false if the position has hit a ship before", () => {
  const enemy = new Player();
  enemy.board = enemyboard;
  const player = new Player();
  player.enemy = enemy;
  expect(player.attack({ x: 3, y: 5 })).toBe(false);
});
