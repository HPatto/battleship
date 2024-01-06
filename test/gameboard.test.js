/* Testing suite for the Gameboard object */
import { Gameboard } from '../src/gameboard';

// Well-behaved receieveAttack() function.
test('Has a receieveAttack() function', () => {
    // Create a ship object
    // const shipLength = 3;
    const aGameboard = new Gameboard();

    // The function is defined
    expect(aGameboard.receiveAttack).toBeDefined();

    // It returns a boolean
    const successfulHit = aGameboard.receiveAttack();
    expect(typeof successfulHit).toBe('boolean');
});