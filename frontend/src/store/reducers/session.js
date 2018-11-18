import { SessionActionTypes } from '../../constants';


const defaultState = {
    currentUser: ''
};


function sessionReducer(state = defaultState, action) {
    switch(action.type) {
        case SessionActionTypes.LOGIN_REQUEST:
        console.log(action.payload);
            return {
                ...state,
                currentUser: action.payload
            };
        default:
            return state;
    }
}


export default sessionReducer;