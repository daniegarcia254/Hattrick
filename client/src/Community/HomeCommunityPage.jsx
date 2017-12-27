import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { communityActions } from '../_actions';
import CommunityCSS from '../_css/Community.scss';

class HomeCommunityPage extends React.Component {

	render() {
		const { user } = this.props;
		return (
			<div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 HomeCommunityMain">
				<div className="row">
					<div className="col-md-12">
						<h1>Hi {user.name}!</h1>
						<h3>Welcome to your community</h3>
					</div>
				</div>
				<div className="row">
					<p> <Link to="/login">Logout</Link> </p>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { authentication } = state;
	const { user } = authentication;
	return {
		user
	};
}

const connectedHomeCommunityPage = connect(mapStateToProps)(HomeCommunityPage);
export { connectedHomeCommunityPage as HomeCommunityPage };
