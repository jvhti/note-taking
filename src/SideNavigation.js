import React from "react";
import './scss/SideNavigation.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NotesList from "./NotesList";

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