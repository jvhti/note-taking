import React from "react";
import './scss/SideNavigation.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function NotesListItemOptions({left, top, display, events}) {
    const style = {left, top, display};
    return (
        <ul style={style} className="notes_list__item__options_wrapper">
            <li onClick={events.onDelete} className="notes_list__item__options_wrapper__option"><a href="#">Delete</a></li>
            <li onClick={events.onPrint} className="notes_list__item__options_wrapper__option"><a href="#">Print</a></li>
            <li onClick={events.onShare} className="notes_list__item__options_wrapper__option"><a href="#">Share</a></li>
        </ul>
    );
}

function NotesListItem(props) {
    return (
        <li className="notes_list__item" tabIndex="0">
            <div className="notes_list__item__header">
                <span className="notes_list__item__header__title">Title of the Note</span>
                <button className="notes_list__item__header__options" onClick={(ev) => {props.onOpenOptions(ev);}}><FontAwesomeIcon icon="ellipsis-h"/><span className="sr-only">Options for note Title of the Note</span></button>
            </div>
            <p className="notes_list__item__content">lorem ipsum dolor sit amet</p>
        </li>
    );
}

class NotesList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            options: {
                display: "none",
                x: 222,
                y: 84
            }
        };

        this.notes = [1];

        this.closeOptions = this.closeOptions.bind(this);
    }

    openOptions(key, ev){
        const newState = {
            ...this.state,
            options : {
                    ...this.state.options,
                    x: ev.clientX,
                    y: ev.clientY,
                    display: this._toggleOptionsVisibility()
            }
        };

        this.setState(newState);

        if (newState.options.display === "block")
            setTimeout(() => {
                window.addEventListener("click", this.closeOptions);
            }, 1);
    };

    _toggleOptionsVisibility(){
        return this.state.options.display === "block" ? "none" : "block";
    }

    closeOptions() {
        if (this.state.options.display === "block")
            this.setState({
                ...this.state,
                options: {
                    ...this.state.options,
                    display: "none"
                }
            });

        window.removeEventListener("click", this.closeOptions);
    }

    onOptionsDelete(ev){console.log("DELETE", ev);}
    onOptionsPrint(ev){console.log("PRINT", ev);}
    onOptionsShare(ev){console.log("SHARE", ev);}

    render() {
        return (
            <React.Fragment>
                <ul className="notes_list">
                    {this.notes.map((n) => <NotesListItem onOpenOptions={this.openOptions.bind(this, n)} key={n}/>)}
                </ul>
                <NotesListItemOptions events={{
                    onDelete: this.onOptionsDelete,
                    onPrint: this.onOptionsPrint,
                    onShare: this.onOptionsShare
                }} display={this.state.options.display} left={this.state.options.x} top={this.state.options.y}/>
                {/* Can pick left and top offset from ev.pageX and ev.pageY */}
            </React.Fragment>
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