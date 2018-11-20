import { combineReducers } from 'redux';
import session from './session';
//import loginreducer from './loginreducer'
import socket from './socket';
import app from './app';

const rootReducer = combineReducers({
    session,
    socket,
    app
});

export default rootReducer;