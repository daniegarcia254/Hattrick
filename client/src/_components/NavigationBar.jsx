import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const NavigationBar = (props) => {
	return (
		<Navbar inverse collapseOnSelect>
			<Navbar.Header>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<LinkContainer to={'/community/' + props.communities.current.id + '/home'}>
						<NavItem eventKey={1}>Table</NavItem>
					</LinkContainer>
					<LinkContainer to={'/community/' + props.communities.current.id + '/settings'}>
						<NavItem eventKey={2}>Settings</NavItem>
					</LinkContainer>
				</Nav>
				<Nav pullRight>
					<LinkContainer to="/login">
						<NavItem eventKey={3}>{props.user.name} (Logout)</NavItem>
					</LinkContainer>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
