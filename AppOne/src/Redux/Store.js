import {createStore, applyMiddleware, combineReducers} from 'redux';

import reduxThunk from 'redux-thunk';
import {TestReducer} from './TestReducer';

const reducers = combineReducers({TestReducer});

export const Store = createStore(reducers, {}, applyMiddleware(reduxThunk));



