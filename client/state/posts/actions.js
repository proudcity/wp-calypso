/**
 * Internal dependencies
 */
import wpcom from 'lib/wp';
import {
	POST_REQUEST,
	POST_REQUEST_SUCCESS,
	POST_REQUEST_FAILURE,
	POSTS_RECEIVE,
	POSTS_REQUEST,
	POSTS_REQUEST_SUCCESS,
	POSTS_REQUEST_FAILURE
} from 'state/action-types';

/**
 * Returns an action object to be used in signalling that a post object has
 * been received.
 *
 * @param  {Object} post Post received
 * @return {Object}      Action object
 */
export function receivePost( post ) {
	return receivePosts( [ post ] );
}

/**
 * Returns an action object to be used in signalling that post objects have
 * been received.
 *
 * @param  {Array}  posts Posts received
 * @return {Object}       Action object
 */
export function receivePosts( posts ) {
	return {
		type: POSTS_RECEIVE,
		posts
	};
}

/**
 * Triggers a network request to fetch posts for the specified site and query.
 *
 * @param  {Number}   siteId Site ID
 * @param  {String}   query  Post query
 * @return {Function}        Action thunk
 */
export function requestSitePosts( siteId, query = {} ) {
	return ( dispatch ) => {
		dispatch( {
			type: POSTS_REQUEST,
			siteId,
			query
		} );

		return wpcom.site( siteId ).postsList( query ).then( ( { found, posts } ) => {
			dispatch( receivePosts( posts ) );
			dispatch( {
				type: POSTS_REQUEST_SUCCESS,
				siteId,
				query,
				found,
				posts
			} );
		} ).catch( ( error ) => {
			dispatch( {
				type: POSTS_REQUEST_FAILURE,
				siteId,
				query,
				error
			} );
		} );
	};
}

/**
 * Triggers a network request to fetch a specific post from a site.
 *
 * @param  {Number}   siteId Site ID
 * @param  {Number}   postId Post ID
 * @return {Function}        Action thunk
 */
export function requestSitePost( siteId, postId ) {
	return ( dispatch ) => {
		dispatch( {
			type: POST_REQUEST,
			siteId,
			postId
		} );

		return wpcom.site( siteId ).post( postId ).get().then( ( post ) => {
			dispatch( receivePost( post ) );
			dispatch( {
				type: POST_REQUEST_SUCCESS,
				siteId,
				postId
			} );
		} ).catch( ( error ) => {
			dispatch( {
				type: POST_REQUEST_FAILURE,
				siteId,
				postId,
				error
			} );
		} );
	};
}