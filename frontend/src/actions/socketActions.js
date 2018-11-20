import io from 'socket.io-client';
import isEmpty from 'lodash/isEmpty';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { SocketActionTypes, SOCKET_EVENTS, CONNECT } from '../constants';

export const getSocketURL = () => {
    return `http://${document.domain}:5000`;
}


export function initSocket() {
    return (dispatch) => {
        const socket = io.connect(getSocketURL());
        socket.on(SOCKET_EVENTS.connect, (data) => {
            if(data && data.type === CONNECT)
                dispatch(handleInitSocket(socket));
        });
    }
}

export function syncEditorData(data, socket) {
    return (dispatch, getState) => {
        // const socket = getState().socket.socket;
        socket.emit('note_body', data);
    }
}


export function loadNoteInitData(socket) {
    return (dispatch, getState) => {
        socket.on('initial_note', (data) => {
            if(data){
                const content = convertFromRaw(JSON.parse(data.note_body));
                const editorState = EditorState.createWithContent(content);
                dispatch(handleInitNote(editorState));
            }
        });
    }
}

function handleInitSocket(data) {
    return {
        type: SocketActionTypes.INIT_SOCKET,
        payload: data
    }
}


function handleInitNote(data) {
    return {
        type: SocketActionTypes.INIT_NOTE,
        payload: data
    }
}