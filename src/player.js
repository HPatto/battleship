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
        if (!(attackCoords in this.alreadyCalled)) {
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

    hasLost() {
        return this.playerGameboard.getAllShipsSunk();
    }
}
