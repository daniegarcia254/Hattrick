import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute, NoRouteMatch, Header } from '../_components';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { ForgotPasswordPage } from '../ForgotPasswordPage';
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
		const { alert,base } = this.props;
		return (
			<div>
				<div>
					<Header></Header>
				</div>
				<div className="container">
					<div className="row row-alert">
						{alert.message &&
							<div className={`alert ${alert.type}`}>{alert.message}</div>
						}
						<Router history={history}>
							<div>
								<Switch>	
									<PrivateRoute exact path={base + "/community/choose"} component={ChooseCommunityPage} base={base} />
									<PrivateRoute exact path={base + "/community/create"} component={CreateCommunityPage} base={base} />
									<PrivateRoute exact path={base + "/community/:id/home"} component={HomeCommunityPage} base={base} />
									<PrivateRoute exact path={base + "/community/:id/table"} component={HomeCommunityPage} base={base} />
									<PrivateRoute exact path={base + "/community/:id/settings"} component={HomeCommunityPage} base={base} />
									<PrivateRoute exact path={base + "/community/:id/admin"} component={HomeCommunityPage} base={base} />
									<Route exact path="/" render={() => (<Redirect to={base + "/login"} />)} />
									<Route exact path={base + "/"} render={() => (<Redirect to={base + "/login"} />)} />
									<Route path={base + "/login"} component={LoginPage} />
									<Route path={base + "/register"} component={RegisterPage} />
									<Route path={base + "/reset"} component={ForgotPasswordPage} />
									<NoRouteMatch base={base}/>
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
		alert,
		base: SERVER_ROOT
	};
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
