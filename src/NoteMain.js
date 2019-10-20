import React from "react";
import './scss/NoteMain.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MediaQuery from 'react-responsive';
import MarkdownIt from 'markdown-it';
import "../node_modules/github-markdown-css/github-markdown.css";

// eslint-disable-next-line
const sampleText = "# 1\n" + "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +   "## 2\n" +    "### 3\n" +    "\n";


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
        this.state = {"isEditing": true, noteText: sampleText};

        this.switchMode = this.switchMode.bind(this);
        this.updateNoteText = this.updateNoteText.bind(this);
    }

    switchMode(){
        this.setState({"isEditing": !this.state.isEditing});
    }

    updateNoteText(ev){
        this.setState({
            ...this.state,
            noteText: ev.target.value
        });
    }

    render() {
        const noteEditor = <NoteEditor text={this.state.noteText} updateNoteText={this.updateNoteText}/>;
        const noteViewer = <NoteViewer text={this.state.noteText}/>;
        return (
            <main className="note_main">
                <div className="note_main__title">
                    <input className="sidebar__options__search_bar" type="text" placeholder="Name your note..."/>
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