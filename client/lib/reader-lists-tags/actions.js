import Dispatcher from 'dispatcher';
import wpcom from 'lib/wp';
import get from 'lodash/object/get';

import { requestInflight, requestTracker } from 'lib/inflight';
import store from './store';
import { ACTION_RECEIVE_READER_LIST_TAGS, ACTION_RECEIVE_READER_LIST_TAGS_ERROR } from './constants';

// function extractSiteId( siteRecommendation ) {
// 	return siteRecommendation.blog_id;
// }

export function fetchMoreTags( listOwner, listSlug ) {
	if ( requestInflight( ACTION_RECEIVE_READER_LIST_TAGS ) ) {
		return;
	}

	// get the current recs that we want to exclude
	let args = {
		owner: listOwner,
		slug: listSlug
	};

	// let currentIds = store.get();

	// if ( currentIds && currentIds.length > 0 ) {
	// 	currentIds = currentIds.map( extractSiteId );
	// 	args.exclude = currentIds;
	// }

	wpcom.undocumented().readListTags( args, requestTracker( ACTION_RECEIVE_READER_LIST_TAGS, function( error, data ) {
		if ( error ) {
			Dispatcher.handleServerAction( {
				type: ACTION_RECEIVE_READER_LIST_TAGS_ERROR,
				data: data,
				error: error
			} );
		} else {
			Dispatcher.handleServerAction( {
				type: ACTION_RECEIVE_READER_LIST_TAGS,
				data: data
			} );
		}
	} ) );
}
