import API from './config';

export default class appAPI {
	static login(username, password) {
		return API.post('/login', {username: username, password: password});
	}
	static register(data){
		return API.post('/register', data);
	}

	static getPublicNotes(data){
		console.log("userID", data);
		return API.post('/get_public_notes', data);
	}

	static getPrivateNotes(data){
		console.log("userID", data);
		return API.post('/get_private_notes', data);
	}

	static sendNoteData(data) {
		console.log("Data:::::::: ", data);
		return API.post('/add_note', data);
	}

	static sendEditedNoteData(data) {
		console.log("Data:::::::: ", data);
		return API.post('/edit_note', data);
	}

    static sendDeleteNoteData(data) {
        console.log("Data:::::::: ", data);
        return API.post('/delete_note', data);
    }

	static createNote(data) {
		return API.post('/createnote', data);
	}
}