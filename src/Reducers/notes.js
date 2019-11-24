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
            const newState = state.filter(x => x.id !== action.note.id);

            NoteManager.database.delete(action.note.id);

            return newState;
        default:
            return state;
    }
};
