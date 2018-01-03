import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import validator from 'validator';
import { Button } from 'react-bootstrap';

import { userActions } from '../_actions';
import LoaderGif from '../_assets/loader.gif';
import ForgotPasswordCSS from '../_css/ForgotPassword.scss';

class ForgotPasswordPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			submitted: false
		};

		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleKeyPress(event) {
		if (event.key == 'Enter') {
			this.handleSubmit(event);
		}
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	handleSubmit(event) {
		if (event) event.preventDefault();

		this.setState({ submitted: true });
		const { email} = this.state;
		const { dispatch } = this.props;
		if (email && validator.isEmail(email)) {
			dispatch(userActions.requestPasswordReset(email));
		}
	}

	render() {
		const { reseting, base } = this.props;
		const { email, submitted } = this.state;
		console.log("PROPS", this.props, this.state);
		return (
			<div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 ForgotPasswordPage">
				<div className="row register-title">
					<div className="col-xs-12 col-sm-12 col-md-12">
						<h4><small>Please, introduce your email address and press the <em>Send</em> button.
						An email will be sent to you with a link for reset your account password</small></h4>
					</div>
				</div>
				<form name="form">
					<div className={'form-group' + (submitted && (!email || !validator.isEmail(email)) ? ' has-error' : '')}>
						<label htmlFor="email">Email</label>
						<input type="text" className="form-control" name="email" value={email}
							onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
						{submitted && !email && <div className="help-block">Email is required</div> }
						{submitted && email && !validator.isEmail(email) && <div className="help-block">Email is not valid</div> }
					</div>
					<div className="form-group">
						<Button bsStyle="success" className="send-btn" onClick={this.handleSubmit}>Send</Button>
						{reseting === true && <img className="Loader" src={LoaderGif} /> }
						<Link to={base + "/login"} className="btn btn-danger cancel-btn">Cancel</Link>
					</div>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { reseting } = state.users;
	return {
		reseting,
		base: SERVER_ROOT
	};
}

const connectedForgotPasswordPage = connect(mapStateToProps)(ForgotPasswordPage);
export { connectedForgotPasswordPage as ForgotPasswordPage };
