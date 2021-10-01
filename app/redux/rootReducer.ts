import { combineReducers } from 'redux';

import currenciesState from './currencies/currenciesStateSlice';
import themeState from './theme/themeStateSlice';

const appReducer = combineReducers({
  themeState,
  currenciesState,
});

export default appReducer;
