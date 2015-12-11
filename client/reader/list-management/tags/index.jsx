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
import ReaderListsStore from 'lib/reader-lists/subscriptions';
import ReaderListsTagsStore from 'lib/reader-lists-tags/store';
import { fetchMoreTags } from 'lib/reader-lists-tags/actions';

const debug = debugModule( 'calypso:reader:list-management' ); // eslint-disable-line

const ListManagementTags = React.createClass( {
	propTypes: {
		list: React.PropTypes.shape( {
			owner: React.PropTypes.string.isRequired,
			slug: React.PropTypes.string.isRequired
		} )
	},

	getInitialState() {
		return this.getStateFromStores();
	},

	getStateFromStores() {
		// Grab the list ID from the list store
		//const list = ReaderListsStore.findByOwnerAndSlug( this.props.owner, this.props.slug );
		const list = {
			ID: 117361 // bluefuton/abcde
		}
		let tags = null;
		if ( list && list.ID ) {
			tags = this.getTags( list.ID );
		}
		return {
			list,
			tags,
			currentPage: ReaderListsTagsStore.getCurrentPage(),
			isLastPage: ReaderListsTagsStore.isLastPage(),
			isFetching: ReaderListsTagsStore.isFetching(),
			lastError: ReaderListsTagsStore.getLastError(),
		};
	},

	getTags( listId ) {
		return ReaderListsTagsStore.getTagsForList( listId );
	},

	update() {
		this.setState( this.getStateFromStores() ); // @todo smartgetstate
	},

	componentDidMount() {
		ReaderListsStore.on( 'change', this.update );
		ReaderListsTagsStore.on( 'change', this.update );
	},

	componentWillUnmount() {
		ReaderListsStore.off( 'change', this.update );
		ReaderListsTagsStore.off( 'change', this.update );
	},

	loadMore( options ) {
		fetchMoreTags( this.props.list.owner, this.props.list.slug, this.state.currentPage + 1 );
		if ( options.triggeredByScroll ) {
			this.props.trackScrollPage( this.state.currentPage );
		}
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
		if ( ! this.state.tags && ! this.state.isFetching ) {
			mainContent = ( <p>No tags yet!</p> );
		} else {
			mainContent = (
				<InfiniteList
					items={ this.state.tags }
					fetchingNextPage={ this.state.isFetching }
					lastPage={ this.state.isLastPage }
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
