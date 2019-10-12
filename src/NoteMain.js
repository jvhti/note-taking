import React from "react";
import './scss/NoteMain.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// eslint-disable-next-line
const text = "# 1\n" + "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +   "## 2\n" +    "### 3\n" +    "\n";

function ModeSwitchButton(props) {
    const isReadState = props.state === "read";
    return (
        <button className={`note_main__switch_mode note_main__switch_mode--${props.state}`}>
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

function NoteMain() {
    return (
        <main className="note_main">
            <div className="note_main__title">
                <input className="sidebar__options__search_bar" type="text" placeholder="Name your note..."/>
            </div>
            { /* <NoteEditor/> */ }
            <NoteViewer/>

            <ModeSwitchButton state="edit"/>
        </main>
    );
}

export default NoteMain;