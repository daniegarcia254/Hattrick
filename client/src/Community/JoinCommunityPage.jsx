import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { communityActions } from '../_actions';
import CommunityCSS from '../_css/Community.scss';

class JoinCommunityPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			choosenCommunity: 0,
			submitted: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(communityActions.getAllCommunities());
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ submitted: true });
		const { choosenCommunity } = this.state;
		const { dispatch } = this.props;
		if (choosenCommunity) {
			dispatch(communityActions.create(choosenCommunity));
		}
	}

	render() {
		const { user, communities } = this.props;
		return (
			<div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
					<div className="row">
							<div className="col-md-12">
									<h1>Hi {user.name}!</h1>
									<h3>Create, join or choose a community</h3>
							</div>
					</div>
					<div className="row">
						<div className="col-md-3">
								<Link className="btn btn-success btn-lg" to="/community/create">Create new Community</Link>
						</div>
						<div className="col-md-3">
								<Link className="btn btn-primary btn-lg" to="/community/join-public">Join Public Community</Link>
						</div>
						<div className="col-md-3">
								<Link className="btn btn-primary btn-lg" to="/community/join-private">Join Private Community</Link>
						</div>
					</div>
					{communities.items && communities.items.length > 0 &&
						<div className="row">
						<form name="form" onSubmit={this.handleSubmit}>
								<div className={'form-group' + (submitted && !type ? ' has-error' : '')}>
									<label htmlFor="choosenCommunity">Choose one of your communities to play:</label>
									<select className="form-control" name="choosenCommunity" defaultValue={type} onChange={this.handleChange} >
										{communities.items.map((community, index) =>
											<option key={community.id} value={community.id}>{community.name}</option>
										)}
									</select>
								</div>
								<div className="form-group">
									<button className="btn btn-success">Go</button>
								</div>
							</form>
						</div>
					}
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
