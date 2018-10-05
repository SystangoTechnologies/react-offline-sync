import api from './api';

export function getPosts() {
	return {
		type: 'GET_POSTS',
		payload: api.get(`https://jsonplaceholder.typicode.com/posts`),
	};
};
export function getPendingRequests(type, url, data){
	const localData = data ? api.post(url, data) : api.get(url);
	return {
		type: type,
		payload: localData,
		data: data
	};
};

export function getList() {
	return {
		type: 'GET_LIST',
		payload: api.get('https://jsonplaceholder.typicode.com/users')
	};
};

export function addForm(name) {
	const data = {
		name: name
	};
	return {
		type: 'ADD_FORM',
		payload: api.post('https://react-offline-sync.firebaseio.com/userdetails.json', data)
	}
}

export function getForm() {
	return {
		type: 'GET_FORM',
		payload: api.get('https://react-offline-sync.firebaseio.com/userdetails.json')
	}
}

export function addRequest(request) {
	return {
		type: 'ADD_REQUEST',
		oldRequest: request
	}
}

export function removeRequest(request) {
	return {
		type: 'REMOVE_REQUEST',
		oldRequest: request
	}
}