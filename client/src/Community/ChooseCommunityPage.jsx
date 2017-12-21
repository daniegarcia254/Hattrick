import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { communityActions } from '../_actions';

class ChooseCommunityPage extends React.Component {
	componentDidMount() {
		this.props.dispatch(communityActions.getUserCommunities());
	}

    /*handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }*/

	render() {
		const { user, communities } = this.props;
		return (
			<div className="col-md-6 col-md-offset-3">
				<h1>Hi {user.name}!</h1>
				<p>You're logged in with React!!</p>
				<h3>All registered communities:</h3>
				{communities.loading && <em>Loading communities...</em>}
				{communities.error && <span className="text-danger">ERROR: {communities.error}</span>}
				{communities.items &&
					<ul>
						{communities.items.map((user, index) =>
							<li key={user.id}>
								{user.name}
								{
									user.deleting ? <em> - Deleting...</em>
										: user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
											: <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
								}
							</li>
						)}
					</ul>
				}
				<p>
					<Link to="/login">Logout</Link>
				</p>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { communities, authentication } = state;
	const { user } = authentication;
	return {
		user,
		communities
	};
}

const connectedChooseCommunityPage = connect(mapStateToProps)(ChooseCommunityPage);
export { connectedChooseCommunityPage as ChooseCommunityPage };