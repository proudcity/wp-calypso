/**
 * External Dependencies
 */
var React = require( 'react' ),
    ReactDom = require( 'react-dom' );

const Controller = {
	googleAnalytics() {
    const Main = require( 'my-sites/google-analytics/main' );

    // Render hello world...
    ReactDom.render(
        React.createElement( Main ),
        document.getElementById( 'primary' )
    );
	}
};

export default Controller;
