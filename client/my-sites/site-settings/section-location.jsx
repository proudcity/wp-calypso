/**
 * External dependencies
 */
var React = require( 'react' ),
	debug = require( 'debug' )( 'calypso:my-sites:site-settings' );

/**
 * Internal dependencies
 */
var Card = require( 'components/card' ),
	SocialMediaForm = require( 'my-sites/site-settings/form-location' );

module.exports = React.createClass( {
	displayName: 'SiteSettingsLocation',

	componentWillMount: function() {
		debug( 'Mounting SiteSettingsSocialMedia React component.' );
	},

	render: function() {

		return (
			<Card className="location-settings">
				<LocationForm site={ this.props.site } />
			</Card>
		);

	}
} );
