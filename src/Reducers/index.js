import { combineReducers } from 'redux';
import {currentNote, notes} from './notes';

export default combineReducers({currentNote, notes})