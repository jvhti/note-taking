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

export const updateNote = (note) => ({
    type: 'UPDATE_NOTE',
    note
});

export const showModal = (modal) => ({
    type: 'SHOW_MODAL',
    modal
});

export const closeModal = () => ({
    type: 'CLOSE_MODAL'
});

export const openOptionsContextMenu = (id, x, y) => ({
    type: 'OPEN_OPTIONS_CONTEXT_MENU',
    id,
    x,
    y
});

export const closeOptionsContextMenu = () => ({
    type: 'CLOSE_OPTIONS_CONTEXT_MENU'
});