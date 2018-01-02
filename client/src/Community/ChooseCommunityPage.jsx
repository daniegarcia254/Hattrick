import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import LoadMask from 'react-loader';

import { communityActions } from '../_actions';
import CommunityCSS from '../_css/Community.scss';
import { userCommunities } from '../_reducers/communities.reducer';

class ChooseCommunityPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			chosenCommunity: '',
			chosenPublic: '',
			chosenPrivate: '',
			showPublic: false,
			showPrivate: false,
			community: null,
			password: '',
			passwordPrivate: '',
			submitted: false,
			submittedPublic: false,
			submittedPrivate: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handlePlaySubmit = this.handlePlaySubmit.bind(this);
		this.handleJoinPublicSubmit = this.handleJoinPublicSubmit.bind(this);
		this.handleJoinPrivateSubmit = this.handleJoinPrivateSubmit.bind(this);
		this.showPublicModal = this.showPublicModal.bind(this);
		this.showPrivateModal = this.showPrivateModal.bind(this);
		this.hidePublicModal = this.hidePublicModal.bind(this);
		this.hidePrivateModal = this.hidePrivateModal.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(communityActions.getAll());
		this.props.dispatch(communityActions.getUserCommunities());
	}

	componentDidUpdate(prevProps, prevState) {
		// After join a community, reset page (hide modals and refresh info)
		if (!prevProps.communities.joinLoaded && this.props.communities.joinLoaded) {
			this.setState({ chosenPublic: '', chosenPrivate: '', submittedPublic: false, submittedPrivate: false });
			this.hidePublicModal();
			this.hidePrivateModal();
			this.props.dispatch(communityActions.getAll());
			this.props.dispatch(communityActions.getUserCommunities());
		}
	}

	handleChange(e) {
		const { userCommunities } = this.props;
		const { name, value } = e.target;
		this.setState({ [name]: value });
		if (name === 'chosenCommunity' && userCommunities && userCommunities.items) {
			this.setState({ community: userCommunities.items.find(x => x.code === value) });
		}
	}

	handlePlaySubmit(e) {
		e.preventDefault();

		this.setState({ submitted: true });
		const { chosenCommunity, password, community } = this.state;
		const { dispatch } = this.props;
		if (community && community.type == 'PRIVATE' && password) {
			dispatch(communityActions.play('private', community, password));
		} else if (community && community.type == 'PUBLIC') {
			console.log("CHOSEN COMMUNITY", community);
			dispatch(communityActions.play('public', community, password));
		}
	}

	handleJoinPublicSubmit(e) {
		e.preventDefault();

		this.setState({ submittedPublic: true });
		const { chosenPublic } = this.state;
		const { dispatch, communities } = this.props;
		if (chosenPublic && communities && communities.items && communities.items.length > 0) {
			const chosenCommunity = communities.items.find(x => x.code === chosenPublic);
			dispatch(communityActions.join('pubic', chosenCommunity, null));
		}
	}

	handleJoinPrivateSubmit(e) {
		e.preventDefault();

		this.setState({ submittedPrivate: true });
		const { chosenPrivate, passwordPrivate } = this.state;
		const { dispatch, communities } = this.props;
		if (chosenPrivate && communities && communities.items && communities.items.length > 0) {
			const chosenCommunity = communities.items.find(x => x.code === chosenPrivate);
			dispatch(communityActions.join('private', chosenCommunity, passwordPrivate));
		}
	}

	showPublicModal(type) {
		this.setState({ showPublic: true });
	}
	showPrivateModal(type) {
		this.setState({ showPrivate: true });
	}
	hidePublicModal(type) {
		this.setState({ showPublic: false });
	}
	hidePrivateModal(type) {
		this.setState({ showPrivate: false });
	}

	render() {
		console.log('Choose community PROPS', this.props);
		const {
			chosenCommunity, password, submitted, community,
			chosenPublic, submittedPublic, showPublic,
			chosenPrivate, passwordPrivate, submittedPrivate, showPrivate
		} = this.state;
		const { user, communities, notUserCommunities, userCommunities, publicCommunities, privateCommunities } = this.props;
		return (
			<div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-10 col-md-offset-1 ChooseCommunityMain">
				<div className="row">
					<div className="col-sm-12 col-md-12">
						<h2>Hi {user.name}!</h2>
						<h3><small>Create, join or choose a community</small></h3>
					</div>
				</div>
				<LoadMask loaded={userCommunities.userCommunitiesLoaded===true}>
					<div className="row">
						<div className="col-sm-3 col-sm-offset-3 col-md-1 col-md-pull-3 community-btn">
							<Link className="btn btn-success btn-lg" to="/community/create">Create new Community</Link>
						</div>
						<div className="col-sm-8 col-sm-pull-1 col-md-3 col-md-offset-1 community-btn">
							<Button bsStyle="primary" bsSize="large"
								disabled={!publicCommunities || publicCommunities.length === 0}
								onClick={this.showPublicModal}>Join Public Community</Button>
						</div>
						<div className="col-sm-3 col-sm-pull-1 col-md-3 col-md-offset-1 community-btn">
							<Button bsStyle="primary" bsSize="large"
								disabled={!privateCommunities || privateCommunities.length === 0}
								onClick={this.showPrivateModal}>Join Private Community</Button>
						</div>
					</div>
					<LoadMask loaded={communities.playLoaded === true}>
						{userCommunities.items && userCommunities.items.length > 0 &&
							<div className="row">
								<div className="col-xs-8 col-xs-offset-2 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
									<form name="form">
										<div><label>OR</label></div>
										<div className={'form-group' + (submitted && !chosenCommunity ? ' has-error' : '')}>
											<label htmlFor="chosenCommunity">Choose one of your communities to play:</label>
											<select className="form-control" name="chosenCommunity" defaultValue={chosenCommunity} onChange={this.handleChange} >
												<option value=''></option>
												{userCommunities.items.map((community, index) =>
													<option key={community.id} value={community.code}>{community.name}</option>
												)}
											</select>
											{submitted && !chosenCommunity &&
												<div className="help-block">A community must be chosen to play!</div>
											}
										</div>
										{community && community.type === 'PRIVATE' &&
											<div className={'form-group' + (submitted && chosenCommunity && !password ? ' has-error' : '')}>
												<input className="form-control" name="password" placeholder="Community password" onChange={this.handleChange} />
												{submitted && chosenCommunity && !password &&
													<div className="help-block">Password must be provided for a private community!</div>
												}
											</div>
										}
										<div className="form-group">
											<Button bsStyle="success" className="go-btn"
												disabled={!userCommunities || !userCommunities.items || userCommunities.items.length === 0}
												onClick={this.handlePlaySubmit}>Play</Button>
										</div>
									</form>
								</div>
							</div>
						}
					</LoadMask>
				</LoadMask>
				<div className="row">
					<p> <Link to="/login">Logout</Link> </p>
				</div>

				{/* Modal to join public community*/}
				<Modal show={showPublic} onHide={this.hidePublicModal} dialogClassName="custom-modal">
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-lg">Join Public Community</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<LoadMask loaded={communities.joinLoaded === true}>	
							{publicCommunities && publicCommunities.length > 0 &&
								<div className="row">
									<div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1">
										<form name="form">
											<div className={'form-group' + (submittedPublic && !chosenPublic ? ' has-error' : '')}>
												<label>Choose a public community to join:</label>
												<select className="form-control" name="chosenPublic" defaultValue={chosenPublic} onChange={this.handleChange}>
													<option value=''></option>
													{publicCommunities.map((publicCommunity, index) =>
														<option key={publicCommunity.id} value={publicCommunity.code}>{publicCommunity.name}</option>
													)}
												</select>
												{submittedPublic && !chosenPublic &&
													<div className="help-block">A community must be chosen to join!</div>
												}
											</div>
										</form>
									</div>
								</div>
							}
						</LoadMask>
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle="success" onClick={this.handleJoinPublicSubmit}>Join</Button>	
						<Button onClick={this.hidePublicModal}>Close</Button>
					</Modal.Footer>
				</Modal>

				{/* Modal to join private community*/}
				<Modal {...this.props} show={showPrivate} onHide={this.hidePrivateModal} dialogClassName="custom-modal">
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-lg">Join Private Community</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<LoadMask loaded={communities.joinLoaded === true}>	
							{privateCommunities && privateCommunities.length > 0 &&
								<div className="row">
									<div className="col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1">
										<form name="form">
											<div className={'form-group' + (submittedPrivate && !chosenPrivate ? ' has-error' : '')}>
												<label>Choose a private community to join:</label>
												<select className="form-control" name="chosenPrivate" defaultValue={chosenPrivate} onChange={this.handleChange}>
													<option value=''></option>
													{privateCommunities.map((privateCommunity, index) =>
														<option key={privateCommunity.id} value={privateCommunity.code}>{privateCommunity.name}</option>
													)}
												</select>
												{submittedPrivate && !chosenPrivate &&
													<div className="help-block">A community must be chosen to join!</div>
												}
											</div>
											<div className={'form-group' + (submittedPrivate && chosenPrivate && !passwordPrivate ? ' has-error' : '')}>
												<input type="password" className="form-control" name="passwordPrivate" placeholder="Community password" onChange={this.handleChange} />
												{submittedPrivate && chosenPrivate && !passwordPrivate &&
													<div className="help-block">Password must be provided for a private community!</div>
												}
											</div>
										</form>
									</div>
								</div>
							}
						</LoadMask>
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle="success" onClick={this.handleJoinPrivateSubmit}>Join</Button>	
						<Button onClick={this.hidePrivateModal}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { communities, userCommunities, authentication } = state;
	const { user } = authentication;
	const notUserCommunities = (communities.items && userCommunities.items) ? communities.items.filter(c => !(userCommunities.items.find(userC => userC.id === c.id))) : null;
	const publicCommunities = (notUserCommunities && notUserCommunities.length>0) ? notUserCommunities.filter(community => community.type === 'PUBLIC') : null;
	const privateCommunities = (notUserCommunities && notUserCommunities.length > 0) ? notUserCommunities.filter(community => community.type === 'PRIVATE') : null;
	return {
		user,
		communities,
		userCommunities,
		notUserCommunities,
		publicCommunities,
		privateCommunities
	};
}

const connectedChooseCommunityPage = connect(mapStateToProps)(ChooseCommunityPage);
export { connectedChooseCommunityPage as ChooseCommunityPage };
