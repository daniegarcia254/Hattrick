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
		case communityConstants.CREATE_REQUEST:
			return {
				loading: true
			};
		case communityConstants.GET_ALL_SUCCESS:
			return {
				items: action.communities
			};
		case communityConstants.CREATE_SUCCESS:
			return {
				items: action.community
			};
		case communityConstants.GET_ALL_FAILURE:
		case communityConstants.CREATE_FAILURE:
			return {
				error: action.error
			};
		default:
			return state
	}
}