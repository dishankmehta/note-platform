import KeyMirror from 'key-mirror';

export const API_BASE_PATH = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/' : '/';

export const SessionActionTypes = KeyMirror({
    LOGIN_REQUEST_SUCCESS: null,
    LOGIN_REQUEST_FAILED: null,
    LOGIN_ERROR: null,
    REGISTER_ERROR: null,
    PUBLIC_NOTES: null,
    PRIVATE_NOTES: null,
    CHANGE_SEARCHFIELD:null,
    GROUP_NOTES: null,
    RECOMMENDED_NOTES: null,
    CHEATSHEETS: null,
    CHART_USER: null,
    CHART_ALL: null,
    CHART_LINE: null,
});


export const AppActionTypes = KeyMirror({
    CREATE_NOTE: null,
});



export const SocketActionTypes = KeyMirror({
    INIT_SOCKET: null,
    INIT_NOTE: null,
});

export const SOCKET_EVENTS = {
    connect: 'connect',
    join_room: 'join_room',
    note_body: 'note_body'
}

export const CONNECT = 'CONNECT';
export const TYPE_JOINED = 'JOINED';