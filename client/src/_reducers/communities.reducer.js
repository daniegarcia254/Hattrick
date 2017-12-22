import { communityConstants } from '../_constants';

export function userCommunities(state = {}, action) {
	switch (action.type) {
		case communityConstants.GET_USER_COMMUNITIES_REQUEST:	
			return {
				loading: true
			};
		case communityConstants.GET_USER_COMMUNITIES_SUCCESS:	
			return {
				items: action.communities
			};
		case communityConstants.GET_USER_COMMUNITIES_FAILURE:	
			return {
				error: action.error
			};
		default:
			return state
	}
}

export function communities(state = {}, action) {
	switch (action.type) {
		case communityConstants.GET_ALL_REQUEST:
			return {
				loading: true
			};
		case communityConstants.GET_ALL_SUCCESS:
			return {
				items: action.communities
			};
		case communityConstants.GET_ALL_FAILURE:
			return {
				error: action.error
			};
		default:
			return state
	}
}