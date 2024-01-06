/* Defines the Player object */
import { Gameboard } from '../src/gameboard.js';

/*
INSTRUCTIONS

Players can take turns playing the game by
attacking the enemy Gameboard.

The game is played against the computer, so make the ‘computer’
capable of making random plays. The AI does not have to be smart,
but it should know whether or not a given move is legal
(i.e. it shouldn’t shoot the same coordinate twice).
*/

export class Player {
    constructor() {
        this.playerGameboard = this.setGameboard();
        this.alreadyCalled = [];
    }

    sendAttack(attackCoords) {
        // Only sent for new coords
        if (this.isValidAttack(attackCoords)) {
            this.alreadyCalled.push(attackCoords);
            return attackCoords;
        }
    }

    receieveAttack(attackCoords) {
        this.playerGameboard.receiveAttack(attackCoords);        
    }

    setGameboard() {
        return new Gameboard();
    }

    placeShip(startCoord, finishCoord) {
        this.playerGameboard.placeShip(startCoord, finishCoord);
    }

    hasLost() {
        return this.playerGameboard.getAllShipsSunk();
    }

    isValidAttack(coord) {
        return (!(coord in this.alreadyCalled));
    }

    sendRandomAttack() {

        let attackCoords = undefined;
        
        while (
            attackCoords === undefined ||
            !this.isValidAttack(attackCoords)
        ) {
            let xCoord = this.getRandomLetter();
            let yCoord = this.getRandomNumber(1, 10);
        }

        attackCoords = xCoord + yCoord;
        this.sendAttack(attackCoords);
    }

    getRandomLetter() {
        const randomCharCode = Math.floor(Math.random() * 26) + 65; // Generates ASCII code for A-Z
        const randomLetter = String.fromCharCode(randomCharCode);
        return randomLetter;
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
