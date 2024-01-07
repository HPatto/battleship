/* Define the initial loadout of an HTML page */
import {
    makeDiv,
    makeParagraph,
    addClasses,
    addId
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

        let subtitleParagraph = makeParagraph();
        let subtitleDiv = makeDiv();

        // Set the required attributes on the elements
        headerDiv = addId(headerDiv, 'header');
        titleParagraph = addClasses(titleParagraph, ['title']);
        subtitleParagraph = addClasses(subtitleParagraph, ['subtitle']);

        // Set the text content of the elements
        titleParagraph.textContent = "SOUL FOOD";
        subtitleParagraph.textContent = "Not just chicken soup!";

        // Build the overall element
        titleDiv.appendChild(titleParagraph);
        subtitleDiv.appendChild(subtitleParagraph);

        headerDiv.appendChild(titleDiv);
        headerDiv.appendChild(subtitleDiv);

        return headerDiv;
    }

    // Define the body content. Return the top-level body div.
    createBody() {
        let centerDiv = makeDiv();
        let navDiv = makeDiv();
        let centerContentDiv = makeDiv();

        let homeDiv = makeDiv();
        let menuDiv = makeDiv();
        let contactDiv = makeDiv();

        centerDiv = addId(centerDiv, 'center');
        navDiv = addId(navDiv, 'nav-options');
        centerContentDiv = addId(centerContentDiv, 'center-content');

        homeDiv = addClasses(homeDiv, ['nav-option', 'selected']);
        menuDiv = addClasses(menuDiv, ['nav-option']);
        contactDiv = addClasses(contactDiv, ['nav-option']);

        homeDiv.textContent = (
            "HOME"
        );

        menuDiv.textContent = (
            "MENU"
        );

        contactDiv.textContent = (
            "CONTACT"
        );

        navDiv.appendChild(homeDiv);
        navDiv.appendChild(menuDiv);
        navDiv.appendChild(contactDiv);

        centerDiv.appendChild(navDiv);
        centerDiv.appendChild(centerContentDiv);
        return centerDiv;
    }

    // Define the footer content. Return the top-level footer div.
    createFooter() {
        // Create the necessary elements
        let footerDiv = makeDiv();

        let disclaimerParagraph = makeParagraph();
        let disclaimerDiv = makeDiv();

        // Set the required attributes on the elements
        footerDiv = addId(footerDiv, 'footer');
        disclaimerParagraph = addClasses(disclaimerParagraph, ['subtitle']);

        // Set the text content of the elements
        disclaimerParagraph.textContent = (
            "Establishment is not responsible for any level of addiction to gumbo"
        );
    
        // Build the overall element
        disclaimerDiv.appendChild(disclaimerParagraph);
        footerDiv.appendChild(disclaimerDiv);

        return footerDiv;
    }
}

