/* Defines the GameDOM object */

// Have a think about best object design for these in the future
import { HTMLGeneration } from "./defaultpage.js";
import { Game } from "./game.js";
import {
    makeDiv,
    makeParagraph,
    addClasses,
    addId,
    makeGitHubImage,
    setNewContent
} from './manipulateDOM.js';

export class GameDOM {
    constructor() {
        this.game;
    }

    // Set up the logic to begin accepting user input
    engage() {
        // Set the new game
        this.game = new Game();
        this.game.setPlayers();

        // Ships placed
        this.game.setShips();


        // Map the ship locations to the HTML elements for player 1.
        this.displayShips("PLAYER");
        this.displayShips("ENEMY");
    }

    userAttack(element) {
        // The user as clicked an element in the enemy grid.

        // Has it already been clicked?
        if (
            element.classList.contains('miss') ||
            element.classList.contains('hit')
        ) {
            // What is the correct way to process these actions?
            return -1;
        }

        // Does the classList contain co-ordinates?
        if (element.classList.contains("grid-element")) {
            // Get the co-ords
            const coords = [...element.classList][1];
            this.game.fireShot(coords);

            const enemyShips = this.game.secondPlayer.getShipLocations();
            console.log("These are the coords");
            console.log(coords);

            const elemIsAShip = coords in enemyShips;
            console.log(elemIsAShip);
            
            if (enemyShips.includes(coords)) {
                element = addClasses(element, ['hit']);
            } else {
                element = addClasses(element, ['miss']);
            }
            
        }
    }

    displayShips(playerName) {
        // For each key in a player's gameboard, get the coords.
        let object;
        if (playerName === "PLAYER") {
            object = this.game.firstPlayer;
        } else {
            object = this.game.secondPlayer;
        }
        
        let playerShipLocations = object.getShipLocations();
        const allElems = document.querySelectorAll("." + playerName);

        // console.log(playerShipLocations);
        
        allElems.forEach((elem) => {
            playerShipLocations.forEach((coords) => {
                if (elem.classList.contains(coords)) {
                    elem = addClasses(elem, ['has-ship']);
                }
            });
        });
    }

    // Settings pane
    buildSidePane() {
        let sidePane = document.createElement('div');
        sidePane = addId(sidePane, 'side-pane');

        // Div for the buttons
        let options = this.buildOptions();
        sidePane.appendChild(options);

        return sidePane;
    }

    // Options
    buildOptions() {
        let optionsElem = document.createElement('div');
        optionsElem = addId(optionsElem, 'options');

        optionsElem.appendChild(this.buildStartButton());
        optionsElem.appendChild(this.buildResetButton());

        return optionsElem;
    }

    // Surrender button
    buildResetButton() {
        let resetButton = document.createElement('button');
        let resetText = document.createElement('p');

        resetButton = addId(resetButton, 'reset-button');
        resetText.textContent = "SURRENDER";

        resetButton.appendChild(resetText);
        return resetButton;
    }

    // Engage button
    buildStartButton() {
        let startButton = document.createElement('button');
        let startText = document.createElement('p');

        startButton = addId(startButton, 'start-button');
        startText.textContent = "ENGAGE";

        startButton.appendChild(startText);
        return startButton;
    }

    // The element that holds player + opponent boards
    buildCombatArena(){
        // Set the combat area
        let combatArena = document.createElement('div');
        combatArena = addId(combatArena, 'combat-arena');

        // Initialize a new game object
        this.game = new Game();
        this.game.setPlayers();

        // Get the individual grids
        const playerGrid = this.buildGrid("PLAYER");
        const computerGrid = this.buildGrid("ENEMY");

        // Add the grids to the arena
        combatArena.appendChild(playerGrid);
        combatArena.appendChild(computerGrid);

        return combatArena;
    }

    // Battlefield
    buildGrid(text) {
        // The grid is 10x10. Each key in the Map gives us an ID?
        let combatantArea = document.createElement('div');
        let grid = document.createElement('div');
        let title = document.createElement('div');
        let titleText = document.createElement('p');

        const yCoords = [
            10, 9, 8, 7, 6, 5, 4, 3, 2, 1
        ];

        combatantArea = addClasses(combatantArea, ['combatant-arena']);
        grid = addClasses(grid, ['grid', text]);
        title = addClasses(title, ['grid-title']);

        titleText.textContent = text;

        for (let i = 0; i < 10; i++) {
            const newRow = this.buildRow(yCoords[i], text);
            grid.appendChild(newRow);
        }

        title.appendChild(titleText);
        combatantArea.appendChild(title);
        combatantArea.appendChild(grid);

        return combatantArea;
    }

    // Grid row
    buildRow(yVal, text) {
        // Build the row
        let rowElem = document.createElement('div');
        const xCoords = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'
        ];

        rowElem = addClasses(rowElem, ['grid-row', text]);

        // Build and add the elements
        for (let i = 0; i < 10; i++) {
            let newElem = document.createElement('div');
            const fullCoords = xCoords[i] + yVal;
            newElem = addClasses(
                newElem,
                ['grid-element', fullCoords, text]
            );
            rowElem.appendChild(newElem);
        }

        return rowElem;
    }
}