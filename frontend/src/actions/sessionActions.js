import { SessionActionTypes } from '../constants';
import API from './api/appAPI';
import history from '../history';

export function loginRequest(data) {
    return (dispatch) => {
        API.login(data.username, data.password)
            .then((res) => {
                // console.log(res);
                dispatch(handleCurrentUser(res.data.user.username));
                const user = res.data.user.username;
                const success = res.data.success;
                if(user && success){
                    history.push('/dashboard');
                }else{
                    dispatch(handleCurrentUser(''));
                    dispatch(handleLoginFailure(false));
                }

            }).catch(() => {
                dispatch(handleCurrentUser(''));
                dispatch(handleLoginFailure(false));

            });
    }
}

export function getPublicNotes(data){
    return(dispatch) => {
        API.getPublicNotes(data)
            .then((res) => {
                console.log(res);
                dispatch(handleGetAllNotes(res.data.notes));
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
                history.push('/');
            }).catch(() =>{
                console.log('error');
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
            }).catch(() => {
                console.log("error");
            });
    }   
}

function handleGetAllNotes(data) {
    return {
        type: SessionActionTypes.ALL_NOTES,
        payload: data
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