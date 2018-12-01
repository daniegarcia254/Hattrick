import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { userActions } from '../_actions';
import LoaderGif from '../_assets/loader.gif';
import LoginCSS from '../_css/Login.scss';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleKeyPress(e) {
        if (e.key == 'Enter') {
            this.handleSubmit();
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        if (e) e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { loggingIn, base } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 LoginPage">
                <div className="row login-title">
                    <div className="col-sm-12 col-md-12">
                        <h2>Login</h2>
                    </div>
                </div>    
                <form name="form">
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username}
                            onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password}
                            onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <div className="row">    
                            <div className="col-xs-12 col-sm-12 col-md-12">
                                <Button bsStyle="success" className="login-btn" onClick={this.handleSubmit}>Login</Button>
                                {loggingIn &&
                                    <img className="Loader" src={LoaderGif} />
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12">
                                <Link to={base + "/register"} className="btn btn-primary register-btn">Register</Link>
                            </div>
                        </div>
                    </div>
                </form>
                <div>
                    <Link to={base + "/reset"} className="forgot-password-btn">Have you forgotten your password?</Link>
                </div>    
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn,
        base: SERVER_ROOT
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
