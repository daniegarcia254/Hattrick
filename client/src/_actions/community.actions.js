import { communityConstants } from '../_constants';
import { communityService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const communityActions = {
	getAll,
	getUserCommunities,
	create,
	join
};

function getAll() {
	return dispatch => {
		dispatch(request());

		communityService.getAll()
			.then(
				communities => dispatch(success(communities)),
				error => {
					error.then(function (error) {
						dispatch(failure(error.error))
						dispatch(alertActions.error("There has been an error (" + error.error.status + ") getting the communities: " + error.error.message));
					});
				}
			);
	};

	function request() { return { type: communityConstants.GET_ALL_REQUEST } }
	function success(communities) { return { type: communityConstants.GET_ALL_SUCCESS, communities } }
	function failure(error) { return { type: communityConstants.GET_ALL_FAILURE, error } }
}

function getUserCommunities() {
	return dispatch => {
		dispatch(request());

		communityService.getUserCommunities()
			.then(
				communities => dispatch(success(communities)),
				error => {
					error.then(function (error) {
						dispatch(failure(error.error))
						dispatch(alertActions.error("There has been an error (" + error.error.status + ") getting the user communities: " + error.error.message));
					});
				}
			);
	};

	function request() { return { type: communityConstants.GET_USER_COMMUNITIES_REQUEST } }
	function success(communities) { return { type: communityConstants.GET_USER_COMMUNITIES_SUCCESS, communities } }
	function failure(error) { return { type: communityConstants.GET_USER_COMMUNITIES_FAILURE, error } }
}

function create(type, categoryID, name, password) {
	return dispatch => {
		dispatch(request());
		communityService.create({ type, categoryID, name, password })
			.then(
				community => {
					dispatch(success(community));
					history.push('/community/choose'); 
					dispatch(alertActions.success('Community ' + name + ' created.'));
				},
				error => {
					error.then(function (error) {
						dispatch(failure(error.error))
						dispatch(alertActions.error("There has been an error (" + error.error.status + ") creating the '" + community.name + "' Community: " + error.error.message));
					});
				}
			);
	};

	function request() { return { type: communityConstants.CREATE_REQUEST } }
	function success(community) { return { type: communityConstants.CREATE_SUCCESS, community } }
	function failure(error) { return { type: communityConstants.CREATE_FAILURE, error } }
}

function join(type, community, password) {
	return dispatch => {
		dispatch(request());
		communityService.join(type, community, password)
			.then(
				comm => {
					dispatch(success(community));
					history.push('/community/choose');
					dispatch(alertActions.success('You\'ve joined to the \'' + community.name + '\' Community '));
				},
				error => {
					error.then(function (error) {
						dispatch(failure(error.error))
						dispatch(alertActions.error("There has been an error (" + error.error.status + ") joining the '" + community.name + "' Community: " + error.error.message));
					});
				}
			);
	};

	function request() { return { type: communityConstants.JOIN_REQUEST } }
	function success(community) { return { type: communityConstants.JOIN_SUCCESS, community } }
	function failure(error) { return { type: communityConstants.JOIN_FAILURE, error } }
}
