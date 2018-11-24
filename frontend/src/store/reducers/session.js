import { SessionActionTypes } from '../../constants';

const defaultState = {
    currentUser: '',
    isLoggedIn: null,
};

function sessionReducer(state = defaultState, action) {
    switch(action.type) {
        case SessionActionTypes.LOGIN_REQUEST_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                currentUser: action.payload
            };
        case SessionActionTypes.LOGIN_REQUEST_FAILED:
            return{
                ...state,
                isLoggedIn: action.payload
            }
        default:
            return state;
    }
}


export default sessionReducer;