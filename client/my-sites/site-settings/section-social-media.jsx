/**
 * External dependencies
 */
var React = require( 'react' ),
	debug = require( 'debug' )( 'calypso:my-sites:site-settings' );

/**
 * Internal dependencies
 */
var Card = require( 'components/card' ),
	SocialMediaForm = require( 'my-sites/site-settings/form-social-media' );

module.exports = React.createClass( {
	displayName: 'SiteSettingsSocialMedia',

	componentWillMount: function() {
		debug( 'Mounting SiteSettingsSocialMedia React component.' );
	},

	render: function() {

		return (
			<Card className="social-media-settings">
				<SocialMediaForm site={ this.props.site } />
			</Card>
		);

	}
} );
