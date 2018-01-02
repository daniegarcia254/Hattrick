import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadMask from 'react-loader';

import { NavigationBar } from '../_components';
import { communityActions } from '../_actions';
import CommunityCSS from '../_css/Community.scss';

class HomeCommunityPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		let communityID = this.props.match.params.id;
		this.props.dispatch(communityActions.getById(communityID));
	}

	render() {
		const { user, communities} = this.props;
		return (
			<div className="col-xs-12 col-sm-12 col-md-12 HomeCommunityMain">
				{communities && communities.current &&
					<NavigationBar {...this.props}></NavigationBar>
				}
				<LoadMask loaded={communities.getCurrentCommunityLoaded === true}>
					<div className="row">
						{communities && communities.current && communities.current.users &&
							<h4>{communities.current.name} community</h4>
						}
						<div className="col-md-10 col-md-offset-1">
							<div className="table-responsive">
								<table className="table table-striped table-hover table-condensed">
									<thead>
										<tr>
											<th>Name</th>
											<th>Score</th>
										</tr>
									</thead>
									{communities && communities.current && communities.current.users &&
										<tbody>
											{communities.current.users.map((user, index) =>
												<tr key={user.id}><td>{user.name}</td><td>0</td></tr>
											)}
										</tbody>	
									}	
								</table>
							</div>
						</div>
					</div>
				</LoadMask>
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

const connectedHomeCommunityPage = connect(mapStateToProps)(HomeCommunityPage);
export { connectedHomeCommunityPage as HomeCommunityPage };
