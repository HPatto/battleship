/* Define the initial loadout of an HTML page */
import {
    makeDiv,
    makeParagraph,
    addClasses,
    addId,
    setNewContent
} from './manipulateDOM.js';

export class HTMLGeneration {
    constructor() {
        // Empty constructor
    }
    // Define the header content. Return the top-level header div.
    createHeader() {
        // Create the necessary elements
        let headerDiv = makeDiv();

        let titleParagraph = makeParagraph();
        let titleDiv = makeDiv();

        // let subtitleParagraph = makeParagraph();
        // let subtitleDiv = makeDiv();

        // Set the required attributes on the elements
        headerDiv = addId(headerDiv, 'header');
        titleParagraph = addClasses(titleParagraph, ['header-text']);
        // subtitleParagraph = addClasses(subtitleParagraph, ['subtitle']);

        // Set the text content of the elements
        titleParagraph.textContent = "BATTLESHIP";
        // subtitleParagraph.textContent = "Not just chicken soup!";

        // Build the overall element
        titleDiv.appendChild(titleParagraph);
        // subtitleDiv.appendChild(subtitleParagraph);

        headerDiv.appendChild(titleDiv);
        // headerDiv.appendChild(subtitleDiv);

        return headerDiv;
    }

    // Define the body content. Return the top-level body div.
    createContent() {
        // Hold all center content
        let contentDiv = makeDiv();

        // Add the section ID
        contentDiv = addId(contentDiv, 'content');

        contentDiv.textContent = "PLACEHOLDER TEXT";
        return contentDiv;
    }

    // Define the footer content. Return the top-level footer div.
    createFooter() {
        // Create the necessary elements
        let footerDiv = makeDiv();

        let creditParagraph = makeParagraph();
        let creditDiv = makeDiv();

        // Set the required attributes on the elements
        footerDiv = addId(footerDiv, 'footer');
        creditParagraph = addClasses(creditParagraph, ['footer-text']);

        // Set the text content of the elements
        creditParagraph.textContent = (
            "HPatto"
        );
    
        // Build the overall element
        creditDiv.appendChild(creditParagraph);
        footerDiv.appendChild(creditDiv);

        return footerDiv;
    }

    // Remove all content parent element, append new elements
    setContent(parentElem, newChildElemArray) {
        return setNewContent(parentElem, newChildElemArray);
    }
}

