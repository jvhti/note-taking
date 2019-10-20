import React from "react";
import './scss/SideNavigation.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteDatabaseInterface from "./Database/NoteDatabaseInterface";

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
                <span className="notes_list__item__header__title">{props.title}</span>
                <button className="notes_list__item__header__options" onClick={(ev) => {props.onOpenOptions(ev);}}>
                    <FontAwesomeIcon icon="ellipsis-h"/><span className="sr-only">Options for note Title of the Note</span>
                </button>
            </div>
            <p className="notes_list__item__content">{props.body}</p>
        </li>
    );
}

class NotesList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            options: {
                display: "none",
                x: 0,
                y: 0,
                id: null
            },
            notes: []
        };

        this.database = new NoteDatabaseInterface();

        this.closeOptions = this.closeOptions.bind(this);
        this.updateList = this.updateList.bind(this);
    }

    updateList(){
        this.database.getList(this.props.filterByTitle).then((x) => this.setState({
            ...this.state,
            notes: x
        }));
    }

    componentDidMount() {
        this.updateList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.filterByTitle !== this.props.filterByTitle)
            this.updateList();
    }

    openOptions(key, ev){
        const newState = {
            ...this.state,
            options : {
                ...this.state.options,
                x: ev.clientX,
                y: ev.clientY,
                display: this.state.options.id === key && this.state.options.display === "block" ? "none" : "block",
                id: key
            }
        };

        this.setState(newState);

        if (newState.options.display === "block")
            setTimeout(() => {
                window.addEventListener("click", this.closeOptions);
            }, 1);
    };

    closeOptions(ev) {
        let parent = ev.target;
        do {
            parent = parent.parentElement;
        }while (parent != null && !parent.classList.contains("notes_list__item__header__options"));

        if (parent === null && this.state.options.display === "block")
            this.setState({
                ...this.state,
                options: {
                    ...this.state.options,
                    display: "none",
                    id: null
                }
            });

        window.removeEventListener("click", this.closeOptions);
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.closeOptions);
    }

    onOptionsDelete(ev){console.log("DELETE", ev);}
    onOptionsPrint(ev){console.log("PRINT", ev);}
    onOptionsShare(ev){console.log("SHARE", ev);}

    render() {
        return (
            <React.Fragment>
                <ul className="notes_list">
                    { this.state.notes.map((note) =>
                        <NotesListItem key={note.id} onOpenOptions={this.openOptions.bind(this, note.id)}
                                       title={note.title} body={note.body}/>)}
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

class SideNavigation extends React.Component {
    constructor(props){
        super(props);

        this.state = {searchValue: ""};

        this.updateSearchValue = this.updateSearchValue.bind(this);
    }

    updateSearchValue(ev){
        this.setState({
            ...this.state,
            searchValue: ev.target.value
        });
    }

    render() {
        return (
            <aside className="sidebar">
                <div className="sidebar__options">
                    <input className="sidebar__options__search_bar" type="search" placeholder="Search Notes"
                           value={this.state.searchValue} onChange={this.updateSearchValue}/>
                    <button className="sidebar__options__new_note"><FontAwesomeIcon icon="file-alt"/><span
                        className="sr-only">Create new note</span></button>
                </div>
                <hr className="sidebar__separator"/>
                <NotesList filterByTitle={this.state.searchValue}/>
            </aside>
        );
    }
}

export default SideNavigation;