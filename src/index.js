/* The command center for running the web-app */

import '../src/css/normalize.css';
import '../src/css/styles.css';
import { HTMLGeneration } from "../src/javascript/defaultpage.js";
import { GameDOM } from "../src/javascript/gameDOM.js";

function fullReset(newGameDOM, newGenerator) {
    // Get the overall div container
    let allElement = document.querySelector("#all-content");
    newGenerator.removeContent(allElement);

    // Build the three sections
    let header = newGenerator.createHeader();
    let content = newGenerator.createContent();
    let footer = newGenerator.createFooter();

    // Update the content section
    content.appendChild(newGameDOM.buildSidePane());
    content.appendChild(newGameDOM.buildCombatArena());

    // Add the three sections
    allElement.appendChild(header);
    allElement.appendChild(content);
    allElement.appendChild(footer);
}

function resetGrids(contentElement, newGameDOM) {
    // Remove combat arena
    let combatArena = document.querySelector("#combat-arena");
    contentElement.removeChild(combatArena);

    // Update the content section
    contentElement.appendChild(newGameDOM.buildCombatArena());
}

function resetGame(text) {
    // Log winner
    console.log("GAME OVER. " + text + " WINS!");

    // Remove future clicks
    let enemyBoard = document.querySelector(".grid.ENEMY");
    enemyBoard.removeEventListener('click', enemyClick);
}

function resetLogic() {
    let newGenerator = new HTMLGeneration();
    let newGameDOM = new GameDOM();

    fullReset(newGameDOM, newGenerator);

    return [newGenerator, newGameDOM];
}

const enemyClick = function(event, newGameDOM, newGenerator) {
    // Get the actual element clicked
    const elemClicked = event.target;

    // Process the user clicks
    newGameDOM.userAttack(elemClicked);
    if (newGameDOM.gameOver()) {
        resetGame("PLAYER");
        return;
    }
    newGameDOM.aiAttack();
    if (newGameDOM.gameOver()) {
        resetGame("ENEMY");
        return;
    }
}

document.addEventListener('DOMContentLoaded', function () {   
    // Build an HTML generator object
    let [newGenerator, newGameDOM] = resetLogic();

    // Engage and Enemy Grid buttons
    const begin = document.querySelector('#start-button');

    // Start the game
    begin.addEventListener('click', () => {
        // Reset the combat arena
        let contentElement = document.querySelector("#content");
        resetGrids(contentElement, newGameDOM);

        const enemyBoard = document.querySelector(".grid.ENEMY");

        newGameDOM.engage();

        // Listen for user clicks
        enemyBoard.addEventListener('click', function(event) {
        enemyClick(event, newGameDOM, newGenerator);
    });
    })
});