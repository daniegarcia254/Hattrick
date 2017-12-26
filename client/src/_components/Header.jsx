import React from 'react';
import HeaderLogo from '../_assets/header.png';
import HeaderCss from '../_css/Header.scss';

export const Header = () => {
	return (
		<div className="Header">
			<img src={HeaderLogo} />
		</div>
	);
};
