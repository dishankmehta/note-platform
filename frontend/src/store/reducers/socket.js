import { SocketActionTypes } from '../../constants';
import { EditorState } from 'draft-js';

const defaultState = {
    socket: {},
    editorState: EditorState.createEmpty()
};



function socketReducer(state = defaultState, action) {
    switch(action.type){
        case SocketActionTypes.INIT_SOCKET:
            return Object.assign({}, state, { socket: action.payload });
        case SocketActionTypes.INIT_NOTE:
            return Object.assign({}, state, { editorState: action.payload });
        default:
            return state;
    }
}



export default socketReducer;