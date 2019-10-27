export default class Note{
    constructor(id, title, body, creationDate){
        this._id = id || null;
        this._title = title || "";
        this._body = body || "";
        this._creationDate = creationDate || new Date();
    }

    get id(){ return this._id; }
    get creationDate(){ return this._creationDate; }
    get title(){ return this._title; }
    get body(){ return this._body; }

    set title(newTitle) { this._title = newTitle; }
    set body(newBody) { this._body = newBody; }
};