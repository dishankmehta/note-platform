import history from '../history';
import { AppActionTypes } from '../constants';
import API from './api/appAPI';

export function createNewNote(data) {
    return (dispatch, getState) => {
        API.createNote(data)
        .then((res) => {
            dispatch(handleCreateNewNote(res.data.note.note_id));
            history.push(`/demo/${getState().app.current_note_id}`);
        }).catch((e) => {
            console.log(e);
        })
    }
}



function handleCreateNewNote(data) {
    return {
        type: AppActionTypes.CREATE_NOTE,
        payload: data
    }
}