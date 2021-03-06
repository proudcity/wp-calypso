/**
 * External dependencies
 */
var React = require( 'react' ),
	noop = require( 'lodash/utility/noop' );

/**
 * Internal dependencies
 */
var analytics = require( 'analytics' ),
	SignupActions = require( 'lib/signup/actions' ),
	ThemesList = require( 'components/themes-list' ),
	StepWrapper = require( 'signup/step-wrapper' );

module.exports = React.createClass( {
	displayName: 'ThemeSelection',

	propTypes: {
		themes: React.PropTypes.arrayOf( React.PropTypes.shape( {
			name: React.PropTypes.string.isRequired,
			slug: React.PropTypes.string.isRequired
		} ) ),
		useHeadstart: React.PropTypes.bool,
	},

	getDefaultProps: function() {
		return {
			themes: [
			  { name: "Proud City", slug: "proudcity" },
			  { name: "Proud Department", slug: "proudagency" },
			  { name: "Proud Intranet", slug: "proudintranet" },
			  { name: "Proud Library", slug: "proudlibrary" },
			  { name: "Proud City Council", slug: "proudcitycouncil" },
			  { name: "Proud Chamber of Commerce", slug: "proudchamberofcommerce" },
			  //{ name: "Proud Police", slug: "ProudPolice" },
			  //{ name: "Proud Mayor", slug: "ProudMayor" },
			],

			useHeadstart: false
		};
	},

	handleScreenshotClick: function( theme ) {
		var themeSlug = theme.id;

		if ( true === this.props.useHeadstart && themeSlug ) {
			analytics.tracks.recordEvent( 'calypso_signup_theme_select', { theme: themeSlug, headstart: true } );

			SignupActions.submitSignupStep( {
				stepName: this.props.stepName,
				processingMessage: this.translate( 'Adding your theme' ),
				themeSlug
			}, null, {
				theme: 'pub/' + themeSlug
			} );
		} else {
			analytics.tracks.recordEvent( 'calypso_signup_theme_select', { theme: themeSlug, headstart: false } );

			SignupActions.submitSignupStep( {
				stepName: this.props.stepName,
				processingMessage: this.translate( 'Adding your theme' ),
				themeSlug
			} );
		}

		this.props.goToNextStep();
	},

	getThemes() {
		return this.props.signupDependencies.themes || this.props.themes;
	},

	renderThemesList: function() {
		var actionLabel = this.translate( 'Pick' ),
			themes = this.getThemes().map( function( theme ) {
				return {
					id: theme.slug,
					name: theme.name,
					//screenshot:  'https://i1.wp.com/s0.wp.com/wp-content/themes/pub/' + theme.slug + '/screenshot?w=660'
					screenshot: 'https://proudcity.github.io/proudcity-appstore/distributions/screenshots/'+ theme.slug + '.png'
				}
			} );
		return (
			<ThemesList
				getButtonOptions= { noop }
				onScreenshotClick= { this.handleScreenshotClick }
				onMoreButtonClick= { noop }
				getActionLabel={ function() {
					return actionLabel;
				} }
				{ ...this.props }
				themes= { themes } />
		);
	},

	render: function() {
		const defaultDependencies = this.props.useHeadstart ? { theme: 'pub/twentyfifteen' } : undefined;
		return (
			<StepWrapper
				fallbackHeaderText={ this.translate( 'Select your distribution.' ) }
				fallbackSubHeaderText={ this.translate( 'ProudCity comes in many flavors. Choose the correct one for your new site.' ) }
				subHeaderText={ this.translate( 'Select your distribution.' ) }
				stepContent={ this.renderThemesList() }
				defaultDependencies={ defaultDependencies }
				{ ...this.props } />
		);
	}
} );
