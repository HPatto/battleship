/* Testing suite for the Ship object */
import { Ship } from '../src/javascript/ship';

// Is there a hit() function.
test('Has a hit() function', () => {
    // Create a ship object
    const shipLength = 3;
    const aShip = new Ship(shipLength);

    // The function is defined
    expect(aShip.hit).toBeDefined();
});

// Is there a functional isSunk() function.
test('Has a isSunk() function', () => {
    // Create a ship object
    const shipLength = 3;
    const aShip = new Ship(shipLength);

    // The function is defined
    expect(aShip.isSunk).toBeDefined();

    // A new ship object is initialised as not-sunk.
    expect(aShip.isSunk()).toBe(false);
});

// Does the hit() f(n) eventually sink the ship?
test('hit() alters the sunken state at correct length', () => {
    // Create a ship object
    const shipLength = 3;
    const aShip = new Ship(shipLength);

    // Expect hitCount < 3 to not change sunken status
    // Expect hitCount === 3 to change sunken status
    // Expect hitCount > 3 to stay sunken (Altho not possible)

    // One hit
    aShip.hit();
    expect(aShip.isSunk()).toBe(false);

    // Two hits
    aShip.hit();
    expect(aShip.isSunk()).toBe(false);

    // Three hits
    aShip.hit();
    expect(aShip.isSunk()).toBe(true);

    // Four hits
    aShip.hit();
    expect(aShip.isSunk()).toBe(true);
});
