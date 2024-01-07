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

    buildResetButton() {
        let resetButton = document.createElement('button');
        let resetText = document.createElement('p');

        resetButton = addId(resetButton, 'reset-button');
        resetText.textContent = "SURRENDER";

        resetButton.appendChild(resetText);
        return resetButton;
    }

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

        // Get the individual grids
        const playerGrid = this.buildGrid("PLAYER");
        const computerGrid = this.buildGrid("ENEMY");

        // Add the grids to the arena
        combatArena.appendChild(playerGrid);
        combatArena.appendChild(computerGrid);

        return combatArena;
    }

    buildGrid(text) {
        // The grid is 10x10. Each key in the Map gives us an ID?
        let combatantArea = document.createElement('div');
        let grid = document.createElement('div');
        let title = document.createElement('div');
        let titleText = document.createElement('p');

        combatantArea = addClasses(combatantArea, ['combatant-arena']);
        grid = addClasses(grid, ['grid']);
        title = addClasses(title, ['grid-title']);

        titleText.textContent = text;

        for (let i = 0; i < 10; i++) {
            const newRow = this.buildRow();
            grid.appendChild(newRow);
        }

        title.appendChild(titleText);
        combatantArea.appendChild(title);
        combatantArea.appendChild(grid);

        return combatantArea;
    }

    buildRow() {
        // Build the row
        let rowElem = document.createElement('div');
        rowElem = addClasses(rowElem, ['grid-row']);

        // Build and add the elements
        for (let i = 0; i < 10; i++) {
            let newElem = document.createElement('div');
            newElem = addClasses(newElem, ['grid-element']);
            rowElem.appendChild(newElem);
        }

        return rowElem;
    }
}