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
  this.setState = () => {};

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
    //update the DOM here
    this.setState(getState(this));
    if (attackResult.hit !== -1) {
      gameOver = this.computer.board.isAllShipSunk();
      if (gameOver) winner = this.player;
    } else {
      do {
        attackResult = this.computer.autoAttackSmart(randomPosition);
        //update the DOM here
        this.setState(getState(this));
        gameOver = this.player.board.isAllShipSunk();
        if (gameOver) winner = this.computer;
      } while (attackResult.hit !== -1 && !gameOver);
    }
    return { gameOver, winner };
  };
}

export default Game;
