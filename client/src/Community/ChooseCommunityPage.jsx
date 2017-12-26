import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { communityActions } from '../_actions';
import CommunityCSS from '../_css/Community.scss';
import { userCommunities } from '../_reducers/communities.reducer';

class ChooseCommunityPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			choosenCommunityID: '',
			community: null,
			password: '',
			submitted: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(communityActions.getAll());
		this.props.dispatch(communityActions.getUserCommunities());
	}

	handleChange(e) {
		const { userCommunities } = this.props;
		const { name, value } = e.target;
		this.setState({ [name]: value });
		if (name === 'choosenCommunityID' && userCommunities && userCommunities.items) {
			console.log("handle", name, value, userCommunities.items.find(x => x.code === value));
			this.setState({ community: userCommunities.items.find(x => x.code === value)});
		}
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ submitted: true });
		const { choosenCommunityID, password, community} = this.state;
		const { dispatch } = this.props;
		if (community && community.type == 'PRIVATE' && password) {
			//dispatch(communityActions.create(choosenCommunityID));
			console.log("Community PRIVATE", choosenCommunity, password);
		} else if (community && community.type == 'PUBLIC') {
			//dispatch(communityActions.create(choosenCommunityID));
			console.log("Community PUBLIC", choosenCommunity);
		} else {
			console.log('zaruta');
		}
	}

	render() {
		console.log('Choose community PROPS', this.props);
		const { choosenCommunityID, password, submitted, community} = this.state;
		const { user, communities, userCommunities } = this.props;
		return (
			<div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1 JoinCommunityMain">
				<div className="row">
					<div className="col-sm-12 col-md-12">
							<h2>Hi {user.name}!</h2>
							<h3><small>Create, join or choose a community</small></h3>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-3 col-sm-offset-3 col-md-1 col-md-pull-3">
							<Link className="btn btn-success btn-lg" to="/community/create">Create new Community</Link>
					</div>
					<div className="col-sm-8 col-sm-pull-1 col-md-3 col-md-offset-1">
							<Link className="btn btn-primary btn-lg" to="/community/join-public">Join Public Community</Link>
					</div>
					<div className="col-sm-3 col-sm-pull-1 col-md-3 col-md-offset-1">
							<Link className="btn btn-primary btn-lg" to="/community/join-private">Join Private Community</Link>
					</div>
				</div>
				{userCommunities.items && userCommunities.items.length > 0 &&
					<div className="row">
						<div className="col-xs-8 col-xs-offset-2 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
							<form name="form" onSubmit={this.handleSubmit}>
								<div><label>OR</label></div>
								<div className={'form-group' + (submitted && !choosenCommunityID ? ' has-error' : '')}>
									<label htmlFor="choosenCommunityID">Choose one of your communities to play:</label>
									<select className="form-control" name="choosenCommunityID" defaultValue={choosenCommunityID} onChange={this.handleChange} >
										<option value='' selected></option>
										{userCommunities.items.map((community, index) =>
											<option key={community.id} value={community.code}>{community.name}</option>
										)}
									</select>
									{submitted && !choosenCommunityID &&
										<div className="help-block">A community must be chosen to play!</div>
									}
								</div>
								{community && community.type === 'PRIVATE' &&
									<div className={'form-group' + (submitted && choosenCommunityID && !password ? ' has-error' : '')}>
										<input className="form-control" name="password" placeholder="Community password" onChange={this.handleChange} />
										{submitted && choosenCommunityID && !password &&
											<div className="help-block">Password must be provided for a private community!</div>
										}
									</div>
								}
								<div className="form-group">
									<button className="btn btn-success">Go</button>
								</div>
							</form>
						</div>
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
