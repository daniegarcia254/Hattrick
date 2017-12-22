import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { categoryActions } from '../_actions';
import CommunityCSS from '../_css/Community.scss';

class CreateCommunityPage extends React.Component {

	componentDidMount() {
		this.props.dispatch(categoryActions.getAll());
	}

    /*handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }*/

	render() {
		console.log('CreateCommunityPage: props', this.props);
		const { user, categories } = this.props;
		return (
			<div className="col-md-6 col-md-offset-3">
				<h2>Create new Community</h2>
				<div className="row">
					{categories.items && categories.items.length > 0 && <span>Choose Category</span>}
					{categories.items && categories.items.length > 0 &&
						<select>
							{categories.items.map((category, index) =>
							<option value={category.id}>{category.name} </option>
							)}
						</select>
					}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { categories, authentication } = state;
	const { user } = authentication;
	return {
		user,
		categories
	};
}

const connectedCreateCommunityPage = connect(mapStateToProps)(CreateCommunityPage);
export { connectedCreateCommunityPage as CreateCommunityPage };
