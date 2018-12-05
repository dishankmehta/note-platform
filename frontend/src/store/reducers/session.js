import { SessionActionTypes} from '../../constants';

const defaultState = {
    currentUser: '',
    isLoggedIn: null,
    loginError: '',
    registerError: '',
    publicNotes: [],
    privateNotes: [],
    groupNotes: [],
    recommendedNotes: [],
    cheatsheets: [],
    chart_user: [],
    chart_all: [],
    chart_line: [],
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
        case SessionActionTypes.GROUP_NOTES:
            return{
                ...state,
                groupNotes: action.payload
            }
        case SessionActionTypes.RECOMMENDED_NOTES:
            return{
                ...state,
                recommendedNotes: action.payload
            }
        case SessionActionTypes.CHEATSHEETS:
            return{
                ...state,
                cheatsheets: action.payload
            }
        case SessionActionTypes.CHANGE_SEARCHFIELD:
            return{ 
                ...state,
                searchField: action.payload
            }
        case SessionActionTypes.CHART_USER:
            return{
                ...state,
                chart_user: action.payload
            }
        case SessionActionTypes.CHART_ALL:
            return{
                ...state,
                chart_all: action.payload
            }
        case SessionActionTypes.CHART_LINE:
            return{ 
                ...state,
                chart_line: action.payload
            }
        default:
            return state;
    }
}


export default sessionReducer;