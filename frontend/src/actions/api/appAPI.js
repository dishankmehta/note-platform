import API from './config';

export default class appAPI {
	static login(username, password) {
		return API.post('/login', {username: username, password: password});
	}


	static createNote(data) {
		return API.post('/createnote', data);
	}
}