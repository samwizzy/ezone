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
import ItemsGroupsList from './ItemsGroupsList';
import ItemsGroupDetails from './itemsGroupDetails';
import ItemGroupDialog from './ItemGroupDialog';

export function ItemsGroupsPage(props) {
	useInjectReducer({ key: 'itemPage', reducer });
	useInjectSaga({ key: 'itemPage', saga });

	const { match } = props;
	const { params, path } = match;
	console.log(match, 'match ItemsGroupsPage');

	useEffect(() => {
	}, []);

	return (
		<div>
			<Helmet>
				<title>Items Groups</title>
				<meta name="description" content="Description of Items Groups" />
			</Helmet>

			<Fragment>
				<Route exact path={path} component={ItemsGroupsList} />
				<Route path={`${path}/:groupId`} component={ItemsGroupDetails} />
			</Fragment>

			<ItemGroupDialog />
		</div>
	);
}

ItemsGroupsPage.propTypes = {};

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
)(ItemsGroupsPage);
