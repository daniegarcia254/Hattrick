import { authHeader } from '../_helpers';

export const communityService = {
	getUserCommunities
};

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
