import { createStore } from 'redux';
import rootReducer from './Reducers';
import {changeNote} from './Actions';
import NoteManager from "./NoteManager";

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(rootReducer);

store.subscribe(() => console.log(store.getState()));

NoteManager.database.getFirst().then((note) => {
    store.dispatch(changeNote(note));
});

export default store;