import { authHeader } from '../_helpers';

export const communityService = {
	getAll,
	getUserCommunities,
	create,
	join,
	//play,
	checkUserBelongs
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

function join(type, community, password) {
	const requestOptions = {
		method: 'PUT',
		headers: Object.assign({}, authHeader(), { 'Content-type': 'application/json' }),
		body: JSON.stringify({
			type,
			code: community.code,
			password
		})
	}
	let user = JSON.parse(localStorage.getItem('user'));
	return fetch(API_URL + '/users/' + user.userId + '/communities/rel/' + community.id, requestOptions).then(handleResponse);
}

function checkUserBelongs(communityID) {
	const requestOptions = {
		method: 'HEAD',
		headers: Object.assign({}, authHeader(), { 'Content-type': 'application/json' })
	}
	let user = JSON.parse(localStorage.getItem('user'));
	return fetch(API_URL + '/users/' + user.userId + '/communities/rel/' + communityID, requestOptions).then(handleHeadResponse);
}

function handleResponse(response) {
	if (!response.ok) {
		return Promise.reject(response.json());
	}

	return response.json();
}

function handleHeadResponse(response) {
	if (!response.ok) {
		return Promise.reject(response);
	}

	return 'OK';
}
