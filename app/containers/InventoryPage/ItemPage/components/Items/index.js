import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectItemPage from './../../selectors';
import reducer from './../../reducer';
import saga from './../../saga';
import * as Actions from './../../actions';
import ItemsList from './ItemsList';
import ItemDetails from './itemDetails/ItemDetails';
import ItemDialog from './ItemDialog';

export function ItemsPage(props) {
	useInjectReducer({ key: 'itemPage', reducer });
	useInjectSaga({ key: 'itemPage', saga });

	const { match } = props;
	const { path } = match;

	useEffect(() => {
	}, []);

	return (
		<div>
			<Helmet>
				<title>Items</title>
				<meta name="description" content="Description of Items" />
			</Helmet>

			<Fragment>
				<Route exact path={`${path}/:itemId/:sku`} component={ItemDetails} />
				<Route exact path={`${path}/:itemId/:sku/edit`} component={ItemDialog} />
			</Fragment>
		</div>
	);
}

ItemsPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
	itemPage: makeSelectItemPage(),
});

function mapDispatchToProps(dispatch) {
	return {};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withRouter,
	withConnect,
	memo,
)(ItemsPage);
