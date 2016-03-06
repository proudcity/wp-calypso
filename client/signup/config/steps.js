/**
 * External dependencies
 */
import { current } from 'page';

/**
* Internal dependencies
*/
import stepActions from 'lib/signup/step-actions';
import i18n from 'lib/mixins/i18n';

module.exports = {
	themes: {
		stepName: 'themes',
		apiRequestFunction: stepActions.setThemeOnSite,
		dependencies: [ 'siteSlug' ]
	},

	'themes-headstart': {
		stepName: 'themes-headstart',
		props: {
			useHeadstart: true,
		},
		dependencies: [ 'siteSlug' ],
		providesDependencies: [ 'theme' ]
	},

	altthemes: {
		stepName: 'altthemes',
		props: {
			themes: [
				{ name: 'Dyad', slug: 'dyad' },
				{ name: 'Independent Publisher', slug: 'independent-publisher' },
				{ name: 'Sela', slug: 'sela' },
				{ name: 'Hemingway Rewritten', slug: 'hemingway-rewritten' },
				{ name: 'Twenty Sixteen', slug: 'twentysixteen' },
				{ name: 'Penscratch', slug: 'penscratch' },
				{ name: 'Edin', slug: 'edin' },
				{ name: 'Publication', slug: 'publication' },
				{ name: 'Harmonic', slug: 'harmonic' },
			],
		},
		apiRequestFunction: stepActions.setThemeOnSite,
		dependencies: [ 'siteSlug' ]
	},

	'design-type': {
		stepName: 'design-type',
		providesDependencies: [ 'themes' ]
	},

	site: {
		stepName: 'site',
		apiRequestFunction: stepActions.createSite,
		providesDependencies: [ 'siteSlug' ]
	},

	user: {
		stepName: 'user',
		apiRequestFunction: stepActions.createAccount,
		providesToken: true,
		providesDependencies: [ 'bearer_token', 'username' ]
	},

	test: {
		stepName: 'test',
	},

	survey: {
		stepName: 'survey',
		props: {
			surveySiteType: ( current && current.toString().match( /\/start\/blog/ ) ) ? 'blog' : 'site'
		},
		providesDependencies: [ 'surveySiteType', 'surveyQuestion' ]
	},

	plans: {
		stepName: 'plans',
		apiRequestFunction: stepActions.addPlanToCart,
		dependencies: [ 'siteSlug' ],
		providesDependencies: [ 'cartItem' ]
	},

	'select-plan': {
		stepName: 'select-plan',
		apiRequestFunction: stepActions.addPlanToCart,
		dependencies: [ 'siteSlug' ],
		providesDependencies: [ 'cartItem' ]
	},

	'select-plan-or-skip': {
		stepName: 'select-plan-or-skip',
		apiRequestFunction: stepActions.addPlanToCart,
		dependencies: [ 'siteSlug' ],
		providesDependencies: [ 'cartItem' ]
	},

	domains: {
		stepName: 'domains',
		apiRequestFunction: stepActions.addDomainItemsToCart,
		providesDependencies: [ 'siteSlug', 'domainItem', 'themeItem' ],
		delayApiRequestUntilComplete: true
	},

	'domains-with-theme': {
		stepName: 'domains-with-theme',
		apiRequestFunction: stepActions.addDomainItemsToCart,
		providesDependencies: [ 'siteSlug', 'domainItem', 'themeItem' ],
		dependencies: [ 'theme' ],
		delayApiRequestUntilComplete: true
	},

	'jetpack-user': {
		stepName: 'jetpack-user',
		apiRequestFunction: stepActions.createAccount,
		providesToken: true,
		props: {
			headerText: i18n.translate( 'Create an account for Jetpack' ),
			subHeaderText: i18n.translate( 'You\'re moments away from connecting Jetpack.' )
		},
		providesDependencies: [ 'bearer_token', 'username' ]
	},

	location: {
		stepName: 'location',
		apiRequestFunction: stepActions.addDomainItemsToCart,
		providesDependencies: [ 'siteSlug', 'domainItem', 'themeItem' ],
		delayApiRequestUntilComplete: true
	}
};
