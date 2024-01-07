/* The command center for running the web-app */

import '../src/normalize.css';
import '../src/styles.css';
import { HTMLGeneration } from "../src/defaultpage.js";
import { Game } from "../src/game.js";

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
    // Set the overall div element
    // setOverallDiv();

    let allElement = document.querySelector("#all-content");
    // console.log(contentElement);
    const newGenerator = new HTMLGeneration();
    const newGame = new Game();

    // Build the three sections
    let header = newGenerator.createHeader();
    // console.log(header);
    let content = newGenerator.createContent();
    let footer = newGenerator.createFooter();

    allElement.appendChild(header);
    allElement.appendChild(content);
    allElement.appendChild(footer);
});