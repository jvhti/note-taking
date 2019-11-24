export const modal = (state = null, action) => {
    switch (action.type) {
        case 'SHOW_MODAL':
            return action.modal;
        case 'CLOSE_MODAL':
            return null;
        default:
            return state;
    }
};
