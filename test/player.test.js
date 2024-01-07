/* Testing suite for the Player object */
import { Player } from '../src/javascript/player';

// hasLost() function.
test('hasLost() function works well', () => {
    // Create a ship object
    const newPlayer = new Player();

    // The function is defined
    expect(newPlayer.hasLost).toBeDefined();

    // The function returns a boolean
    expect(typeof newPlayer.hasLost()).toBe('boolean');
});

// placeShip() function.
test('hasLost() function works well', () => {
    // Create a ship object
    const newPlayer = new Player();

    // The function is defined
    expect(newPlayer.placeShip).toBeDefined();
});