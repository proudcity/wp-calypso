/**
 * External dependencies
 */
var React = require( 'react' ),
	defer = require( 'lodash/function/defer' ),
	page = require( 'page' );

/**
 * Internal dependencies
 */
var StepWrapper = require( 'signup/step-wrapper' ),
	productsList = require( 'lib/products-list' )(),
	cartItems = require( 'lib/cart-values' ).cartItems,
	SignupActions = require( 'lib/signup/actions' ),
	MapDomain = require( 'components/domains/map-domain' ),
	RegisterDomainStep = require( 'components/domains/register-domain-step' ),
	GoogleApps = require( 'components/upgrades/google-apps' ),
	Notice = require( 'components/notice' ),
	signupUtils = require( 'signup/utils' ),
	Button = require( 'components/button' );

var ReactScriptLoaderModule = require('react-script-loader');
var ReactScriptLoaderMixin= ReactScriptLoaderModule.ReactScriptLoaderMixin;
var ReactScriptLoader= ReactScriptLoaderModule.ReactScriptLoader;

var scriptURL = '//maps.googleapis.com/maps/api/js?key=AIzaSyBBF8futzrzbs--ZOtqQ3qd_PFnVFQYKo4&libraries=places&ver=4.4.2&callback=initializeMaps';
var place = false;

// This function is called by the Google maps API after its initialization is
// complete.
// We need to define this function in the window scope to make it accessible
// to the Google maps script.
window.initializeMaps = function() {
	var input = document.getElementById('searchTextField');
  var options = {componentRestrictions: {country: 'us'}};   
  var places = new google.maps.places.Autocomplete(input, options = {
    componentRestrictions: { country: "US" },
    types: ["(cities)"]
  });

  google.maps.event.addListener(places, 'place_changed', function () {
    place = places.getPlace();
    document.getElementById('location-submit').trigger('click');
    //ga('send', 'event', 'start', 'footer select', place.address_components[0].long_name+', '+place.address_components[2].long_name);
    //window.location = 'https://demo.proudcity.com/get/' + place.address_components[2].long_name + '/' + place.address_components[0].long_name;
  });
    // This triggers the onScriptLoaded method call on all mounted Map components.
    //ReactScriptLoader.triggerOnScriptLoaded(scriptURL);
}

module.exports = React.createClass( {
	displayName: 'LocationStep',
	mixins: [ReactScriptLoaderMixin],

	getScriptURL: function() {
    return scriptURL;
  },

  // Ensure that onScriptLoaded is deferred until the
  // ReactScriptLoader.triggerOnScriptLoaded() call above is made in
  // initializeMaps().
  deferOnScriptLoaded: function() {
    return true;
  },

  onScriptLoaded: function() {
    // Render a map with the center point given by the component's lat and lng
    // properties.
    /*var center = new google.maps.LatLng(this.props.lat, this.props.lng);
    var mapOptions = {
        zoom: 12,
        center: center,
        disableDefaultUI: true,
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
      };
    var map = new google.maps.Map(this.getDOMNode(), mapOptions);
*/
    

  },
  onScriptError: function() {
      // Show the user an error message.
  },

	showGoogleApps: function() {
		page( signupUtils.getStepUrl( this.props.flowName, this.props.stepName, 'google', this.props.locale ) );
	},

	showDomainSearch: function() {
		page( signupUtils.getStepUrl( this.props.flowName, this.props.stepName, this.props.locale ) );
	},

	getInitialState: function() {
		return { products: productsList.get() };
	},

	componentDidMount: function() {
		productsList.on( 'change', this.refreshState );
	},

	componentWillUnmount: function() {
		productsList.off( 'change', this.refreshState );
	},

	refreshState: function() {
		this.setState( { products: productsList.get() } );
	},

	handleAddDomain: function( suggestion ) {
		const stepData = {
			stepName: this.props.stepName,
			suggestion
		};

		if ( this.props.step.suggestion &&
			this.props.step.suggestion.domain_name !== suggestion.domain_name ) {
			// overwrite the Google Apps data if the user goes back and selects a different domain
			stepData.googleAppsForm = undefined;
		}

		SignupActions.saveSignupStep( stepData );

		//const isPurchasingItem = Boolean( suggestion.product_slug );

		defer( () => {
			// we must defer here because `submitWithDomain` also dispatches an action
			if ( isPurchasingItem ) {
				this.showGoogleApps();
			} else {
				this.submitWithDomain();
			}
		} );
	},

	getThemeArgs: function() {
		const isPurchasingTheme = this.props.queryObject && this.props.queryObject.premium;
		const themeSlug = this.props.queryObject ? this.props.queryObject.theme : undefined;
		const themeItem = isPurchasingTheme
			? cartItems.themeItem( themeSlug, 'signup-with-theme' )
			: undefined;

		return { themeSlug, themeItem };
	},



	handleSubmit: function( sectionName, state ) {
		event.preventDefault();
		console.log(place);
		themeSlug = 'asdf';
		SignupActions.submitSignupStep( {
				stepName: this.props.stepName,
				processingMessage: this.translate( 'Looking up your city' ),
			} );
	},



	render: function() {
		let content;
		const backUrl = this.props.stepSectionName ?
			signupUtils.getStepUrl( this.props.flowName, this.props.stepName ) :
			undefined;

		

		if ( this.props.step && 'invalid' === this.props.step.status ) {
			content = (
				<div className="domains-step__section-wrapper">
					<Notice status='is-error' showDismiss={ false }>
						{ this.props.step.errors.message }
					</Notice>
					{ content }
				</div>
			);
		}

		content = (
			<div><div>     
        <input ref='searchField' id="searchTextField" type="text" size="50"/>

				<Button 
					primary 
					id="location-submit"
					onClick={ this.handleSubmit } >
					Continue
				</Button>

      </div>
      <div className="mapCanvas"></div></div>
		);

		return (
			<StepWrapper
				flowName={ this.props.flowName }
				stepName={ this.props.stepName }
				backUrl={ backUrl }
				positionInFlow={ this.props.positionInFlow }
				signupProgressStore={ this.props.signupProgressStore }
				subHeaderText={ this.translate( 'First up, let\'s find your city.' ) }
				fallbackHeaderText={ this.translate( 'Let\'s find your city.' ) }
				fallbackSubHeaderText={ this.translate( 'Enter your city below' ) }
				stepContent={ content } />
		);
	}
} );
