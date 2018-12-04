import { SessionActionTypes } from '../constants';  
import API from './api/appAPI';
import isEmpty from 'lodash/isEmpty';
import history from '../history';

export function loginRequest(data) {
    return (dispatch) => {
        API.login(data.username, data.password)
            .then((res) => {
                console.log(res);
                const user = res.data.user.username;
                const success = res.data.success;
                if(user && success){
                    dispatch(handleCurrentUser(res.data.user.username));
                    history.push('/dashboard');
                }else{
                    const error = res.data.error;
                    dispatch(handleCurrentUser(''));
                    dispatch(handleLoginFailure(false));
                    dispatch(handleLoginError(error));
                }

            }).catch(() => {
                dispatch(handleCurrentUser(''));
                dispatch(handleLoginFailure(false));
                dispatch(handleLoginError(''));
            });
    }
}

export function getPublicNotes(data){
    return(dispatch) => {
        API.getPublicNotes(data)
            .then((res) => {
                if(isEmpty(res.data.notes)){
                    dispatch(handlePublicNotes([]));
                }
                dispatch(handlePublicNotes(res.data.notes));
            }).catch(() => {
                console.log('error');
            })
    }
}

export function getPrivateNotes(data){
    return(dispatch) => {
        API.getPrivateNotes(data)
            .then((res) => {
                if(isEmpty(res.data.notes)){
                    dispatch(handlePrivateNotes([]));
                }
                dispatch(handlePrivateNotes(res.data.notes));
            }).catch(() => {
                console.log('error');
            })
    }
}

export function registrationRequest(data){
    return(dispatch) => {
        API.register(data)
            .then((res) => {
                console.log(res);
                const success = res.data.success;
                if(success){
                    dispatch(handleRegisterError(''));
                    history.push('/');
                }else {
                    const error = res.data.error;
                    dispatch(handleRegisterError(error));
                }
            }).catch(() =>{
                console.log('error');
                dispatch(handleRegisterError(''));
            });
    }
}

export function sendNoteData(data) {
    return (dispatch) => {
        console.log("data", data.note_type);
        API.sendNoteData(data)
            .then((res) => {
                console.log(res);
                const new_data = { user_id: data.user_id } 
                dispatch(getPublicNotes(new_data));
                dispatch(getPrivateNotes(new_data));
            }).catch(() => {
                console.log("error");
            });
    }   
}

function handlePublicNotes(data) {
    return {
        type: SessionActionTypes.PUBLIC_NOTES,
        payload: data
    }
}


export function sendEditedNoteData(data) {
    console.log("reached in edited note data");
    return (dispatch) => {
        console.log("data", data.note_type);
        console.log(data);
        API.sendEditedNoteData(data)
            .then((res) => {
                console.log(res);
                const new_data = { user_id: data.user_id } 
                dispatch(getPublicNotes(new_data));
            }).catch(() => {
                console.log("error");
            });
    }   
}

export function sendDeleteNoteData(data) {
    console.log("reached in delete note data");
    return (dispatch) => {
        console.log("data", data);
        API.sendDeleteNoteData(data)
            .then((res) => {
                console.log(res);
                const new_data = { user_id: data.user_id };
                dispatch(getPublicNotes(new_data));
                dispatch(getPrivateNotes(new_data));
            }).catch(() => {
            console.log("error");
        });
    }
}
    

function handlePrivateNotes(data) {
    return {
        type: SessionActionTypes.PRIVATE_NOTES,
        payload: data
    }
}
export function sendUpVoteNoteData(data) {
    console.log("reached in upvote note data");
    return (dispatch) => {
        console.log("data", data);
        API.sendUpVoteNoteData(data)
            .then((res) => {
                console.log(res);
                // const new_data = { user_id: data.user_id } 
                // dispatch(getPublicNotes(new_data));
            }).catch(() => {
                console.log("error");
            });
    }   
}

export function sendDownVoteNoteData(data) {
    console.log("reached in upvote note data");
    return (dispatch) => {
        console.log("data", data);
        API.sendDownVoteNoteData(data)
            .then((res) => {
                console.log(res);
                // const new_data = { user_id: data.user_id } 
                // dispatch(getPublicNotes(new_data));
            }).catch(() => {
                console.log("error");
            });
    }   
}

function handleCurrentUser(data){
    return {
        type: SessionActionTypes.LOGIN_REQUEST_SUCCESS,
        payload: data
    }
}

function handleLoginFailure(data){
    return {
        type: SessionActionTypes.LOGIN_REQUEST_FAILED,
        payload:data
    }
}

function handleLoginError(data) {
    return {
        type: SessionActionTypes.LOGIN_ERROR,
        payload: data
    }
}

function handleRegisterError(data) {
    return {
        type: SessionActionTypes.REGISTER_ERROR,
        payload: data
    }
}
export const setSearchField = (text) => ({ type: SessionActionTypes.CHANGE_SEARCHFIELD, payload: text })
