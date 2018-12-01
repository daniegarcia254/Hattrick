import { authHeader } from '../_helpers';

export const categoryService = {
	getAll
};

function getAll() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};
	return fetch(API_URL + '/categories', requestOptions).then(handleResponse);
}

function handleResponse(response) {
	if (!response.ok) {
		return Promise.reject(response.statusText);
	}

	return response.json();
}
