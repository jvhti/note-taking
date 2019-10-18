import React from "react";
import './scss/SideNavigation.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function NotesListItem() {
    return (
        <li className="notes_list__item" tabIndex="0">
            <div className="notes_list__item__header">
                <span className="notes_list__item__header__title">Title of the Note</span>
                <button className="notes_list__item__header__options"><FontAwesomeIcon icon="ellipsis-h"/><span className="sr-only">Options for note Title of the Note</span></button>
            </div>
            <p className="notes_list__item__content">lorem ipsum dolor sit amet</p>
        </li>
    );
}

function NotesList() {
    const notes = [1, 2, 3];
    return (
        <ul className="notes_list">
            { notes.map((n) => <NotesListItem key={n}/>) }
        </ul>
    );
}

function SideNavigation() {
    return (
        <aside className="sidebar">
            <div className="sidebar__options">
                <input className="sidebar__options__search_bar" type="search" placeholder="Search Notes"/>
                <button className="sidebar__options__new_note"><FontAwesomeIcon icon="file-alt"/><span className="sr-only">Create new note</span></button>
            </div>
            <hr className="sidebar__separator"/>
            <NotesList/>
        </aside>
    );
}

export default SideNavigation;