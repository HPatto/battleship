/* Responsible for the high-level execution of the battleship game */

import { Player } from './player.js';

export class Game {
    constructor() {
        this.firstPlayer;
        this.secondPlayer;
        this.winner;
        this.shotsFired = 0;
        this.mostRecentAIAttack;

        // These will not be used at the start
        this.numShips;
        this.numSquares;
    }

    setGame() {
        // Set players
        this.setPlayers();

        // Ships placed
        this.setShips();
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

    getShips(aPlayer) {
        return aPlayer.getShipLocations();
    }

    engageInCombat() {
        if (!(this.shotsFired % 2 === 0)) {
            // AI shoots
            const randomAttack = this.secondPlayer.sendRandomAttack();
            this.firstPlayer.receieveAttack(randomAttack);
            this.shotsFired++;
            this.mostRecentAIAttack = randomAttack;
            // return randomAttack;
        }
    }

    fireShot(coords) {
        // Get coords. First player state updated to be sent
        // const attackCoords = firstPlayer.sendRandomAttack();
        // console.log(attackCoords);
        this.firstPlayer.sendAttack(coords);
        this.secondPlayer.receieveAttack(coords);
        this.shotsFired++;
    }

    mostRecentAttack() {
        return this.mostRecentAIAttack;
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