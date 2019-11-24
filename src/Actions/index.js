export const changeNote = note => ({
    type: 'CHANGE_NOTE',
    note
});

export const loadNotesList = (notes) => ({
    type: 'LOAD_NOTES',
    notes: notes
});

export const deleteNote = (note) => ({
    type: 'DELETE_NOTE',
    note
});


export const addNote = (note) => ({
    type: 'ADD_NOTE',
    note
});
