/* Defines the Ship object */

/*
INSTRUCTIONS 

Your ‘ships’ will be objects that include their length,
the number of times they’ve been hit, 
and whether or not they’ve been sunk.

Ships should have a hit() function that increases the
number of ‘hits’ in your ship.

isSunk() should be a function that calculates whether a
ship is considered sunk based on its length and the
number of hits it has received.
*/

export class Ship {
    constructor(length) {
        this.length = length;
        this.receivedHits = 0;
        this.sunk = false;
    }

    hit() {
        // Increment receivedHits, call isSunk(). If true, update bool.
        this.receivedHits++;
        if (this.isSunk()) {
            this.sunk = true;
        }
    }

    isSunk() {
        // If the number of hits >= length, the ship is sunk.
        // No restriction on the user bombing the same spots again.

        return (
            this.receivedHits >= this.length
        );   
    }
}