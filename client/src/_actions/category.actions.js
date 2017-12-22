import { categoryConstants } from '../_constants';
import { categoryService } from '../_services';

export const categoryActions = {
	getAll
};

function getAll() {
	return dispatch => {
		dispatch(request());

		categoryService.getAll()
			.then(
				categories => dispatch(success(categories)),
				error => dispatch(failure(error))
			);
	};

	function request() { return { type: categoryConstants.GET_ALL_REQUEST } }
	function success(categories) { return { type: categoryConstants.GET_ALL_SUCCESS, categories } }
	function failure(error) { return { type: categoryConstants.GET_ALL_FAILURE, error } }
}