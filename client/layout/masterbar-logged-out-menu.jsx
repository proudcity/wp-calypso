/**
 * External dependencies
 */
import React from 'react';

export default React.createClass( {
	handleClickTitle( event ) {
		event.preventDefault();

		// redirect using window directly to prevent the user from hitting the dead-end path handler
		window.location = '/';
	},

	render() {
		return (
			<nav className="wpcom-sections">
				<ul className="sections-menu">
					<li className="wpcom-title">
						<a href="/" onClick={ this.handleClickTitle }>
							<img src="http://proudcity.com/images/logo-white.png" alt="ProudCity" style={{height: '45px', width: 'auto'}} />
						</a>
					</li>
				</ul>
			</nav>
		);
	}

} );
