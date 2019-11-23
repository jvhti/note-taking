import React from "react";
import './scss/SideNavigation.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteManager from "./NoteManager";
import PubSub from 'pubsub-js';
import Note from "./Database/Note";
import ModalFactory from "./Factories/ModalFactory";

function NotesListItemOptions({left, top, display, events}) {
    const style = {left, top, display};
    return (
        <ul style={style} className="notes_list__item__options_wrapper">
            <li onClick={events.onDelete} className="notes_list__item__options_wrapper__option"><a href="#">Delete</a></li>
            <li onClick={events.onPrint} className="notes_list__item__options_wrapper__option"><a href="#">Print</a></li>
            <li onClick={events.onShare} className="notes_list__item__options_wrapper__option"><a href="#">Share</a></li>
            <li onClick={events.onDuplicate} className="notes_list__item__options_wrapper__option"><a href="#">Duplicate</a></li>
        </ul>
    );
}

function NotesListItem(props) {
    return (
        <li className="notes_list__item" tabIndex="0" onClick={props.onClick}>
            <div className="notes_list__item__header">
                <span className="notes_list__item__header__title">{props.title}</span>
                <button className="notes_list__item__header__options" onClick={props.onOpenOptions}>
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

        this.closeOptions = this.closeOptions.bind(this);
        this.updateList = this.updateList.bind(this);

        this.onOptionsDelete = this.onOptionsDelete.bind(this);
        this.onOptionsDuplicate = this.onOptionsDuplicate.bind(this);
    }

    updateList(){
        NoteManager.database.getList(this.props.filterByTitle).then((x) => this.setState({
            ...this.state,
            notes: x
        }));
    }

    componentDidMount() {
        this.updateList();

        this.reloadNotesSubscribeToken = PubSub.subscribe("ReloadSideNavNotes", (message) => {
            if(message !== "ReloadSideNavNotes") return;

            this.updateList();
        });
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
        if(this.reloadNotesSubscribeToken)
            PubSub.unsubscribe(this.reloadNotesSubscribeToken);
    }

    onOptionsDelete(){
        const key = this.state.options.id;
        if(!key){
            console.error("Called DELETE menu option without an Option ID");
            return;
        }

        const note = this.state.notes.find((x) => x.id === key);

        const description = `Are you sure that you want to delete the '${note.title}' note?`;

        const deleteModal = new ModalFactory()
            .setTitle("Deletion Confirmation")
            .setDescription([description])
            .addOption('Yes', () => {
                NoteManager.database.delete(key)
                    .then(() => { PubSub.publish("ReloadSideNavNotes"); })
                    .then(() => { return NoteManager.database.get(1); })
                    .then((x) => { PubSub.publish("ChangeNote", x || new Note()); })
            }, 'modal__options__option--block')
            .addOption('No', () => {}, 'modal__options__option--block')
            .build();

        PubSub.publish('OpenModal', deleteModal);
    }

    onOptionsPrint(ev){console.log("PRINT", ev);}
    onOptionsShare(ev){console.log("SHARE", ev);}

    onOptionsDuplicate(ev){
        const key = this.state.options.id;
        if(!key){
            console.error("Called DUPLICATE menu option without an Option ID");
            return;
        }

        const note = this.state.notes.find((x) => x.id === key);

        const description = `Are you sure that you want to duplicate the '${note.title}' note?`;

        const duplicationModal = new ModalFactory()
            .setTitle("Duplication Confirmation")
            .setDescription([description])
            .addOption('Yes', () => {
                const duplicatedNote = new Note(null, note.title, note.body);

                NoteManager.database.save(duplicatedNote)
                    .then((x) => { PubSub.publish("ChangeNote", x); PubSub.publish("ReloadSideNavNotes"); });
            }, 'modal__options__option--block')
            .addOption('No', () => {}, 'modal__options__option--block')
            .build();

        PubSub.publish('OpenModal', duplicationModal);
    }

    openNote(key, ev){
        // Checks if this click is for the Note Options button or the Note
        let parent = ev.target;

        do {
            parent = parent.parentElement;

            if(parent != null && parent.classList.contains("notes_list__item")) parent = null;
        }while (parent != null && !parent.classList.contains("notes_list__item__header__options"));

        if(parent != null) return;

        NoteManager.database.get(key).then((x) => {
            PubSub.publish("ChangeNote", x);
        });
    }

    render() {
        return (
            <React.Fragment>
                <ul className="notes_list">
                    { this.state.notes.map((note) =>
                        <NotesListItem key={note.id} onOpenOptions={this.openOptions.bind(this, note.id)}
                                       title={note.title} body={note.body} onClick={this.openNote.bind(this, note.id)}/>)}
                </ul>
                <NotesListItemOptions events={{
                    onDelete: this.onOptionsDelete,
                    onPrint: this.onOptionsPrint,
                    onShare: this.onOptionsShare,
                    onDuplicate: this.onOptionsDuplicate
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
        this.createNewNote = this.createNewNote.bind(this);
    }

    updateSearchValue(ev){
        this.setState({
            ...this.state,
            searchValue: ev.target.value
        });
    }

    createNewNote() {
        PubSub.publish("ChangeNote", new Note());
    }

    render() {
        return (
            <aside className="sidebar">
                <div className="sidebar__options">
                    <input className="sidebar__options__search_bar" type="search" placeholder="Search Notes"
                           value={this.state.searchValue} onChange={this.updateSearchValue}/>
                    <button className="sidebar__options__new_note" onClick={this.createNewNote}><FontAwesomeIcon icon="file-alt"/><span
                        className="sr-only">Create new note</span></button>
                </div>
                <hr className="sidebar__separator"/>
                <NotesList filterByTitle={this.state.searchValue}/>
            </aside>
        );
    }
}

export default SideNavigation;