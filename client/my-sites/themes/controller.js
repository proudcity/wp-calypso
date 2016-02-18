/**
 * External Dependencies
 */
var ReactDom = require( 'react-dom' ),
	React = require( 'react' ),
	ReduxProvider = require( 'react-redux' ).Provider;

/**
 * Internal Dependencies
 */
var SingleSiteComponent = require( 'my-sites/themes/single-site' ),
	MultiSiteComponent = require( 'my-sites/themes/multi-site' ),
	LoggedOutComponent = require( 'my-sites/themes/logged-out' ),
	ThemeSheetComponent = require( 'my-sites/themes/sheet' ).ThemeSheet,
	analytics = require( 'analytics' ),
	i18n = require( 'lib/mixins/i18n' ),
	trackScrollPage = require( 'lib/track-scroll-page' ),
	setSection = require( 'state/ui/actions' ).setSection,
	getCurrentUser = require( 'state/current-user/selectors' ).getCurrentUser,
	buildTitle = require( 'lib/screen-title/utils' ),
	getAnalyticsData = require( './helpers' ).getAnalyticsData;

var controller = {

	themes: function( context ) {
		const { tier, site_id } = context.params;
		const user = getCurrentUser( context.store.getState() );
		const title = buildTitle(
			i18n.translate( 'Themes', { textOnly: true } ),
			{ siteID: site_id } );
		const Head = user
			? require( 'layout/head' )
			: require( 'my-sites/themes/head' );

		let ThemesComponent;

		if ( user ) {
			ThemesComponent = site_id ? SingleSiteComponent : MultiSiteComponent;
		} else {
			ThemesComponent = LoggedOutComponent;
		}

		const { basePath, analyticsPageTitle } = getAnalyticsData(
			context.path,
			tier,
			site_id
		);

		analytics.pageView.record( basePath, analyticsPageTitle );
		ReactDom.render(
			React.createElement( ReduxProvider, { store: context.store },
				React.createElement( Head, { title, tier: tier || 'all' },
					React.createElement( ThemesComponent, {
						key: site_id,
						siteId: site_id,
						tier: tier,
						search: context.query.s,
						trackScrollPage: trackScrollPage.bind(
							null,
							basePath,
							analyticsPageTitle,
							'Themes'
						)
					} )
				)
			),
			document.getElementById( 'primary' )
		);
	},

	details: function( context ) {
		const user = getCurrentUser( context.store.getState() );

		const Head = user
			? require( 'layout/head' )
			: require( 'my-sites/themes/head' );

		const element = (
			<ReduxProvider store={ context.store } >
				<Head title="Something Theme — WordPress.com" isSheet>
					<ThemeSheetComponent themeSlug={ context.params.slug } />
				</Head>
			</ReduxProvider>
		);

		// FIXME: temporary hack until we have a proper isomorphic, one tree routing solution. Do NOT do this!
		const sheetsDomElement = document.getElementsByClassName( 'themes__sheet' )[0];
		if ( ! sheetsDomElement ) {
			ReactDom.render( element, document.getElementById( 'primary' ) );
		}

		return element;
	}

};

module.exports = controller;
