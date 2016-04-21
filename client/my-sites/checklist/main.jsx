/**
 * External dependencies
 */
import React from 'react';
import ReactPlayer from 'react-player'


/**
 * Internal dependencies
 */
import Main from 'components/main';
var sites = require( 'lib/sites-list' )(),
  ChecklistItem = require( './checklist-item' ),
  ChecklistSupportBlock = require( './checklist-support-block' );

export default React.createClass( {
  displayName: 'Checklist',

  getInitialState() {
    return {
      video: 'https://www.youtube.com/watch?v=KyjmUMX2meo',
      playing: false,
      site: sites.getSelectedSite()
    };
  },

  fetchChecklist: function() {
    return [
      {
      "key": "editor",
      "title": "Learn about The Editor",
      "icon": "fa-list-alt",
      "link": null,
      "video": "v2Hm-XkZ0WY"
      },
      {
      "key": "media",
      "title": "Add imagery",
      "icon": "fa-picture-o",
      "link": "\/wp-admin\/upload.php",
      "video": null
      },
      {
      "key": "appearance",
      "title": "Configure appearance",
      "icon": "fa-paint-brush",
      "link": "wp-admin\/customize.php?return=\/wp-admin",
      "video": null
      },
      {
      "key": "integrations",
      "title": "Select integrations",
      "icon": "fa-share-square",
      "link": "\/wp-admin\/admin.php?page=integrations",
      "video": null
      },
      {
      "key": "social",
      "title": "Set up social feed",
      "icon": "fa-comments",
      "link": "\/wp-admin\/admin.php?page=social",
      "video": null
      },
      {
      "key": "home",
      "title": "Edit homepage",
      "icon": "fa-th-large",
      "link": "\/wp-admin\/post.php?post=139&action=edit",
      "video": null
      },
      {
      "key": "answers",
      "title": "Add answers",
      "icon": "fa-list-alt",
      "link": "\/wp-admin\/edit.php?post_type=question",
      "video": "rGPs8nPEA4E"
      },
      {
      "key": "payments",
      "title": "Set up payments",
      "icon": "fa-credit-card",
      "link": "\/wp-admin\/edit.php?post_type=payment",
      "video": "GfggmaEypdg"
      },
      {
      "key": "agencies",
      "title": "Create agencies",
      "icon": "fa-university",
      "link": "\/wp-admin\/edit.php?post_type=agency",
      "video": "gWDzE7O5uro"
      },
      {
      "key": "forms",
      "title": "Add forms",
      "icon": "fa-check-square-o",
      "link": "\/wp-admin\/admin.php?page=wpcf7"
      }
    ];
  },

  fetchCompleted: function() {
    // Get current status from sites state
    if ( sites.initialized ) {
      this.state.site.fetchSettings();
    } else {
      sites.once( 'change', function() {
        this.setState({
          site: sites.getSelectedSite()
        });
        this.state.site.fetchSettings();
      } );
    }

    //var completed = sites.options.proud_checklist;
    return ['editor'];
  },

  changeVideo: function( video ) {
    this.setState({
      video: 'https://www.youtube.com/watch?v=' + video,
      playing: true
    })
  },

  render() {
    var checklist = this.fetchChecklist();
    var completed = this.fetchCompleted();

    const {
      video,
      playing
    } = this.state

    return (
      <div className={ 'proud-checklist-page' }>
        <h1 className="proud-checklist-page__title">Welcome to ProudCity</h1>
        <p>Use the checklist below to set up your site.  You will be up and running in a matter of hours--not months!</p>

        <div className={ 'module-column' }>
          <ul className="proud-checklist">
            { checklist.map( function( item ) {
              return (
                <ChecklistItem
                  key={ item.key }
                  completed={ completed }
                  item={ item }
                  changeVideo={ this.changeVideo } />
              );
            }, this ) }
          </ul>
        </div>

        <div className={ 'module-column' }>
          <ReactPlayer
            url={ video }
            playing={ playing }
            width={ 380 }
            height={ 214 }
          />

          <ChecklistSupportBlock />
        </div>

      </div>

    );
  }

} );
