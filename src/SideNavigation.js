import React from "react";
import './scss/SideNavigation.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteManager from "./NoteManager";
import Note from "./Database/Note";
import ModalFactory from "./Factories/ModalFactory";
import MarkdownIt from 'markdown-it';
import {copyToClipboard} from "./Utils";
import {
    addNote,
    changeNote,
    closeModal,
    closeOptionsContextMenu,
    deleteNote,
    openOptionsContextMenu,
    showModal
} from "./Actions";
import {connect} from "react-redux";

function NotesListItemOptions({left, top, display, events}) {
    const style = {left, top, display};
    return (
        <ul style={style} className="notes_list__item__options_wrapper">
            <li onClick={events.onDelete} className="notes_list__item__options_wrapper__option"><button>Delete</button></li>
            <li onClick={events.onPrint} className="notes_list__item__options_wrapper__option"><button>Print</button></li>
            <li onClick={events.onShare} className="notes_list__item__options_wrapper__option"><button>Share</button></li>
            <li onClick={events.onDuplicate} className="notes_list__item__options_wrapper__option"><button>Duplicate</button></li>
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

        this.closeOptions = this.closeOptions.bind(this);

        this.onOptionsDelete = this.onOptionsDelete.bind(this);
        this.onOptionsDuplicate = this.onOptionsDuplicate.bind(this);
        this.onOptionsShare = this.onOptionsShare.bind(this);
        this.onOptionsPrint = this.onOptionsPrint.bind(this);
    }

    openOptions(key, ev){
        if(this.props.optionsContextMenu.id === key && this.props.optionsContextMenu.display === "block")
            this.props.closeOptionsContextMenuDispatcher();
        else {
            this.props.openOptionsContextMenuDispatcher(key, ev.clientX, ev.clientY);
            setTimeout(() => {
                window.addEventListener("click", this.closeOptions);
            }, 1);
        }
    };

    closeOptions(ev) {
        let parent = ev.target;
        do {
            parent = parent.parentElement;
        }while (parent != null && !parent.classList.contains("notes_list__item__header__options"));

        if (parent === null && this.props.optionsContextMenu.display === "block") {
            this.props.closeOptionsContextMenuDispatcher();
        }

        this.removeEventListenerCloseOptions();
    }

    removeEventListenerCloseOptions() {
        window.removeEventListener("click", this.closeOptions);
    }

    componentWillUnmount() {
        this.removeEventListenerCloseOptions();
    }

    onOptions(name, modalProto){
        const key = this.props.optionsContextMenu.id;
        if(!key){
            console.error(`Called ${name} menu option without an Option ID`);
            return;
        }

        const note = this.props.notes.find((x) => x.id === key);

        this.props.showModalDispatcher(modalProto(note));
    }

    onOptionsDelete(){
        const deleteModal = (note) => new ModalFactory(this.props.closeModalDispatcher)
            .setTitle("Deletion Confirmation")
            .setDescription([`Are you sure that you want to delete the '${note.title}' note?`])
            .addOption('Yes', () => {
                if(note.id === this.props.currentNoteId)
                    NoteManager.database.getFirst().then(x => this.props.updateCurrentNoteDispatcher( x || new Note()));

                this.props.deleteNoteDispatcher(note);
                }, 'modal__options__option--block')
            .addOption('No', () => {}, 'modal__options__option--block')
            .build();

        this.onOptions('DELETE', deleteModal);
    }

    onOptionsPrint(){
        const printModal = (note) => new ModalFactory(this.props.closeModalDispatcher)
            .setTitle("Print Confirmation")
            .setDescription(["Are you sure that you want to print this note?"])
            .addOption('Yes', () => {
                NoteManager.database.get(note.id).then((n) => {
                    const printWindow = window.open("", "_blank");
                    printWindow.document.write(`<h1>${n.title}</h1> <br/>` + MarkdownIt().render(n.body) + `<script>window.stop(); window.print(); window.close();</script>`);
                });

                }, 'modal__options__option--block')
            .addOption('No', () => {}, 'modal__options__option--block')
            .build();

        this.onOptions('PRINT', printModal);
    }

    onOptionsShare(){
        const shareModal = (note) => new ModalFactory(this.props.closeModalDispatcher)
            .setTitle("Share Options")
            .setDescription(["How do you want to share?"])
            .addOption('E-mail', () => {
                NoteManager.database.get(note.id).then((n) => {
                    window.open(`mailto:?Subject=${encodeURI(n.title)}&Body=${encodeURI(n.body)}`, '_blank');
                });
            }, 'modal__options__option--block')
            .addOption('Clipboard Markdown', () => {
                NoteManager.database.get(note.id).then((n) => copyToClipboard(n.body) );
            }, 'modal__options__option--block')
            .addOption('Clipboard HTML', () => {
                NoteManager.database.get(note.id).then((n) => copyToClipboard(MarkdownIt().render(n.body)));
            }, 'modal__options__option--block')
            .build();

        this.onOptions('SHARE', shareModal);
    }

    onOptionsDuplicate(){
        const duplicationModal = (note) => new ModalFactory(this.props.closeModalDispatcher)
            .setTitle("Duplication Confirmation")
            .setDescription([`Are you sure that you want to duplicate the '${note.title}' note?`])
            .addOption('Yes', () => {
                NoteManager.database.get(note.id).then((n) => {
                    const duplicatedNote = new Note(null, n.title, n.body);

                    NoteManager.database.save(duplicatedNote)
                        .then((x) => {
                            this.props.updateCurrentNoteDispatcher(x);
                            this.props.addNoteDispatcher(x);
                        });
                });
            }, 'modal__options__option--block')
            .addOption('No', () => {}, 'modal__options__option--block')
            .build();

        this.onOptions('DUPLICATE', duplicationModal);
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
            this.props.updateCurrentNoteDispatcher(x);
        });
    }

    render() {
        const notes = this.props.filterByTitle ?
            (this.props.notes || [])
                .filter(x => x.title.toLowerCase().includes(this.props.filterByTitle.toLowerCase()))
            : (this.props.notes || []);

        return (
            <React.Fragment>
                <ul className="notes_list">
                    { (notes || []).map((note) =>
                        <NotesListItem key={note.id} onOpenOptions={this.openOptions.bind(this, note.id)}
                                       title={note.title} body={note.body} onClick={this.openNote.bind(this, note.id)}/>)}
                </ul>
                <NotesListItemOptions events={{
                    onDelete: this.onOptionsDelete,
                    onPrint: this.onOptionsPrint,
                    onShare: this.onOptionsShare,
                    onDuplicate: this.onOptionsDuplicate
                }} display={this.props.optionsContextMenu.display} left={this.props.optionsContextMenu.x} top={this.props.optionsContextMenu.y}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes,
        currentNoteId: (state.currentNote || {id: null}).id,
        optionsContextMenu: state.optionsContextMenu
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentNoteDispatcher: (note) => dispatch(changeNote(note)),
        deleteNoteDispatcher: (note) => dispatch(deleteNote(note)),
        addNoteDispatcher: (note) => dispatch(addNote(note)),
        showModalDispatcher: (modal) => dispatch(showModal(modal)),
        closeModalDispatcher: (modal) => dispatch(closeModal(modal)),
        openOptionsContextMenuDispatcher: (id, x, y) => dispatch(openOptionsContextMenu(id, x, y)),
        closeOptionsContextMenuDispatcher: () => dispatch(closeOptionsContextMenu())
    }
};

const NotesListConnected = connect(mapStateToProps, mapDispatchToProps)(NotesList);

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
                    <button className="sidebar__options__new_note" onClick={() => NoteManager.createNewNote()}>
                        <FontAwesomeIcon icon="file-alt"/><span className="sr-only">Create new note</span>
                    </button>
                </div>
                <hr className="sidebar__separator"/>
                <NotesListConnected filterByTitle={this.state.searchValue}/>
            </aside>
        );
    }
}

export default SideNavigation;