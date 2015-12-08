import Dispatcher from 'dispatcher';
import { OrderedSet, fromJS } from 'immutable';
import pick from 'lodash/object/pick';
import debugModule from 'debug';

import Emitter from 'lib/mixins/emitter';
import { ACTION_RECEIVE_READER_LIST_TAGS, ACTION_RECEIVE_READER_LIST_TAGS_ERROR } from './constants';

/**
 * Module variables
 */
const debug = debugModule( 'calypso:reader-lists-tags-store' );

var tags = OrderedSet(),
	page = 1;

const store = {
	get( listId ) {
		return tags.toJS();
	},
	getPage() {
		return page;
	}
};

function receiveTags( data ) {
	debug( data );
	// // consume the recommendations
	// const previousRecs = recommendations;
	// if ( data && data.blogs ) {
	// 	const pruned = data.blogs.map( function( blog ) {
	// 		return pick( blog, [ 'blog_id', 'follow_reco_id', 'reason' ] );
	// 	} );

	// 	recommendations = recommendations.union( fromJS( pruned ) );
	// 	if ( recommendations !== previousRecs ) {
	// 		page++;
	// 		store.emit( 'change' );
	// 	}
	// }
}

function receiveError( /*error*/ ) {

}

Emitter( store ); // eslint-disable-line new-cap

store.dispatchToken = Dispatcher.register( function( payload ) {
	const action = payload && payload.action;

	switch ( action.type ) {
		case ACTION_RECEIVE_READER_LIST_TAGS:
			receiveTags( action.data );
			break;
		case ACTION_RECEIVE_READER_LIST_TAGS_ERROR:
			receiveError( action.error );
			break;
	}
} );

export default store;
