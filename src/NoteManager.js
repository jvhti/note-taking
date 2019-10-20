import NoteDatabaseInterface from "./Database/NoteDatabaseInterface";

class NoteManager{
    constructor(){
        if(!NoteManager.instance){
            this._database = new NoteDatabaseInterface();

            NoteManager.instance = this;
        }

        return NoteManager.instance;
    }

    get database(){ return this._database; }

}

const instance = new NoteManager();
Object.freeze(instance);

export default instance;