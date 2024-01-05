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
    // Onus is on the constructing object to ensure valid lengths.
    constructor(length) {
        this.length = length;
        this.receivedHits = 0;
        this.sunk = false;
    }

    hit() {
        // Increment receivedHits, call isSunk(). If true, update bool.
        if (!(this.isSunk())) {
            this.receivedHits++;
            
            if (this.isSunk()) {
                this.sunk = true;
            }
        }

    }

    isSunk() {
        // If the number of hits === length, the ship is sunk.

        // Onus is on another object to prevent the same spot being hit.
        // If the ship is sunken, no parameters are updated.

        return (
            this.receivedHits === this.length
        );   
    }
}