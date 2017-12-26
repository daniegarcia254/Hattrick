import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { categoryActions, communityActions } from '../_actions';
import { loadmask } from '../_helpers';
import CommunityCSS from '../_css/Community.scss';
import LoaderGif from '../_assets/loader.gif';
import LoadMask from 'react-loader'

class CreateCommunityPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			type: 'PUBLIC',
			categoryID: 1,
			name: '',
			password: '',
			submitted: false,
			creatingCommunity: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(categoryActions.getAll());
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ submitted: true, creatingCommunity: true });
		const { type, categoryID, name, password } = this.state;
		const { dispatch } = this.props;
		if ((type === 'PUBLIC' && categoryID && name) || (type === 'PRIVATE' && categoryID && name && password)) {
			dispatch(communityActions.create(type, parseInt(categoryID), name, password));
		} else {
			this.setState({ creatingCommunity: false });
		}
	}

	render() {
		const { type, categoryID, name, password, submitted, creatingCommunity } = this.state;
		const { user, categories, communities} = this.props;
		return (
			<div className="col-md-6 col-md-offset-3">
				<h2>Create new Community</h2>
				<div className="row">
					<LoadMask loaded={categories.loaded}>
						{categories.error && <span className="text-danger">Error loading categories: {categories.error}</span>}
						{categories.items && categories.items.length > 0 &&
							<form name="form" onSubmit={this.handleSubmit}>
								<div className={'form-group' + (submitted && !type ? ' has-error' : '')}>
									<label htmlFor="type">Type</label>
									<select className="form-control" name="type" defaultValue="PUBLIC" onChange={this.handleChange} >
										<option key="PUBLIC" value="PUBLIC">PUBLIC</option>
										<option key="PRIVATE" value="PRIVATE">PRIVATE</option>
									</select>
								</div>
								<div className={'form-group' + (submitted && !categoryID ? ' has-error' : '')}>
									<label htmlFor="categoryID">Category</label>
									<select className="form-control" name="categoryID" defaultValue={categoryID} onChange={this.handleChange} >
										{categories.items.map((category, index) =>
											<option key={category.id} value={category.id}>{category.name}</option>
										)}
									</select>
									{submitted && !categoryID &&
										<div className="help-block">Category is required</div>
									}
								</div>
								<div className={'form-group' + (submitted && !name ? ' has-error' : '')}>
									<label htmlFor="name">Name</label>
									<input type="text" className="form-control" name="name" placeholder="Community name" onChange={this.handleChange} />
									{submitted && !name &&
										<div className="help-block">Name is required</div>
									}
								</div>
								{type && type === "PRIVATE" &&
									<div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
										<label htmlFor="password">Password</label>
										<input type="password" className="form-control" name="password" placeholder="Community password" onChange={this.handleChange} />
										{submitted && !password &&
											<div className="help-block">Password is required</div>
										}
									</div>
								}
								<div>
									{communities.error && <span className="text-danger">Error creating community: {communities.error}</span>}
								</div>
								<div className="form-group">
									<button className="btn btn-success" disabled={categories.error ? 'disabled' : ''}>Create</button>
									{creatingCommunity && !communities.error && <img className="Loader" src={LoaderGif} />}
								</div>
							</form>
						}
					</LoadMask>		
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { categories, authentication, communities } = state;
	const { user } = authentication;
	return {
		user,
		categories,
		communities
	};
}

const connectedCreateCommunityPage = connect(mapStateToProps)(CreateCommunityPage);
export { connectedCreateCommunityPage as CreateCommunityPage };
