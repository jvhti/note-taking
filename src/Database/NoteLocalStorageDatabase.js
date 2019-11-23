import Note from "./Note";
import NoteDatabaseInterface from "./NoteDatabaseInterface";

export default class NoteLocalStorageDatabase extends NoteDatabaseInterface{
    constructor(){
        super();

        if(!localStorage.getItem('notes')) {
            this.updateStorage();
        }else{
            this.loadFromStorage();
        }

        this._postSave = () => this.updateStorage();
    }

    updateStorage(){
        localStorage.setItem('noteCount', String(this.notes.size));
        localStorage.setItem('notes', JSON.stringify(this.notes.toJS()));
    }

    loadFromStorage(){
        const notesList = JSON.parse(localStorage.getItem('notes'));

        for(let i = 0; i < notesList.length; ++i){
            const n = notesList[i];

            if(!n.hasOwnProperty('_id') || !n.hasOwnProperty('_title') || !n.hasOwnProperty('_body') ||
                !n.hasOwnProperty('_creationDate')){
                console.error("Invalid note.", n, "Index: "+i);
                continue;
            }

            const t = new Note(n._id, n._title, n._body, n._creationDate);

            this.notes = this.notes.push(t);
        }
    }
}