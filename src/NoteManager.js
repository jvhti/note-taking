import NoteLocalStorageDatabase from "./Database/NoteLocalStorageDatabase";
import {addNote, changeNote, loadNotesList, updateNote} from "./Actions";
import {noteToNoteList} from "./Utils";
import Note from "./Database/Note";

class NoteManager{
    constructor(){
        if(!NoteManager.instance){
            this._database = new NoteLocalStorageDatabase();

            this._store = null;

            NoteManager.instance = this;
        }

        return NoteManager.instance;
    }

    get database(){ return this._database; }
    set store(s) { this._store = s; }


    createNewNote() {
        this._store.dispatch(changeNote(new Note()));
    }

    saveNote(note) {
        console.log("save");
        delete note._saveNoteTimer;

        this.database.save(note).then(x => {
             if(!note.id && x) {
                 this._store.dispatch(addNote(noteToNoteList(x)));
             }else if(this._store.getState().notes.filter(x => x.id === note.id).length)
                 this._store.dispatch(updateNote(noteToNoteList(note)));
             else
                 this._store.dispatch(addNote(noteToNoteList(note)));
        });
    }

    startSaveTimer(note) {
        // Check if the timer exists, if it does, clear and reset
        if(note._saveNoteTimer){
            clearTimeout(note._saveNoteTimer);
            note._saveNoteTimer = null;
        }

        note._saveNoteTimer = setTimeout(() => this.saveNote(note), 750);
    }

    immediatelySaveNote(note){
        // If there is a save timer waiting, cancel and execute immediately
        if(note._saveNoteTimer){
            clearTimeout(note._saveNoteTimer);
            note._saveNoteTimer = null;
            this.saveNote(note);
        }
    }

    updateStoreNoteList(){
        this.database.getList().then((l) => {
            this._store.dispatch(loadNotesList(l.toJS()));
        });
    }
}

const instance = new NoteManager();

export default instance;