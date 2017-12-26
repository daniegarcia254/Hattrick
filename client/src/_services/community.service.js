import { authHeader } from '../_helpers';

export const communityService = {
	getAll,
	create,
	getUserCommunities
};

function getAll() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};
	return fetch(API_URL + '/communities', requestOptions).then(handleResponse);
}

function create(data) {
	const requestOptions = {
		method: 'POST',
		headers: Object.assign({}, authHeader(), { 'Content-type': 'application/json' }),
		body: JSON.stringify(data)
	};
	let user = JSON.parse(localStorage.getItem('user'));
	return fetch(API_URL + '/users/' + user.userId + '/communities', requestOptions).then(handleResponse);
}

function getUserCommunities(userId) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};
	let user = JSON.parse(localStorage.getItem('user'));
	return fetch(API_URL + '/users/' + user.userId + '/communities', requestOptions).then(handleResponse);
}

function handleResponse(response) {
	if (!response.ok) {
		return Promise.reject(response.statusText);
	}

	return response.json();
}
