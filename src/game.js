import Player from "./player";
import Gameboard from "./gameboard";
import { randomPosition, randomDirection, getState } from "./helper";

function Game() {
  this.player = new Player();
  this.player.name = "player";
  this.player.board = new Gameboard();
  this.computer = new Player();
  this.computer.name = "computer";
  this.computer.board = new Gameboard();
  this.player.enemy = this.computer;
  this.computer.enemy = this.player;
  this.nextPlayer = this.player;

  this.placeShips = (board, ships) => {
    ships.forEach((ship) => {
      board.placeShip(ship.position, ship.direction);
    });
  };

  this.placeShipsRandom = (board) => {
    for (let i = 0; i < 7; i++) {
      while (!board.placeShip(randomPosition(), randomDirection()));
    }
  };

  this.playerAttack = (position) => {
    let attackResult = this.player.attack(position);
    let gameOver = false;
    let winner = {};
    if (!attackResult.success) return { gameOver, winner };
    if (attackResult.hit !== -1) {
      gameOver = this.computer.board.isAllShipSunk();
      if (gameOver) winner = this.player;
      if (!gameOver) this.nextPlayer = this.player;
    } else this.nextPlayer = this.computer;
    return { gameOver, winner };
  };

  this.computerAttack = () => {
    let attackResult = this.computer.autoAttackSmart(randomPosition);
    let gameOver = false;
    let winner = {};
    gameOver = this.player.board.isAllShipSunk();
    if (gameOver) winner = this.computer;
    if (attackResult.hit !== -1 && !gameOver) this.nextPlayer = this.computer;
    else this.nextPlayer = this.player;
    return { gameOver, winner };
  };
}

export default Game;
