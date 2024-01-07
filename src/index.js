/* The command center for running the web-app */

import './normalize.css';
import './styles.css';
import { HTMLGeneration } from "../src/defaultpage.js";
import { Game } from "../src/game.js";
// import { buildMenu } from "./menu.js";
// import { buildContact } from "./contact.js";

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

function setBodyContent(bodyElem, newContentElem) {
    // We gotta be doing some serious stuff here
    while (bodyElem.firstChild) {
        bodyElem.removeChild(bodyElem.firstChild);
    }
    bodyElem.appendChild(newContentElem);
}

function setOverallDiv() {
    let bodyElement = document.body;

    let overallDiv = document.createElement('div');
    overallDiv.setAttribute('id', 'content');

    bodyElement.appendChild(overallDiv);
}

document.addEventListener('DOMContentLoaded', function () {
    // Set the overall div element
    // setOverallDiv();

    let contentElement = document.querySelector("#all-content");
    console.log(contentElement);
    const newGenerator = new HTMLGeneration();
    const newGame = new Game();

    // Build the three sections
    let header = newGenerator.createHeader();
    console.log(header);
    let body = newGenerator.createBody();
    let footer = newGenerator.createFooter();

    contentElement.appendChild(header);
    contentElement.appendChild(body);
    contentElement.appendChild(footer);
});