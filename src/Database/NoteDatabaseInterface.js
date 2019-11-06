import Note from "./Note";
import {List} from "immutable";
import {getObjectCopy, truncate} from "../Utils";

export default class NoteDatabaseInterface{
    notes;

    constructor(){
        this.notes = List();

        const n = new Note(1, "Test", "This is a text of a test is a text of a test");
        const n2 = new Note(2, "Note", "This is a text of a test");

        this.notes = this.notes.push(n);
        this.notes = this.notes.push(n2);
    }

    getList(titleFilter){
        return new Promise((resolve => {
            let notes = this.notes;

            if(titleFilter !== undefined)
                notes = notes.filter(x => x.title.toLowerCase().includes(titleFilter.toLowerCase()));

            resolve(notes.map(x => {
                let xCopy =  getObjectCopy(x);

                xCopy.body = truncate.apply(xCopy.body, [30, true]);

                if(!xCopy.title)
                    xCopy.title = "Untitled Note";

                return xCopy;
            }));
        }));
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
                const nextID = this.notes.last().id + 1;
                const newNote = new Note(nextID, noteObj.title, noteObj.body, noteObj.creationDate)
                this.notes = this.notes.push(newNote);
                return resolve(newNote);
            }else {
                const indexOf = this.notes.map(x => x.id).indexOf(noteObj.id);

                if(indexOf === -1)
                    return reject({err: "Trying to save a note without ID.", note: noteObj});

                this.notes = this.notes.set(indexOf, noteObj);
            }
            resolve();
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            const indexOf = this.notes.map(x => x.id).indexOf(id);

            if (indexOf === -1)
                return reject({err: "ID not found", id});

            this.notes = this.notes.remove(indexOf);
            resolve();
        });
    }
}