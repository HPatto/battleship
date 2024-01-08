/* Defines the Gameboard object */
import { Ship } from './ship.js';

/*
INSTRUCTIONS

Gameboards should be able to place ships at specific coordinates
by calling the ship factory function.

Gameboards should have a receiveAttack function that takes a pair
of coordinates, determines whether or not the attack hit a ship
and then sends the ‘hit’ function to the correct ship,
or records the coordinates of the missed shot.

Gameboards should keep track of missed attacks
so they can display them properly.

Gameboards should be able to report whether or not
all of their ships have been sunk.
*/

export class Gameboard {
    constructor() {
        this.gameBoard = this.setGameboard();
        this.missedAttacks = [];
        this.Ships = [];
    }

    setGameboard() {
        // Initialize the gameboard as a hashmap of coordinates.
        // If a coord holds a ship, it will be added to that coord.

        // Set the board size. Sizes beyond 26 will cause issues.
        const sideLength = 10;

        // x-coords are capital letters
        // ASCII code for 'A' is 65.
        const xCoords = this.getXCoords(sideLength, 65);

        // y-coords are numbers
        const yCoords = this.getYCoords(sideLength, 1);

        // Get the full array of coords
        const allCoords = this.getAllCoords(xCoords, yCoords);
        
        const numCoords = allCoords.length;

        // Initialize a new Hashmap
        let boardMap = new Map();

        for (let i = 0; i < numCoords; i++) {
            boardMap[allCoords[i]] = false;
        }
        
        // console.log(boardMap);
        return boardMap;
    }

    getGameboard() {
        return this.gameBoard;
    }

    placeShip(startCoord, finishCoord) {
        // Onus is on another object to ensure valid coords.

        // Get length of the ship
        const shipLength = this.getShipLength(startCoord, finishCoord);
        
        // Instantiate new ship
        const newShip = new Ship(shipLength);

        let shipCoordArray = [];
        let shipXCoords;
        let shipYCoords;

        // Get each coord in the array
        if (startCoord === finishCoord) {
            // Ship is one square. Add the coord.
            shipCoordArray.push(startCoord);
        } else if (startCoord[0] === finishCoord[0]){
            // The ship is positioned in the y-axis
            shipXCoords = startCoord[0];
            shipYCoords = this.getYCoords(shipLength, Math.min(
                parseInt(startCoord.slice(1)),
                parseInt(finishCoord.slice(1)),
            ))
        } else {
            // The ship is positioned in the x-axis
            shipXCoords = this.getXCoords(shipLength, Math.min(
                startCoord[0].charCodeAt(0),
                finishCoord[0].charCodeAt(0),
            ))
            shipYCoords = startCoord.slice(1);
        }

        shipCoordArray = this.getAllCoords(shipXCoords, shipYCoords);

        for (let i = 0; i < shipLength; i++) {
            this.gameBoard[shipCoordArray[i]] = newShip;
        }

        this.Ships.push(newShip);
    }

    getShipLocations() {
        let shipLocations = [];
        this.gameBoard.forEach((value, key) => {
            if (!(value === false)) {
                shipLocations.push(key);
            }           
        });

        return shipLocations;
    }

    receiveAttack(attackCoord) {
        if (!(this.gameBoard[attackCoord])) {
            // No ship at the coord. Record missed strike.
            this.missedAttacks.push(attackCoord);
            // return false;
        } else {
            // Ship at the coord. Call the hit() method.
            this.gameBoard[attackCoord].hit();
            // return true;
        }
    }

    getShipLength(startCoord, finishCoord) {
        const xDifference = 1 + this.getAsciiDifference(
            startCoord[0],
            finishCoord[0]
        );

        const yDifference = 1 + (
            Math.abs(
                parseInt(startCoord.slice(1)) - 
                parseInt(finishCoord.slice(1))
            )
        );
        
        return (Math.max(xDifference, yDifference));
    }

    getXCoords(count, firstChar){
        // X-coords are capital letters.
        return this.getArrayFromAscii(count, firstChar);
    }

    getYCoords(count, seedNum){
        // Y-coords are numbers

        let yCoords = [];

        for (let i = 0; i < count; i++) {
            yCoords.push((seedNum + i).toString());
        }

        return yCoords;
    }

    getAllCoords(xC, yC) {
        let allCoords = [];

        const xLength = xC.length;
        const yLength = yC.length;

        for (let i = 0; i < xLength; i++) {
            for (let j = 0; j < yLength; j++) {
                const newCoord = xC[i] + yC[j];
                allCoords.push(newCoord);
            }
        }

        return allCoords;
    }

    getArrayFromAscii(count, firstCharCode) {
        let asciiArray = [];

        for (let i = 0; i < count; i++) {
            asciiArray.push(String.fromCharCode(firstCharCode + i));
        }

        return asciiArray;
    }

    getAsciiDifference(char1, char2) {
        const ascii1 = char1.charCodeAt(0);
        const ascii2 = char2.charCodeAt(0);
      
        return Math.abs(ascii1 - ascii2);
    }

    getMissedAttacks() {
        return this.missedAttacks;
    }

    getAllShipsSunk() {
        if (this.Ships.length === 0) {
            return false;
        } else {
            return this.Ships.every((ship) => {
                return ship.isSunk()
            })
        }
    }
}

// const myGameboard = new Gameboard();

// myGameboard.placeShip("A1", "A5");
// myGameboard.placeShip("B7","H7");

// myGameboard.receiveAttack("A1");
// myGameboard.receiveAttack("A2");
// myGameboard.receiveAttack("A3");
// myGameboard.receiveAttack("A4");
// myGameboard.receiveAttack("A5");

// myGameboard.receiveAttack("C4");

// myGameboard.getGameboard();
// console.log(myGameboard.getMissedAttacks());