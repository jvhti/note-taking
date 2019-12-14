import { combineReducers } from 'redux';
import { currentNote, notes } from './notes';
import { modal } from './modal';
import { optionsContextMenu } from './optionsContextMenu';

export default combineReducers({currentNote, notes, modal, optionsContextMenu});