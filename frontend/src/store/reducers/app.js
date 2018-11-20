import { AppActionTypes } from '../../constants';

const defaultState = {
    current_note_id: '',
    notes: [],
};


function appReducer(state = defaultState, action) {
    switch(action.type) {
        case AppActionTypes.CREATE_NOTE:
            return Object.assign({}, state, { current_note_id: action.payload });
        default:
            return state;
    }
}


export default appReducer;