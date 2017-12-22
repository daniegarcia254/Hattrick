import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { communityActions } from '../_actions';
import CommunityCSS from '../_css/Community.scss';

class JoinCommunityPage extends React.Component {
	componentDidMount() {
		this.props.dispatch(communityActions.getAllCommunities());
	}

    /*handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }*/

	render() {
		console.log('Props', this.props);
		const { user, communities } = this.props;
		return (
			<div className="col-md-12 JoinCommunityMain">
				<div className="row">
					<h1>Hi {user.name}!</h1>
					<h3>Create, join or choose a community</h3>
				</div>
				<div className="row">
					<Link className="btn btn-success btn-lg" to="/community/create">Create new Community</Link>
				</div>
				<div className="row">
					<Link className="btn btn-primary btn-lg" to="/community/join">Join existing Community</Link>
				</div>
				<div className="row">
					{communities.items && communities.items.length > 0 && <span>Choose Community</span>}
					{communities.items && communities.items.length > 0 &&
						<select>
							<option>Community 1</option>
							<option>Community 2</option>
						</select>
					}
				</div>
				<div className="row">
					<p> <Link to="/login">Logout</Link> </p>
				</div>
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

const connectedJoinCommunityPage = connect(mapStateToProps)(JoinCommunityPage);
export { connectedJoinCommunityPage as JoinCommunityPage };
