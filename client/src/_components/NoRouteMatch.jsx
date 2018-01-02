import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const NoRouteMatch = () => (
	<Route render={props => (
		localStorage.getItem('user')
			? ( props.match.params.id
				? <Redirect to={{ pathname: '/community/' + props.match.params.id+'/choose', state: { from: props.location } }} />
				: <Redirect to={{ pathname: '/community/choose', state: { from: props.location } }} />
			) : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
	)} />
)