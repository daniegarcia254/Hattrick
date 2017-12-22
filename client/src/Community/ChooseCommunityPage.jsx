import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { communityActions } from '../_actions';
import CommunityCSS from '../_css/Community.scss';

class ChooseCommunityPage extends React.Component {
	componentDidMount() {
		this.props.dispatch(communityActions.getAll());
		this.props.dispatch(communityActions.getUserCommunities());
	}

	render() {
		console.log('ChooseCommunityPage: props', this.props);
		const { user, userCommunities, communities } = this.props;
		return (
			<div className="col-md-12 ChooseCommunityMain">
				<div className="row">
					<h1>Hi {user.name}!</h1>
					<h3>Create, join or choose a community</h3>
				</div>
				<div className="row">
					<Link className="btn btn-success btn-lg" to="/community/create">Create new Community</Link>
				</div>
				<div className="row">
					{(!communities.items || communities.items.length === 0) && 
						<button className="btn btn-primary btn-lg" disabled="disabled">Join existing Community</button>
					}
					{communities.items && communities.items.length > 1 && 
						<Link className="btn btn-primary btn-lg" to="/community/join">Join existing Community</Link>
					}
				</div>
				<div className="row">
					{userCommunities.items && userCommunities.items.length > 0 && <span>Choose Community</span>}
					{userCommunities.items && userCommunities.items.length > 0 &&
						<select>
							{userCommunities.items.map((community, index) =>
								<option value={community.id}> {community.name} </option>
							)}
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
	const { communities, userCommunities, authentication } = state;
	const { user } = authentication;
	return {
		user,
		communities,
		userCommunities
	};
}

const connectedChooseCommunityPage = connect(mapStateToProps)(ChooseCommunityPage);
export { connectedChooseCommunityPage as ChooseCommunityPage };
