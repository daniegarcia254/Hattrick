import LogRocket from 'logrocket';
import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    requestPasswordReset
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    console.log('Success login user', user);
                    userService.getById(user.userId)
                        .then(
                            currentUser => {
                                console.log('Success getting current', currentUser);
                                var userInfo = Object.assign({}, currentUser, user);
                                localStorage.setItem('user', JSON.stringify(userInfo));
																LogRocket.indentify(user.userId.toString(), userInfo);
                                dispatch(success(userInfo));
                                history.push(SERVER_ROOT + '/community/choose');
                            },
                            error => {
                                error.then(error => {
                                    dispatch(failure(error.error));
                                    dispatch(alertActions.error("There has been an error (" + error.error.status + ") getting current user info: " + error.error.message));
                                });
                            }
                        );
                },
                error => {
                    error.then(error => {
                        dispatch(failure(error.error));
                        if (error.error.status === 401) {
                            dispatch(alertActions.error("Sorry, we couldn't find an account with that username/password combination."));
                        } else {
                            dispatch(alertActions.error("There has been an error (" + error.error.status + ") login the user: " + error.error.message));
                        }
                    });
                }
        );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    console.log('Success registering user', user);
                    dispatch(success());
                    history.push(SERVER_ROOT + '/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    error.then(error => {
                        dispatch(failure(error.error))
                        dispatch(alertActions.error("There has been an error (" + error.error.status + ") registering the user: " + error.error.message));
                    });
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function requestPasswordReset(email) {
    return dispatch => {
        dispatch(request(email));

        userService.requestPasswordReset(email)
            .then(
                request => {
                    console.log('Success sending reset password request', request);
                    dispatch(success());
                    history.push(SERVER_ROOT + '/login');
                    dispatch(alertActions.success('Reset password request successfully sent to ' + email));
                },
                error => {
                    error.then(error => {
                        dispatch(failure(error.error))
                        dispatch(alertActions.error("There has been an error (" + error.error.status + ") sending the reset password request: " + error.error.message));
                    });
                }
            );
    };

    function request(email) { return { type: userConstants.REQUEST_PASSWORD_RESET_REQUEST, email } }
    function success(request) { return { type: userConstants.REQUEST_PASSWORD_RESET_SUCCESS, request } }
    function failure(error) { return { type: userConstants.REQUEST_PASSWORD_RESET_FAILURE, error } }
}
