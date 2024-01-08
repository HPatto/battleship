/* Defines the Player object */
import { Gameboard } from './gameboard.js';

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
        this.alreadyCalled.push(attackCoords);
        return attackCoords;
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

    getShipLocations() {
        return this.playerGameboard.getShipLocations();
    }

    hasLost() {
        return this.playerGameboard.getAllShipsSunk();
    }

    isValidAttack(coord) {
        return (!(this.alreadyCalled.includes(coord)));
    }

    sendRandomAttack() {

        let attackCoords = undefined;
        // console.log("coords are undefined: " + (attackCoords === undefined));
        
        while (
            attackCoords === undefined ||
            !(this.isValidAttack(attackCoords))
        ) {
            let xCoord = this.getRandomLetter(10);
            let yCoord = this.getRandomNumber(1, 10);
            attackCoords = xCoord + yCoord;
            // console.log(xCoord);
            // console.log(yCoord);
        }

        // console.log(attackCoords);
        return this.sendAttack(attackCoords);
    }

    validCoords(coordArray) {
        // Array has a number of string entries
        // We need to check each entry against the stored values.
        const setValues = this.getShipLocations();
        return !coordArray.some((coord) => {
            return setValues.includes(coord);
        });
    }

    setShipCoords(shipLength) {
        const seed = this.getSeedCoord(shipLength);
        const orientation = this.getOrientation();

        let shipCoords = undefined;

        while (
            shipCoords === undefined ||
            this.validCoords(shipCoords)
        ) {
            shipCoords = this.buildShipCoords(seed, orientation, shipLength);
        }

        // console.log(shipCoords);

        this.placeShip(
            shipCoords[0],
            shipCoords[shipCoords.length - 1]
        );   
    }

    buildShipCoords(seed, orientation, shipLength){
        const initX = seed[0]; // This is a character
        const initY = seed[1]; // This is a number
        let coords = [];

        // console.log(seed);

        if (orientation === 0) {
            // Horizontal position
            // Generate X values
            const xVals = this.playerGameboard.getXCoords(shipLength, initX.charCodeAt(0));
            // console.log(xVals);
            xVals.forEach((xVal) => {
                let coord = "" + xVal + initY;
                coords.push(coord);
            });
            // console.log("Horizontal");
        } else {
            // Vertical position
            // Generate Y values
            const yVals = this.playerGameboard.getYCoords(shipLength, initY);
            yVals.forEach((yVal) => {
                let coord = "" + initX + yVal;
                // console.log("Recorded coord:" + coord);
                coords.push(coord);
            });
            // console.log("Vertical");
        }
        
        console.log(coords);
        return coords;
    }

    getOrientation() {
        // 0 is horizontal
        // 1 is vertical
        return Math.floor(Math.random() * 2);
    }

    getSeedCoord(shipLength) {
        const xCoord = this.getRandomLetter((10 + 1 - shipLength));
        const yCoord = this.getRandomNumber(1, (10 + 1 - shipLength));

        return [xCoord, yCoord];
    }

    getRandomLetter(count) {
        const randomCharCode = Math.floor(Math.random() * count) + 65; // Generates ASCII code for A-Z
        const randomLetter = String.fromCharCode(randomCharCode);
        return randomLetter;
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
