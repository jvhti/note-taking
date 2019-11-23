import NoteManager from "../NoteManager";

const currentNote = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_NOTE':
            if(state && state.id !== action.note.id && state._saveNoteTimer)
                NoteManager.immediatelySaveNote(state);

            return action.note;

        default:
            return state
    }
};

export default currentNote
