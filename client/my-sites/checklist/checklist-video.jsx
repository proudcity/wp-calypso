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

var ChecklistVideo = React.createClass( {

  componentDidMount: function() {

    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        class: 'embed-responsive-item',
        videoId: 'KyjmUMX2meo',
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }

    //console.log($(ReactDOM.findDOMNode(this)));

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      //event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
    }
    function stopVideo() {
    }

    function changeVideo(id) {
      player.loadVideoById(id);
    }

  },


  render() {

    return (
      <div id="player" />
    );

  }

} );



module.exports = ChecklistVideo;
