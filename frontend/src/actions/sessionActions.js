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
        API.registration(data.name,data.username,data.email,data.password,data.major,data.interests)
            .then((res) => {
                console.log(res);
                history.push('/');
            }).catch(() =>{
                console.log('error');
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

