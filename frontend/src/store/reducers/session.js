import { SessionActionTypes } from '../../constants';

const defaultState = {
    currentUser: '',
    isLoggedIn: null,
    loginError: '',
    registerError: '',
};

function sessionReducer(state = defaultState, action) {
    switch(action.type) {
        case SessionActionTypes.LOGIN_REQUEST_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            };
        case SessionActionTypes.LOGIN_REQUEST_FAILED:
            return{
                ...state,
                isLoggedIn: action.payload
            }
        case SessionActionTypes.LOGIN_ERROR:
            return{
                ...state,
                loginError: action.payload
            }
        case SessionActionTypes.REGISTER_ERROR:
            return{
                ...state,
                registerError: action.payload
            }
        default:
            return state;
    }
}


export default sessionReducer;