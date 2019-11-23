import NoteLocalStorageDatabase from "./Database/NoteLocalStorageDatabase";
import PubSub from "pubsub-js";

class NoteManager{
    constructor(){
        if(!NoteManager.instance){
            this._database = new NoteLocalStorageDatabase();

            NoteManager.instance = this;
        }

        return NoteManager.instance;
    }

    get database(){ return this._database; }

    saveNote(note) {
        console.log("save");
        note._saveNoteTimer = null;
        this.database.save(note);

        PubSub.publish("ReloadSideNavNotes");
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
}

const instance = new NoteManager();
Object.freeze(instance);

export default instance;