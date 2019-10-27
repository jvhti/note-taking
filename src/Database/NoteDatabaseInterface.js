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

            if (!noteObj.id) {
                return reject({err: "Trying to save a note without ID.", note: noteObj});
            }

            const indexOf = this.notes.map(x => x.id).indexOf(noteObj.id);
            this.notes = this.notes.set(indexOf, noteObj);

            resolve();
        });
    }
}