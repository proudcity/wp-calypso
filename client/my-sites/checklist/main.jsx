/**
 * External dependencies
 */
import React from 'react';


/**
 * Internal dependencies
 */
import Main from 'components/main';
var sites = require( 'lib/sites-list' )(),
  ChecklistItem = require( './checklist-item' ),
  ChecklistVideo = require( './checklist-video' );


export default React.createClass( {
  displayName: 'Checklist',

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
    /*ar site = sites.getSelectedSite();
    if ( sites.initialized ) {
      site.fetchSettings();
    } else {
      sites.once( 'change', function() {
        site = sites.getSelectedSite();
        site.fetchSettings();
      } );
    }*/

    //var completed = sites.options.proud_checklist;
    return ['editor'];
  },


  render() {
    var checklist = this.fetchChecklist();
    var completed = this.fetchCompleted();

    return (
      <div>
        <ul className="proud-checklist">
          { checklist.map( function( item ) {
            return (
              <ChecklistItem
                key={ item.key }
                completed={ completed }
                item={ item } />
            );
          }, this ) }
        </ul>
        <ChecklistVideo />
      </div>
    );
  }

} );
