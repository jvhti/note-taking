import NoteManager from "../NoteManager";

export const currentNote = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_NOTE':
            if(state && state.id !== action.note.id && state._saveNoteTimer)
                NoteManager.immediatelySaveNote(state);

            return action.note;

        default:
            return state;
    }
};

export const notes = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_NOTES':
            return action.notes;
        case 'DELETE_NOTE':
            const newStateDelete = state.filter(x => x.id !== action.note.id);

            NoteManager.database.delete(action.note.id);

            return newStateDelete;
        case 'ADD_NOTE':
            const newStateAdd = Array.from(state);

            console.assert(action.note.id !== null, "Adding a note without ID to the list.");

            newStateAdd.push(action.note);

            return newStateAdd;
        case 'UPDATE_NOTE':
            return state.map((x) => {
                if(x.id !== action.note.id) return x;
                return action.note;
            });
        default:
            return state;
    }
};
