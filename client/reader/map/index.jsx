// External dependencies
import React from 'react';
import debugModule from 'debug';

//var MapGL = require('react-map-gl');

// Internal dependencies

import Main from 'components/main';

const debug = debugModule( 'calypso:reader:map' ); //eslint-disable-line no-unused-vars

const ReaderMap = React.createClass( {
	/*propTypes: {
		list: React.PropTypes.shape( {
			owner: React.PropTypes.string.isRequired,
			slug: React.PropTypes.string.isRequired
		} ),
		tab: React.PropTypes.oneOf( [ 'sites', 'tags', 'description-edit' ] ).isRequired,
	},

	getInitialState() {
		return this.getStateFromStores( this.props );
	},
	*/

	render() {
		// Not wrapping in Main to avoid L, R margins
		return (
			<div className={ 'reader-map' }>
				<div className="maps-coming-soon">
					Recently reported issues, crime, and more maps coming soon!
				</div>
				<img src="https://api.mapbox.com/v4/mapbox.emerald/-73.7638,42.6564,13/1200x800@2x.png?access_token=pk.eyJ1IjoiYWxiYXRyb3NzZGlnaXRhbCIsImEiOiI1cVUxbUxVIn0.SqKOVeohLfY0vfShalVDUw"
					width="100%" height="100%" />
			</div>
		);
		// @todo...
		return (
			<Main className={ 'reader-map' }>
				<MapGL width={400} height={400} latitude={37.7577} longitude={-122.4376}
				  zoom={8} onChangeViewport={(viewport) => {
				    var {latitude, longitude, zoom} = viewport;
				    // Optionally call `setState` and use the state to update the map.
				  }}
				/>
			</Main>
		);
	}
} );

export default ReaderMap;
