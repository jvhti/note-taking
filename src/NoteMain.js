import React from "react";
import './scss/NoteMain.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MediaQuery from 'react-responsive';
import MarkdownIt from 'markdown-it';
import "../node_modules/github-markdown-css/github-markdown.css";
import PubSub from 'pubsub-js';
import NoteManager from './NoteManager';
import Note from './Database/Note';
import {getObjectCopy} from "./Utils";

function ModeSwitchButton({ onSwitch, state }) {
    const isReadState = state === "read";
    return (
        <button onClick={ onSwitch } className={`note_main__switch_mode note_main__switch_mode--${state}`}>
            <FontAwesomeIcon size="2x" icon={isReadState ? "glasses" : "edit"}/>
            <span className="sr-only">{isReadState ? "Read" : "Edit"}</span>
        </button>
    );
}

function NoteEditor({ text, updateNoteText }) {
    return (
        <div className="note_main__editor">
            <textarea className="note_main__editor" value={text} onChange={updateNoteText}/>
        </div>
    );
}

function NoteViewer({ text }) {
    const parsedText = MarkdownIt().render(text);

    return (
        <div className="note_main__viewer">
            <div className="note_main__viewer__render markdown-body" dangerouslySetInnerHTML={{__html: parsedText}}/>
        </div>
    );
}

class NoteMain extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEditing: true,
            note: new Note()
        };

        this.switchMode = this.switchMode.bind(this);
        this.updateNoteText = this.updateNoteText.bind(this);
        this.updateNoteTitle = this.updateNoteTitle.bind(this);
        this.changeNote =  this.changeNote.bind(this);
        this.saveNote = this.saveNote.bind(this);
    }

    _changeNote(note) {
        this.setState({
            ...this.state,
            note
        });
    }

    changeNote(message, note){
        if(message !== "ChangeNote") return;

        // If there is a save timer waiting, cancel and execute immediately
        if(this._saveNoteTimer){
            clearTimeout(this._saveNoteTimer);
            this._saveNoteTimer = null;
            this.saveNote();
        }

        this._changeNote(note);
    }

    componentDidMount() {
        this.changeNoteSubscribeToken = PubSub.subscribe("ChangeNote", this.changeNote);
        NoteManager.database.getFirst().then((note) => {this._changeNote(note);});
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.changeNoteSubscribeToken);
    }

    switchMode(){
        this.setState({"isEditing": !this.state.isEditing});
    }



    updateNoteText(ev){
        let newNote = getObjectCopy(this.state.note);
        newNote.body = ev.target.value;

        this.setState({
            ...this.state,
            note: newNote
        });

        this.startSaveTimer();
    }

    updateNoteTitle(ev){
        let newNote = getObjectCopy(this.state.note);
        newNote.title = ev.target.value;

        this.setState({
            ...this.state,
            note: newNote
        });

        this.startSaveTimer();
    }


    saveNote() {
        console.log("save");
        this._saveNoteTimer = null;
        NoteManager.database.save(this.state.note).then((newNote) => {
            // if returns a new note, it means that the note was added to the database
            if(newNote){
                // I only copy the generated ID from the newNote, since this is a asynchronous
                // function, the current note can be newer (with editions).
                const stateNote = this.state.note;
                const note = new Note(newNote.id, stateNote.title, stateNote.body, stateNote.creationDate);

                this.setState({
                    ...this.state,
                    note
                });
            }
        });

        PubSub.publish("ReloadSideNavNotes");
    }

    startSaveTimer() {
        // Check if the timer exists, if it does, clear and reset
        if(this._saveNoteTimer){
            clearTimeout(this._saveNoteTimer);
            this._saveNoteTimer = null;
        }

        this._saveNoteTimer = setTimeout(this.saveNote, 750);
    }

    render() {
        if(!this.state.note) {
            // ToDo: Return a loading indicator
            return null;
        }

        const noteEditor = <NoteEditor text={this.state.note.body} updateNoteText={this.updateNoteText}/>;
        const noteViewer = <NoteViewer text={this.state.note.body}/>;
        return (
            <main className="note_main">
                <div className="note_main__title">
                    <input className="sidebar__options__search_bar" type="text" placeholder="Name your note..."
                           value={this.state.note.title} onChange={this.updateNoteTitle}/>
                </div>
                <div className="note_main__wrapper">
                    <MediaQuery minWidth="1000px">
                        { noteEditor }
                        { noteViewer }
                    </MediaQuery>
                    <MediaQuery maxWidth="1000px">
                        { this.state.isEditing ? noteEditor : noteViewer }
                    </MediaQuery>
                </div>
                <MediaQuery maxWidth="1000px">
                    <ModeSwitchButton onSwitch={this.switchMode} state={!this.state.isEditing ? "edit" : "read"}/>
                </MediaQuery>
            </main>
        );
    }
}

export default NoteMain;