// External dependencies
import React from 'react';
import debugModule from 'debug';

// Internal dependencies

import Main from 'components/main';

const debug = debugModule( 'calypso:reader:documents' ); //eslint-disable-line no-unused-vars

const ReaderDocuments = React.createClass( {
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
		return (
			<Main className={ 'reader-documents' }>

			<iframe class="folder-iframe" src="https://drive.google.com/embeddedfolderview?id=0B2VyTCuu8c1KR2taUVI0Qk1OQkk#grid" width="100%" height="500" frameborder="0"></iframe>
			</Main>
		);
	}
} );

export default ReaderDocuments;
