/* A JS file containing basic DOM manipulation functions */

export function makeDiv() {
    return document.createElement('div');
}

export function makeParagraph() {
    return document.createElement('p');
}

export function addClasses(element, classArray) {
    classArray.forEach(classAttribute => {
        element.classList.add(classAttribute);        
    });   
    return element; 
}

export function addId(element, idValue) {
    element.setAttribute('id', idValue);
    return element;
}

export function setNewContent(bodyElem, [newContentElemArray]) {
    // We gotta be doing some serious stuff here
    while (bodyElem.firstChild) {
        bodyElem.removeChild(bodyElem.firstChild);
    }

    newContentElemArray.forEach(bodyElem.appendChild(newElem));
}