import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getById,
    update,
    requestPasswordReset
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(API_URL + '/users/login', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.json());
            }

            return response.json();
        })
        .then(user => {
            if (user && user.id && user.userId) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
		const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };
    localStorage.removeItem('user');
		return fetch(API_URL + '/users/logout', requestOptions).then(response=> { return {}; });
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(API_URL + '/users/' + id, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(API_URL + '/users', requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(API_URL + '/users/' + user.id, requestOptions).then(handleResponse);;
}

function requestPasswordReset(email) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({email})
    };

    return fetch(API_URL + '/resetPasswordRequests', requestOptions).then(handleResponse);;
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.json());
    }

    return response.json();
}
