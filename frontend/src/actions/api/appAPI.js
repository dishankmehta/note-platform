import API from './config';

export default class appAPI {
	static login(username, password) {
		return API.post('/login', {username: username, password: password});
	}
	static register(data){
		return API.post('/register', data);
	}


	static sendNoteData(data) {
		console.log("Data:::::::: ", data);
		return API.post('/add_note', data);
	}

	static createNote(data) {
		return API.post('/createnote', data);
	}
}