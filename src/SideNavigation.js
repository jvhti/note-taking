import React from "react";
import './scss/SideNavigation.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function NotesListItemOptions() {
    return (
        <ul className="notes_list__item__options_wrapper">
            <li className="notes_list__item__options_wrapper__option"><a href="#">Delete</a></li>
            <li className="notes_list__item__options_wrapper__option"><a href="#">Print</a></li>
            <li className="notes_list__item__options_wrapper__option"><a href="#">Share</a></li>
        </ul>
    );
}

function NotesListItem(props) {
    const options = props.isOptionsOpen === true ? <NotesListItemOptions/> : undefined;
    return (
        <li className="notes_list__item" tabIndex="0">
            <div className="notes_list__item__header">
                <span className="notes_list__item__header__title">Title of the Note</span>
                <button className="notes_list__item__header__options"><FontAwesomeIcon icon="ellipsis-h"/><span className="sr-only">Options for note Title of the Note</span></button>
            </div>
            <p className="notes_list__item__content">lorem ipsum dolor sit amet</p>
            {options}
        </li>
    );
}

class NotesList extends React.Component {

    constructor(props){
        super(props);
        this.notes = [1];
    }

    render() {
        return (
            <ul className="notes_list">
                {this.notes.map((n) => <NotesListItem isOptionsOpen={true} key={n}/>)}
            </ul>
        );
    }
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