/**
* External dependencies
*/
import React, { PropTypes } from 'react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import observe from 'lib/mixins/data-observe';
import Card from 'components/card';
import User from 'lib/user';
import toggle from '../mixin-toggle';
import Gridicon from 'components/gridicon';
import StatsTabs from '../stats-tabs';
import StatsTab from '../stats-tabs/tab';

const user = User();

export default React.createClass( {
	displayName: 'GovReady',

	mixins: [ toggle( 'allTimeList' ), observe( 'allTimeList' ) ],

	propTypes: {
		allTimeList: PropTypes.object.isRequired
	},

	render() {
		const infoIcon = this.state.showInfo ? 'info' : 'info-outline';
		const allTimeList = this.props.allTimeList.response;
		const { showInfo, showModule } = this.state;
		const isLoading = this.props.allTimeList.isLoading();

		let bestDay;

		if ( allTimeList['best-views'] && allTimeList['best-views'].day ) {
			bestDay = this.moment( allTimeList['best-views'].day ).format( 'LL' );
		}

		var govReady = {
			lastBackup: {value: 2, units: 'hours ago'},
			lastUpdate: {value: 3, units: 'days ago'},
			monitoring: {value: 3, units: 'months'},
			users: {value: 4, units: 'editors'}
		}

		const classes = {
			'is-expanded': showModule,
			'is-showing-info': showInfo,
			'is-loading': this.props.allTimeList.isLoading(),
			'is-non-en': user.data.localeSlug && ( user.data.localeSlug !== 'en' )
		};

		const bestViews = allTimeList['best-views'] ? allTimeList['best-views'].count : null;
console.log(govReady);
		return (
			<Card className={ classNames( 'stats-module', 'stats-all-time', classes ) }>
				<div className="module-header">
				<h1 className="module-header-title">{ this.translate( 'Security Audit powered by GovReady' ) }</h1>
					<ul className="module-header-actions">
						<li className="module-header-action toggle-info">
							<a
								href="#"
								className="module-header-action-link"
								aria-label={
									this.translate(
										'Show or hide panel information',
										{ context: 'Stats panel action' }
									)
								}
								title={
									this.translate(
										'Show or hide panel information',
										{ context: 'Stats panel action' }
									)
								}
								onClick={
									this.toggleInfo
								}
							>
								<Gridicon icon={ infoIcon } />
							</a>
						</li>
					</ul>
				</div>
				<div className="module-content">
					<div className="module-content-text module-content-text-info">
						<p>{ this.translate( 'GovReady, a project sponsored by DHS, provides monitoring, helps produce audits, and ensures that your site is secure.' ) }</p>
					</div>

					<StatsTabs>
						<StatsTab
							gridicon="time"
							label={ this.translate( 'Last Backup' ) }
							loading={ isLoading }
							value={ govReady.lastBackup.value }>
							<span className="stats-all-time__best-day">{ govReady.lastBackup.units }</span>
							<div className="stats-all-time__best-day"><a href="#">See backups &raquo;</a></div>
						</StatsTab>
						<StatsTab
							gridicon="scheduled"
							label={ this.translate( 'Last Update' ) }
							loading={ isLoading }
							value={ govReady.lastUpdate.value }>
							<span className="stats-all-time__best-day">{ govReady.lastUpdate.units }</span>
							<div className="stats-all-time__best-day"><a href="#">Release notes &raquo;</a></div>
						</StatsTab>
						<StatsTab
							gridicon="globe"
							label={ this.translate( 'Next Domain Renewal' ) }
							loading={ isLoading }
							value={ govReady.monitoring.value }>
							<span className="stats-all-time__best-day">{ govReady.monitoring.units }</span>
							<div className="stats-all-time__best-day"><a href="#">Domains & SSL monitoring &raquo;</a></div>
						</StatsTab>
						<StatsTab
							gridicon="user"
							label={ this.translate( 'Priviledged Users' ) }
							loading={ isLoading }
							value={ govReady.users.value }>
							<span className="stats-all-time__best-day">{ govReady.users.units }</span>
							<div className="stats-all-time__best-day"><a href="#">See all users &raquo;</a></div>
						</StatsTab>
					</StatsTabs>
				</div>
			</Card>
		);
	}
} );
