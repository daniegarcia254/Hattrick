import { categoryConstants } from '../_constants';

export function categories(state = {}, action) {
	switch (action.type) {
		case categoryConstants.GET_ALL_REQUEST:
			return {
				loading: true
			};
		case categoryConstants.GET_ALL_SUCCESS:
			return {
				items: action.categories
			};
		case categoryConstants.GET_ALL_FAILURE:
			return {
				error: action.error
			};
		default:
			return state
	}
}