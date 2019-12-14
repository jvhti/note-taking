import Note from "./Note";
import {List} from "immutable";
import {noteToNoteList} from "../Utils";

export default class NoteDatabaseInterface{
    constructor(){
        this.notes = List();
    }

    getList(titleFilter){
        return new Promise((resolve => {
            let notes = this.notes;

            if(titleFilter !== undefined)
                notes = notes.filter(x => x.title.toLowerCase().includes(titleFilter.toLowerCase()));

            resolve(notes.map(x => noteToNoteList(x)));
        }));
    }

    getFirst(){
        return new Promise((resolve => resolve(this.notes.first())));
    }

    get(id){
        return new Promise((resolve => resolve(this.notes.find(x => x.id === id))));
    }

    save(noteObj) {
        return new Promise((resolve, reject) => {
            if (!noteObj) {
                return reject({err: "Trying to save a invalid note object.", note: noteObj});
            }

            // Check if needs to add or update the note
            if (!noteObj.id) {
                const nextID = (this.notes && this.notes.size > 0 ? this.notes.last().id : 0) + 1;
                const newNote = new Note(nextID, noteObj.title, noteObj.body, noteObj.creationDate);
                this.notes = this.notes.push(newNote);

                if(typeof this._postSave === 'function') this._postSave();

                return resolve(newNote);
            }else {
                const indexOf = this.notes.map(x => x.id).indexOf(noteObj.id);

                if(indexOf === -1)
                    return reject({err: "Trying to save a note without ID.", note: noteObj});

                this.notes = this.notes.set(indexOf, noteObj);
            }
            if(typeof this._postSave === 'function') this._postSave();
            resolve();
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            const indexOf = this.notes.map(x => x.id).indexOf(id);

            if (indexOf === -1)
                return reject({err: "ID not found", id});

            this.notes = this.notes.remove(indexOf);
            if(typeof this._postSave === 'function') this._postSave();
            resolve();
        });
    }
}