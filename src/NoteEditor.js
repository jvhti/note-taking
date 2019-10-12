import React from "react";
import './scss/NoteEditor.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// eslint-disable-next-line
const text = "# 1\n" + "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +    "## 2\n" +    "### 3\n" +    "# 1\n" +   "## 2\n" +    "### 3\n" +    "\n";

function NoteEditor() {
    return (
        <main className="note_editor">
            <div className="note_editor__title">
                <input className="sidebar__options__search_bar" type="text" placeholder="Name your note..."/>
            </div>
            <div className="note_editor__editor">
                <textarea className="note_editor__editor">{text}</textarea>
            </div>
            <button className="note_editor__switch_mode"><FontAwesomeIcon size="2x" icon="glasses"/><span className="sr-only">Read</span></button>
        </main>
    );
}

export default NoteEditor;