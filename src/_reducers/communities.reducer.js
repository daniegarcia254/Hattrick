import { communityConstants } from '../_constants';

export function userCommunities(state = {}, action) {
	switch (action.type) {
		case communityConstants.GET_USER_COMMUNITIES_REQUEST: {
			return { userCommunitiesLoaded: false };
		}
		case communityConstants.GET_USER_COMMUNITIES_SUCCESS: {
			return { items: action.communities, userCommunitiesLoaded: true };
		}
		case communityConstants.GET_USER_COMMUNITIES_FAILURE: {
			return { error: action.error, userCommunitiesLoaded: true };
		}
		default:
			return state
	}
}

export function communities(state = {}, action) {
	switch (action.type) {
		case communityConstants.GET_ALL_REQUEST: {
			return { communitiesLoaded: false, createLoaded: true, joinLoaded: true, playLoaded:true };
		}
		case communityConstants.CREATE_REQUEST: {
			return { communitiesLoaded: true, createLoaded: false, joinLoaded: true, playLoaded:true };
		}
		case communityConstants.JOIN_REQUEST: {
			return { communitiesLoaded: true, createLoaded: true, joinLoaded: false, playLoaded:true };
		}
		case communityConstants.PLAY_REQUEST: {
			return { communitiesLoaded: true, createLoaded: true, joinLoaded: false, playLoaded: false };
		}
		case communityConstants.GET_COMMUNITY_REQUEST: {
			return { getCurrentCommunityLoaded: false};
		}
		case communityConstants.GET_ALL_SUCCESS: {
			return { items: action.communities, communitiesLoaded: true, createLoaded: true, joinLoaded: true, playLoaded:true };
		}
		case communityConstants.CREATE_SUCCESS: {
			return { community: action.community, communitiesLoaded: true, createLoaded: true, joinLoaded: true, playLoaded:true };
		}
		case communityConstants.JOIN_SUCCESS: {
			return { community: action.community, communitiesLoaded: true, createLoaded: true, joinLoaded: true, playLoaded:true };
		}
		case communityConstants.PLAY_SUCCESS: {
			return { community: action.community, communitiesLoaded: true, createLoaded: true, joinLoaded: true, playLoaded: true };
		}
		case communityConstants.GET_COMMUNITY_SUCCESS: {
			return { current: action.community, getCurrentCommunityLoaded: true };
		}
		case communityConstants.GET_ALL_FAILURE: {
			return { error: action.error, communitiesLoaded: true, createLoaded: true, joinLoaded: true, playLoaded:true };
		}
		case communityConstants.CREATE_FAILURE: {
			return { error: action.error, communitiesLoaded: true, createLoaded: true, joinLoaded: true, playLoaded:true };
		}
		case communityConstants.JOIN_FAILURE: {
			return { error: action.error, communitiesLoaded: true, createLoaded: true, joinLoaded: true, playLoaded:true };
		}
		case communityConstants.PLAY_FAILURE: {
			return { error: action.error, communitiesLoaded: true, createLoaded: true, joinLoaded: true, playLoaded: true };
		}
		case communityConstants.GET_COMMUNITY_FAILURE: {
			return { getCurrentCommunityLoaded: true };
		}
		default:
			return state
	}
}