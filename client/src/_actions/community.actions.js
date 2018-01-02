import { communityConstants } from '../_constants';
import { communityService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const communityActions = {
	getAll,
	getUserCommunities,
	getById,
	create,
	join,
	play
};

function getAll() {
	return dispatch => {
		dispatch(request());

		communityService.getAll()
			.then(
				communities => dispatch(success(communities)),
				error => {
					error.then(function (error) {
						dispatch(failure(error.error));
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
						dispatch(failure(error.error));
						dispatch(alertActions.error("There has been an error (" + error.error.status + ") getting the user communities: " + error.error.message));
					});
				}
			);
	};

	function request() { return { type: communityConstants.GET_USER_COMMUNITIES_REQUEST } }
	function success(communities) { return { type: communityConstants.GET_USER_COMMUNITIES_SUCCESS, communities } }
	function failure(error) { return { type: communityConstants.GET_USER_COMMUNITIES_FAILURE, error } }
}

function getById(id) {
	return dispatch => {
		dispatch(request());

		communityService.getById(id)
			.then(
			community => dispatch(success(community)),
			error => {
				error.then(function (error) {
					dispatch(failure(error.error));
					dispatch(alertActions.error("There has been an error (" + error.error.status + ") getting community info: " + error.error.message));
				});
			}
			);
	};

	function request() { return { type: communityConstants.GET_COMMUNITY_REQUEST } }
	function success(community) { return { type: communityConstants.GET_COMMUNITY_SUCCESS, community } }
	function failure(error) { return { type: communityConstants.GET_COMMUNITY_FAILURE, error } }
}

function create(type, categoryID, name, password) {
	return dispatch => {
		dispatch(request());
		communityService.create({ type, categoryID, name, password })
			.then(
				createdCommunity => {
					dispatch(success(createdCommunity));
					history.push('/community/choose'); 
					dispatch(alertActions.success('Community ' + name + ' created.'));
				},
				error => {
					error.then(function (error) {
						dispatch(failure(error.error));
						dispatch(alertActions.error("There has been an error (" + error.error.status + ") creating the '" + name + "' Community: " + error.error.message));
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
				joinedCommunity => {
					dispatch(success(community));
					history.push('/community/choose');
					dispatch(alertActions.success('You\'ve joined to the \'' + community.name + '\' Community '));
				},
				error => {
					error.then(function (error) {
						dispatch(failure(error.error));
						dispatch(alertActions.error("There has been an error (" + error.error.status + ") joining the '" + community.name + "' Community: " + error.error.message));
					});
				}
			);
	};

	function request() { return { type: communityConstants.JOIN_REQUEST } }
	function success(community) { return { type: communityConstants.JOIN_SUCCESS, community } }
	function failure(error) { return { type: communityConstants.JOIN_FAILURE, error } }
}

function play(type, community, password) {
	return dispatch => {
		dispatch(request());
		communityService.checkUserBelongs(community.id)
			.then(
				ok => {
					console.log('Ok??');
					if (type === 'public') {
						dispatch(success(community));
						history.push('/community/'+community.id+'/home');
					} else {
						// [TODO]: For private community, check valid password
						dispatch(success(community));
						history.push('/community/' + community.id + '/home');
					}
				},
				error => {
					dispatch(failure(error));
					if (error.status === 404) {
						dispatch(alertActions.error("User is not a member of '" + community.name + "' Community"));
					} else {
						dispatch(alertActions.error("There has been an error (" + error.status + ") checking user belongs to '" + community.name + "' Community: " + error.message));
					}
				}
			);
	};
	
	function request() { return { type: communityConstants.PLAY_REQUEST } }
	function success(community) { return { type: communityConstants.PLAY_SUCCESS, community } }
	function failure(error) { return { type: communityConstants.PLAY_FAILURE, error } }
}
