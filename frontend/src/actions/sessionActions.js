import { SessionActionTypes } from '../constants';
import API from './api/appAPI';
import history from '../history';

export function loginRequest(data) {
    return (dispatch) => {
        API.login(data.username, data.password)
            .then((res) => {
                console.log(res);
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
        if(data.note_type === '1'){
        API.sendNoteData(data)
            .then((res) => {
                console.log(res);
                history.push('/privatenotes');
            }).catch(() => {
                console.log("");
            });
        }
        else if(data.note_type === '2'){
            API.sendNoteData(data)
            .then((res) => {
                console.log(res);
                history.push('/publicnotes');
            }).catch(() => {
                console.log("");
            });   
        }
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