/**
 * External Dependencies
 */
var React = require( 'react' ),
  ReactDom = require( 'react-dom' );

const Controller = {
  checklist() {
    const Main = require( 'my-sites/checklist/main' );

    // Render hello world...
    ReactDom.render(
      React.createElement( Main ),
      document.getElementById( 'primary' )
    );
  }
};

export default Controller;