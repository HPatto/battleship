/* Testing suite for the Gameboard object */
import { Gameboard } from '../src/gameboard';

// Well-behaved receieveAttack() function.
test('Has a receieveAttack() function', () => {
    // Create a gameboard
    const aGameboard = new Gameboard();

    // The function is defined
    expect(aGameboard.receiveAttack).toBeDefined();
});

// Is a ship reported as sunken correctly?
test('Have all ships been sunken - #ships = 0', () => {
    // Create a gameboard
    const aGameboard = new Gameboard();

    // Check blank state. Without ships defined, this will be false.
    expect(aGameboard.getAllShipsSunk()).toBe(false);
});

test('Have all ships been sunken? - #ships = 1', () => {
    // Create a gameboard
    const aGameboard = new Gameboard();

    // Define one ship
    aGameboard.placeShip("A4", "A7");

    // No hits recorded, should be false
    expect(aGameboard.getAllShipsSunk()).toBe(false);

    // Hit the ship once
    aGameboard.receiveAttack("A4");

    // #hits < length, should be false
    expect(aGameboard.getAllShipsSunk()).toBe(false);

    // Hit the ship at n-1 locations
    aGameboard.receiveAttack("A5");
    aGameboard.receiveAttack("A6");

    // #hits < length, should be false
    expect(aGameboard.getAllShipsSunk()).toBe(false);

    // Hit the ship once more
    aGameboard.receiveAttack("A7");

    // #hits == length, should be true
    expect(aGameboard.getAllShipsSunk()).toBe(true);
});

test('Have all ships been sunken? - #ships = 2', () => {
    // Create a gameboard
    const aGameboard = new Gameboard();

    // Define one ship
    aGameboard.placeShip("A4", "A7");
    aGameboard.placeShip("C3", "E3");

    // No hits recorded, should be false
    expect(aGameboard.getAllShipsSunk()).toBe(false);

    // Sink once ship
    aGameboard.receiveAttack("A4");
    aGameboard.receiveAttack("A5");
    aGameboard.receiveAttack("A6");
    aGameboard.receiveAttack("A7");

    // #sunk < #ships, should be false
    expect(aGameboard.getAllShipsSunk()).toBe(false);

    // Partially hit the next ship
    aGameboard.receiveAttack("C3");
    aGameboard.receiveAttack("D3");

    // #sunk < #ships, should be false
    expect(aGameboard.getAllShipsSunk()).toBe(false);

    // Sink the last ship
    aGameboard.receiveAttack("E3");

    // #sunk == #ships, should be true
    expect(aGameboard.getAllShipsSunk()).toBe(true);
});
