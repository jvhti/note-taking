import React from "react";
import './scss/NoteMain.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MediaQuery from 'react-responsive';
import MarkdownIt from 'markdown-it';
import "../node_modules/github-markdown-css/github-markdown.css";
import {updateCurrentNote} from "./Utils";
import {addNote, changeNote} from './Actions';
import {connect} from "react-redux";

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
            isEditing: true
        };

        this.switchMode = this.switchMode.bind(this);

        this.updateNote = (change) => updateCurrentNote(this.props.note, change, this.props.changeCurrentNoteDispatcher);
    }

    switchMode(){
        this.setState({isEditing: !this.state.isEditing});
    }

    render() {
        if(!this.props.note) {
            // ToDo: Return a loading indicator
            return null;
        }

        const noteEditor = <NoteEditor text={this.props.note.body} updateNoteText={(ev) => this.updateNote({body: ev.target.value})}/>;
        const noteViewer = <NoteViewer text={this.props.note.body}/>;

        return (
            <main className="note_main">
                <div className="note_main__title">
                    <input className="sidebar__options__search_bar" type="text" placeholder="Name your note..."
                           value={this.props.note.title} onChange={(ev) => this.updateNote({title: ev.target.value})}/>
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

const mapStateToProps = (state) => ({
    note: state.currentNote
});

const mapDispatchToProps = (dispatch) => ({
    changeCurrentNoteDispatcher: (note) => dispatch(changeNote(note)),
    addNoteDispatcher: (note) => dispatch(addNote(note))
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteMain);