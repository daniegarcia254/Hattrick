import React from 'react';
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
					<LinkContainer to={props.base + '/community/' + props.communities.current.id + '/home'}>
						<NavItem eventKey={1}>Home</NavItem>
					</LinkContainer>
					<LinkContainer to={props.base + '/community/' + props.communities.current.id + '/table'}>
						<NavItem eventKey={2}>Table</NavItem>
					</LinkContainer>
					<LinkContainer to={props.base + '/community/' + props.communities.current.id + '/settings'}>
						<NavItem eventKey={3}>Settings</NavItem>
					</LinkContainer>
					{props.communities.current.adminID === props.user.userId &&
						<LinkContainer to={props.base + '/community/' + props.communities.current.id + '/admin'}>
							<NavItem eventKey={4}>Admin</NavItem>
						</LinkContainer>
					}
				</Nav>
				<Nav pullRight>
					<LinkContainer to={props.base + "/login"}>
						<NavItem eventKey={5}>{props.user.name} (Logout)</NavItem>
					</LinkContainer>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
