import { combineReducers } from 'redux';
import session from './session';
//import loginreducer from './loginreducer'

const rootReducer = combineReducers({
    session,
});

export default rootReducer;