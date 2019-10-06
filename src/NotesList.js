import React from "react";
import './scss/NotesList.scss';
import NotesListItem from "./NotesListItem";

function NotesList() {
    const notes = [1, 2, 3, 4, 5, 6, 7];
    return (
        <ul className="notes_list">
            { notes.map((n) => <NotesListItem key={n}/>) }
        </ul>
    );
}

export default NotesList;