import React from "react";
import './scss/NotesList.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function NotesList() {
    return (
        <ul className="notes_list">
            <li className="notes_list__item" tabIndex="0">
                <div className="notes_list__item__header">
                    <span className="notes_list__item__header__title">Title of the Note</span>
                    <button className="notes_list__item__header__options"><FontAwesomeIcon icon="ellipsis-h"/><span className="sr-only">Options for note Title of the Note</span></button>
                </div>
                <p className="notes_list__item__content">lorem ipsum dolor sit amet</p>
            </li>
        </ul>
    );
}

export default NotesList;