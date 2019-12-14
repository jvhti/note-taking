const defaultOptionsContextMenuState = {
    display: "none",
    x: 0,
    y: 0,
    id: null
};

export const optionsContextMenu = (state = defaultOptionsContextMenuState, action) => {
    switch (action.type) {
        case 'OPEN_OPTIONS_CONTEXT_MENU':
            return {
                ...state,
                id: action.id,
                x: action.x,
                y: action.y,
                display: "block"
            };
        case 'CLOSE_OPTIONS_CONTEXT_MENU':
            return {...state, ...defaultOptionsContextMenuState};
        default:
            return state;
    }
};