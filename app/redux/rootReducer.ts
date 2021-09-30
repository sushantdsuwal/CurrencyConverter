import appState from './appState/appStateSlice';
import {combineReducers} from 'redux';

const appReducer = combineReducers({
  appState,
});

export default appReducer;
