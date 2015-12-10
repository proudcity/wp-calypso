// External dependencies
import React from 'react';
import times from 'lodash/utility/times';
import debugModule from 'debug';

// Internal dependencies
import Main from 'components/main';
import Navigation from 'reader/list-management/navigation';
import InfiniteList from 'components/infinite-list';
import ListItem from 'reader/list-item';
import Icon from 'reader/list-item/icon';
import Title from 'reader/list-item/title';
import Description from 'reader/list-item/description';
import Actions from 'reader/list-item/actions';
import Gridicon from 'components/gridicon';
import FollowButton from 'components/follow-button';
import ReaderListsStore from 'lib/reader-lists/subscriptions';
import ReaderListsTagsStore from 'lib/reader-lists-tags/store';
import { fetchMoreTags } from 'lib/reader-lists-tags/actions';

const debug = debugModule( 'calypso:reader:list-management' );

const ListManagementTags = React.createClass( {
	propTypes: {
		list: React.PropTypes.shape( {
			owner: React.PropTypes.string.isRequired,
			slug: React.PropTypes.string.isRequired
		} )
	},

	getInitialState() {
		// Grab the list ID from the list store
		//const list = ReaderListsStore.findByOwnerAndSlug( this.props.owner, this.props.slug );
		const list = {
			ID: 117361 // bluefuton/abcde
		}
		let tags = null;
		if ( list && list.ID ) {
			tags = this.getTags( list.ID );
		}
		let fetching = false;
		if ( ! tags || tags.length === 0 ) {
			fetchMoreTags( this.props.list.owner, this.props.list.slug );
			fetching = true;
		}
		return {
			list,
			tags,
			fetching,
			page: 1
		};
	},

	getTags( listId ) {
		const tags = ReaderListsTagsStore.get( listId );
		return tags;
	},

	update() {
		this.setState( { tags: this.getTags() } );
	},

	componentDidMount() {
		ReaderListsStore.on( 'change', this.update );
		ReaderListsTagsStore.on( 'change', this.update );
		ReaderListsTagsStore.on( 'change', this.stopFetching );
	},

	componentWillUnmount() {
		ReaderListsStore.off( 'change', this.update );
		ReaderListsTagsStore.off( 'change', this.update );
		ReaderListsTagsStore.off( 'change', this.stopFetching );
	},

	loadMore( options ) {
		//fetchMore(); // in store actions
		this.setState( { fetching: true } );
		// if ( options.triggeredByScroll ) {
		// 	this.props.trackScrollPage( RecommendedSites.getPage() );
		// }
	},

	stopFetching() {
		this.setState( {
			fetching: false,
			page: this.state.page + 1
		} );
	},

	renderPlaceholders() {
		const placeholders = [],
			number = this.state.tags.length ? 2 : 10;

		times( number, ( i ) => {
			placeholders.push(
				<ListItem className="is-placeholder" key={'list-placeholder-' + i}>
					<Icon><Gridicon icon="tag" size={ 48 } /></Icon>
					<Title>Loading</Title>
					<Description></Description>
				</ListItem>
			);
		} );

		return placeholders;
	},

	getItemRef( item ) {
		return 'list-tag-' + item.ID;
	},

	trackTagClick() {
		// stats.recordAction( 'click_site_on_list_following' );
		// stats.recordGaEvent( 'Clicked Site on List Following' );
	},

	renderItem( tag ) {
		const itemKey = this.getItemRef( tag );

		return (
			<ListItem key={ itemKey } ref={ itemKey }>
				<Icon><Gridicon icon="tag" size={ 48 } /></Icon>
				<Title>
					<a href={ '/tag/' + tag.slug } onclick={ this.trackTagClick }>{ tag.slug }</a>
				</Title>
				<Description></Description>
				<Actions>
				</Actions>
			</ListItem>
		);
	},

	render() {
		let mainContent = null;
		if ( ! this.state.tags && ! this.state.fetching ) {
			mainContent = ( <p>No tags yet!</p> );
		} else {
			mainContent = (
				<InfiniteList
					items={ this.state.tags }
					fetchingNextPage={ this.state.fetching }
					lastPage={ false }
					guessedItemHeight={ 300 }
					fetchNextPage={ this.loadMore }
					getItemRef={ this.getItemRef }
					renderItem={ this.renderItem }
					renderLoadingPlaceholders={ this.renderPlaceholders }
				/>
			);
		}

		return (
			<Main className="list-management-tags">
				<Navigation selected="tags" list={ this.props.list } />
				{ mainContent }
			</Main>
			);
	}
} );

export default ListManagementTags;
