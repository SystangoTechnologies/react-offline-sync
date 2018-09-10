import api from './api';

export function getOrders() {
	return {
		type: 'GET_ORDERS',
		payload: api.get(`https://jsonplaceholder.typicode.com/posts`),
	};
};
export function getPendingRequests(type, url){
	return {
		type: type,
		payload: api.get(url),
	};
};

export function getList() {
	return {
		type: 'GET_LIST',
		payload: api.get('https://jsonplaceholder.typicode.com/users')
	};
};