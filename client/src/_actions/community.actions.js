import { communityConstants } from '../_constants';
import { communityService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const communityActions = {
	getAll,
	create,
	getUserCommunities
};

function getAll() {
	return dispatch => {
		dispatch(request());

		communityService.getAll()
			.then(
			communities => dispatch(success(communities)),
			error => dispatch(failure(error))
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
				error => dispatch(failure(error))
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
				error => dispatch(failure(error))
			);
	};

	function request() { return { type: communityConstants.CREATE_REQUEST } }
	function success(community) { return { type: communityConstants.CREATE_SUCCESS, community } }
	function failure(error) { return { type: communityConstants.CREATE_FAILURE, error } }
}