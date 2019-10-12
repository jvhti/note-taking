import React from "react";
import './scss/NoteEditor.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// eslint-disable-next-line
const text = "# 1\n" + "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +   "## 2\n" +    "### 3\n" +    "\n";

function ModeSwitchButton(props) {
    const isReadState = props.state === "read";
    return (
        <button className={`note_editor__switch_mode note_editor__switch_mode--${props.state}`}>
            <FontAwesomeIcon size="2x" icon={isReadState ? "glasses" : "edit"}/>
            <span className="sr-only">{isReadState ? "Read" : "Edit"}</span>
        </button>
    );
}

function NoteEditor() {
    return (
        <main className="note_editor">
            <div className="note_editor__title">
                <input className="sidebar__options__search_bar" type="text" placeholder="Name your note..."/>
            </div>
            <div className="note_editor__editor">
                <textarea className="note_editor__editor">{text}</textarea>
            </div>
            <ModeSwitchButton state="edit"/>
        </main>
    );
}

export default NoteEditor;