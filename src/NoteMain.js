import React from "react";
import './scss/NoteMain.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MediaQuery from 'react-responsive';

// eslint-disable-next-line
const text = "# 1\n" + "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +   "## 2\n" +    "### 3\n" +    "\n";


function ModeSwitchButton(props) {
    const isReadState = props.state === "read";
    return (
        <button onClick={props.onSwitch} className={`note_main__switch_mode note_main__switch_mode--${props.state}`}>
            <FontAwesomeIcon size="2x" icon={isReadState ? "glasses" : "edit"}/>
            <span className="sr-only">{isReadState ? "Read" : "Edit"}</span>
        </button>
    );
}

function NoteEditor() {
    return (
        <div className="note_main__editor">
            <textarea className="note_main__editor">{text}</textarea>
        </div>
    );
}

function NoteViewer() {
    return (
        <div className="note_main__viewer">
            <div className="note_main__viewer__render">
                {}
            </div>
        </div>
    );
}

class NoteMain extends React.Component{
    constructor(props){
        super(props);
        this.state = {"isEditing": true};

        this.switchMode = this.switchMode.bind(this);
    }

    switchMode(){
        this.setState({"isEditing": !this.state.isEditing});
    }

    render() {
        return (
            <main className="note_main">
                <div className="note_main__title">
                    <input className="sidebar__options__search_bar" type="text" placeholder="Name your note..."/>
                </div>
                <div className="note_main__wrapper">
                    <MediaQuery minWidth="1000px">
                        <NoteEditor/>
                        <NoteViewer/>
                    </MediaQuery>
                    <MediaQuery maxWidth="1000px">
                        { this.state.isEditing ? <NoteEditor/> : <NoteViewer/> }
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