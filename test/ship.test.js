/* Testing suite for the Ship object */
import Ship from '../src/ship';

// Check if there is a hit() function. Don't care if it works.
test('Has a hit() function', () => {
    // Create a ship object
    const aShip = new Ship();
    expect(aShip).toHaveProperty('hit');
});