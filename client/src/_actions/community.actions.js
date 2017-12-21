import { communityConstants } from '../_constants';
import { communityService } from '../_services';

export const communityActions = {
	getUserCommunities
};

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