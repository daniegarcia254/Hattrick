import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const NoRouteMatch = ({ base: base, ...rest }) => (
	<Route render={props => (
		localStorage.getItem('user')
			? ( props.match.params.id
				? <Redirect to={{ pathname: (base + '/community/' + props.match.params.id+'/choose'), state: { from: props.location } }} />
				: <Redirect to={{ pathname: (base + '/community/choose'), state: { from: props.location } }} />
			) : <Redirect to={{ pathname: (base + '/login'), state: { from: props.location } }} />
	)} />
)