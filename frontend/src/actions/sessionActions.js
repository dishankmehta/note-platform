import { SessionActionTypes } from '../constants';
import API from './api/appAPI';
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
        API.sendNoteData(data)
            .then((res) => {
                console.log(res);
            }).catch(() => {
                console.log("");
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