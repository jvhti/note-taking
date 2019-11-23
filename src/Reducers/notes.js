const currentNote = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_NOTE':
            return action.note;

        default:
            return state
    }
};

export default currentNote
