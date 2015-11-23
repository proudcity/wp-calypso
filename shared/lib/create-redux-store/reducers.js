/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import sharing from 'lib/sharing/reducers';
import siteSettings from 'lib/site-settings/reducers';

export default combineReducers( {
	sharing,
	siteSettings
} );
