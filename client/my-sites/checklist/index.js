/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import controller from 'my-sites/controller';
import checklistController from './controller';

export default () => {
  page( '/checklist/:domain?', controller.siteSelection, controller.navigation, checklistController.checklist );
};