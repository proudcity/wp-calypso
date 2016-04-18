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

var CheckListItem = React.createClass( {

  
  getInitialState() {
    return {
      done: this.isCompleted()
    };
  },

  isCompleted: function() {
    return this.props.completed.indexOf(this.props.item.key) != -1;
  },

  renderCheckbox: function() {
    return (
      <span className="pull-left">
        <input
          type={ "checkbox" } 
          name={ "checklist" }
          value={ this.props.item.key } 
          checked={ ( this.state && this.state.done ) || this.props.done }
          onChange={ this.changeCheckbox } />
      </span>
    );
  },

  changeCheckbox: function() {
    var key = this.props.item.key;
    if (this.isCompleted()) {
      this.props.completed.splice(this.props.completed.indexOf(key), 1);
    }
    else {
      this.props.completed.push(key);
    }
    this.setState({
      done: this.isCompleted()
    });
  },

  renderDoButton: function() {
    if (!this.props.item.link) {
      return ( <span /> );
    }

    return (
      <button onClick={ this.clickDoButton } className={ "button is-primary" }>
        <i className="fa fa-fw fa-external-link"></i>
        { this.translate( 'Do it' ) }
      </button>
    );
  },


  clickDoButton: function() {
    analytics.ga.recordEvent( 'Checklist', 'Clicked Do It button ' + this.props.item.title );
    //window.location = 
    console.log(this.props.item.link);
    alert('asdf');
  },


  renderWatchButton: function() {
    if (!this.props.item.video) {
      return ( <span /> );
    }

    return (
      <button onClick={ this.clickWatchButton } className={ "button" }>
        <i className="fa fa-fw fa-youtube-play"></i>
        { this.translate( 'Watch' ) }
      </button>
    );
  },

  clickWatchButton: function() {
    this.props.changeVideo(this.props.item.video);
  },




  render() {
    var item = this.props.item;
    console.log(item);
    return (
      <li
        className={ this.state.done ? 'card completed' : 'card' }
        key={ item.key }
      >
        { this.renderCheckbox() }
        <h3 className={ 'module-header-title' }>{ this.translate( item.title ) }</h3>
        <div className={ 'content' }>
          { this.renderDoButton() }
          { this.renderWatchButton() }
        </div>
      </li>
    );

  }

} );



module.exports = CheckListItem;
