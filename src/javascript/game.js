/* Responsible for the high-level execution of the battleship game */

import { Player } from './player.js';

export class Game {
    constructor() {
        this.firstPlayer;
        this.secondPlayer;
        this.winner;
        this.shotsFired = 0;
        this.mostRecentAIAttack;
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
        // Generate a random collection of 5 start and end coords
        for (let i = 0; i < 5; i++){
            this.firstPlayer.setShipCoords(i+1);
            this.secondPlayer.setShipCoords(i+1);
        }
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
        }
    }

    fireShot(coords) {
        // Get coords. First player state updated to be sent
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