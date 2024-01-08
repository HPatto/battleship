/* The command center for running the web-app */

import '../src/css/normalize.css';
import '../src/css/styles.css';
import { HTMLGeneration } from "../src/javascript/defaultpage.js";
import { GameDOM } from "../src/javascript/gameDOM.js";

function updateBodyContent(bodyElem, clickedElem) {
    let newContent;

    if (clickedElem.textContent === 'MENU') {
        newContent = buildMenu();
    } else if (clickedElem.textContent === 'CONTACT') {
        newContent = buildContact();
    } else if (clickedElem.textContent === 'HOME') {
        newContent = buildHome();
    }

    setBodyContent(bodyElem, newContent);
}

document.addEventListener('DOMContentLoaded', function () {
    // Get the overall div container
    let allElement = document.querySelector("#all-content");

    // Build an HTML generator object
    const newGenerator = new HTMLGeneration();
    const newGameDOM = new GameDOM();

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

    // Start the game
    const begin = document.querySelector('#start-button');
    begin.addEventListener('click', () => {
        newGameDOM.engage();
    })

    // Listen for user clicks
    const enemyBoard = document.querySelector(".grid.ENEMY");
    enemyBoard.addEventListener('click', (e) => {
        // Get the actual element clicked
        const elemClicked = e.target;

        // Process the user clicks
        newGameDOM.userAttack(elemClicked);
    })

    // End the game
});