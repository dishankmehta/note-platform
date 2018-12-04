import { SessionActionTypes} from '../../constants';

const defaultState = {
    currentUser: '',
    isLoggedIn: null,
    loginError: '',
    registerError: '',
    publicNotes: [],
    privateNotes: [],
    searchField: '',
};

function sessionReducer(state = defaultState, action) {
    switch(action.type) {
        case SessionActionTypes.LOGIN_REQUEST_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isLoggedIn: true
            };
        case SessionActionTypes.LOGIN_REQUEST_FAILED:
            return{
                ...state,
                isLoggedIn: action.payload
            }
        case SessionActionTypes.LOGIN_ERROR:
            return{
                ...state,
                loginError: action.payload,
                isLoggedIn: false
            }
        case SessionActionTypes.REGISTER_ERROR:
            return{
                ...state,
                registerError: action.payload
            }
        case SessionActionTypes.PUBLIC_NOTES:
            return{
                ...state,
                publicNotes: action.payload
            }
        case SessionActionTypes.PRIVATE_NOTES:
            return{
                ...state,
                privateNotes: action.payload
            }
        case SessionActionTypes.CHANGE_SEARCHFIELD:
            return{ 
                ...state,
                searchField: action.payload
            }
        default:
            return state;
    }
}


export default sessionReducer;