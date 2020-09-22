import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectItemPage, * as Selectors from './../../../selectors';
import reducer from './../../../reducer';
import saga from './../../../saga';
import * as Actions from './../../../actions';
import ItemsGroupDetails from './ItemsGroupDetails';

export function ItemsGroupDetailsPage(props) {
	const { match, getItemsGroupById } = props;
	const { params } = match;
	console.log(match, 'match ItemsGroupDetailsPage');

	useEffect(() => {
		getItemsGroupById(params.groupId);
	}, []);

	return (
		<div>
			<Helmet>
				<title>Items Group Details</title>
				<meta name="description" content="Description of Items Group Details" />
			</Helmet>

			<Fragment>
				<ItemsGroupDetails />
			</Fragment>
		</div>
	);
}

ItemsGroupDetailsPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
	itemsGroup: Selectors.makeSelectGetAllItemsGroupById(),
});

function mapDispatchToProps(dispatch) {
	return {
		getItemsGroupById: data => dispatch(Actions.getItemsGroupById(data)),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withRouter,
	withConnect,
	memo,
)(ItemsGroupDetailsPage);
