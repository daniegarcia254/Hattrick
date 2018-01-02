import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute, NoRouteMatch, Header } from '../_components';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { ChooseCommunityPage, CreateCommunityPage, HomeCommunityPage} from '../Community';

class App extends React.Component {
	constructor(props) {
		super(props);

		const { dispatch } = this.props;
		history.listen((location, action) => {
			// clear alert on location change
			dispatch(alertActions.clear());
		});
	}

	render() {
		const { alert } = this.props;
		return (
			<div>
				<div>
					<Header></Header>
				</div>
				<div className="container">
					<div className="row">
						{alert.message &&
							<div className={`alert ${alert.type}`}>{alert.message}</div>
						}
						<Router history={history}>
							<div>
								<Switch>	
									<PrivateRoute exact path="/community/choose" component={ChooseCommunityPage} />
									<PrivateRoute exact path="/community/create" component={CreateCommunityPage} />
									<PrivateRoute exact path="/community/:id/home" component={HomeCommunityPage} />
									<PrivateRoute exact path="/community/:id/table" component={HomeCommunityPage} />
									<PrivateRoute exact path="/community/:id/settings" component={HomeCommunityPage} />
									<PrivateRoute exact path="/community/:id/admin" component={HomeCommunityPage} />
									<Route exact path="/" render={() => (<Redirect to="/login" />)} />
									<Route path="/login" component={LoginPage} />
									<Route path="/register" component={RegisterPage} />
									<NoRouteMatch/>
								</Switch>	
							</div>
						</Router>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { alert } = state;
	return {
		alert
	};
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
