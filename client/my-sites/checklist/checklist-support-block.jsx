/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
/**
 * Internal dependencies
 */
var analytics = require( 'analytics' );

var ChecklistSupportBlock = React.createClass( {

  render() {
    return (
      <div className={ 'help-cards' }>
        <h2 className="help-title">Get Help</h2>
        <div>
          <a className={ 'module-column card' } href="https://proudcity.com/chat" target="_blank">
            <i className="fa fa-comment fa-3x"></i>
            <h3>Live Chat</h3>
          </a>
          <a className={ 'module-column card' } href="https://proudcity.com/request-feature" target="_blank">
            <i className="fa fa-plus-circle fa-3x"></i>
            <h3>Request a feature</h3>
          </a>
        </div>
        <div>
          <a className={ 'module-column card' } href="https://proudcity.com/support/create" target="_blank">
            <i className="fa fa-sticky-note-o fa-3x"></i>
            <h3>Create a ticket</h3>
          </a>
          <a className={ 'module-column card' } href="https://proudcity.com/guides" target="_blank">
            <i className="fa fa-binoculars fa-3x"></i>
            <h3>Guides</h3>
          </a>
        </div>
      </div>
    );

  } // render

} );



module.exports = ChecklistSupportBlock;
