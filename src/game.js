/* Responsible for the high-level execution of the battleship game */

import { Player } from './player.js';

export class Game {
    constructor() {
        this.firstPlayer;
        this.secondPlayer;
        this.winner;
        this.shotsFired = 0;

        // These will not be used at the start
        this.numShips;
        this.numSquares;
    }

    playGame() {
        // Set the players
        this.setPlayers();

        // Set the ships
        this.setShips();

        // console.log("Do not pray for easy lives");

        // While the game is not over, let them take turns firing
        while (!(this.isGameOver())) {
            // Fight babay
            // console.log("Pray to be");
            this.engageInCombat(this.firstPlayer, this.secondPlayer);
        }

        console.log(this.winner);
        // console.log("Here are the boards");
    }

    setPlayers() {
        this.firstPlayer = new Player();
        this.secondPlayer = new Player();
    }

    setShips() {
        // Set ships for Player One
        this.firstPlayer.placeShip('A1', 'A4');
        this.firstPlayer.placeShip('D3', 'E3');
        this.firstPlayer.placeShip('C5', 'F5');
        this.firstPlayer.placeShip('H7', 'H8');

        // Set ships for Player Two
        this.secondPlayer.placeShip('A1', 'A4');
        this.secondPlayer.placeShip('D3', 'E3');
        this.secondPlayer.placeShip('C5', 'F5');
        this.secondPlayer.placeShip('H7', 'H8');
    }

    engageInCombat(firstPlayer, secondPlayer) {
        if (this.shotsFired % 2 === 0) {
            // console.log("Stronger men");
            this.fireShot(firstPlayer, secondPlayer);
        } else {
            this.fireShot(secondPlayer, firstPlayer);
        }
        this.shotsFired++;
        // console.log('We finished one bit of combat');
    }

    fireShot(firstPlayer, secondPlayer) {
        // Get coords. First player state updated to be sent
        const attackCoords = firstPlayer.sendRandomAttack();
        // console.log(attackCoords);
        secondPlayer.receieveAttack(attackCoords);
    }

    isGameOver() {
        if (this.hasPlayerLost(this.firstPlayer)) {
            // Player Two has won.
            this.winner = "Player Two Wins!";
            return true;
        } else if (this.hasPlayerLost(this.secondPlayer)) {
            // Player One has won.
            this.winner = "Player One Wins!";
            return true;
        }

        return false;
    }

    hasPlayerLost(aPlayer) {
        return aPlayer.hasLost();
    }
}

// Run the game

let newGame = new Game();
newGame.playGame();