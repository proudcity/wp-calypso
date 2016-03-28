/**
 * External Dependencies
 */
var React = require( 'react' ),
    ReactDom = require( 'react-dom' );

const Controller = {
	proudChecklist() {
    const Main = require( 'my-sites/proud-checklist/main' );

    // Render hello world...
    ReactDom.render(
        React.createElement( Main ),
        document.getElementById( 'primary' )
    );
	}
};

export default Controller;
