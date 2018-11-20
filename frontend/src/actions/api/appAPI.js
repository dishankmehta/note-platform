import API from './config';

export default class appAPI {
	static login(username, password) {
		return API.post('/login', {username: username, password: password});
	}

	static sendNoteData(data) {
		return API.post('/sendNoteData', data);
	}
}