import { categoryConstants } from '../_constants';

export function categories(state = {}, action) {
	switch (action.type) {
		case categoryConstants.GET_ALL_REQUEST:
			return {
				loaded: false
			};
		case categoryConstants.GET_ALL_SUCCESS:
			return {
				items: action.categories,
				loaded: true
			};
		case categoryConstants.GET_ALL_FAILURE:
			return {
				error: action.error,
				loaded: true
			};
		default:
			return state
	}
}