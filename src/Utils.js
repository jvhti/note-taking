import NoteManager from "./NoteManager";

export function getObjectCopy(obj){
    return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
}

// https://stackoverflow.com/questions/1199352/smart-way-to-truncate-long-strings
export function truncate(n, useWordBoundary){
    if (this.length <= n) { return this; }
    var subString = this.substr(0, n-1);
    return (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(' '))
        : subString) + "...";
}

export function copyToClipboard(text) {
    // From: https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}


export function noteToNoteList(x){
    let xCopy =  getObjectCopy(x);

    xCopy.body = truncate.apply(xCopy.body, [30, true]);

    if(!xCopy.title)
        xCopy.title = "Untitled Note";

    return xCopy;
}

export function updateCurrentNote(note, change, changeCurrentNoteDispatcher){
    let newNote = getObjectCopy(note);
    newNote = Object.assign(newNote, change);

    if(!newNote.id){
        NoteManager.database.save(newNote).then(x => {
            changeCurrentNoteDispatcher(x);
        });
    }else {
        NoteManager.startSaveTimer(newNote);
        changeCurrentNoteDispatcher(newNote);
    }
}