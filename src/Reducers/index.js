import { combineReducers } from 'redux';
import { currentNote, notes } from './notes';
import { modal } from './modal';

export default combineReducers({currentNote, notes, modal});