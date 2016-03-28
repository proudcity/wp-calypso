/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import controller from 'my-sites/controller';
import googleAnalyticsController from './controller';

export default () => {
	page( '/google-analytics/:domain?', controller.siteSelection, controller.navigation, googleAnalyticsController.googleAnalytics );
};
