import KeyMirror from 'key-mirror';

export const API_BASE_PATH = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/' : '/';

export const SessionActionTypes = KeyMirror({
    // LOGIN_REQUEST: null,
    LOGIN_REQUEST_SUCCESS: null,
    LOGIN_REQUEST_FAILED: null,

});