import { SessionActionTypes } from '../../constants';

const defaultState = {
    currentUser: '',
    isLoggedIn: null,
    notes: [],
};

function sessionReducer(state = defaultState, action) {
    switch(action.type) {
        case SessionActionTypes.LOGIN_REQUEST_SUCCESS:
            // console.log(action.payload);
            return {
                ...state,
                currentUser: action.payload
            };
        case SessionActionTypes.LOGIN_REQUEST_FAILED:
            return{
                ...state,
                isLoggedIn: action.payload
            }
        case SessionActionTypes.ALL_NOTES:
            return{
                ...state,
                notes: action.payload
            }
        default:
            return state;
    }
}


export default sessionReducer;