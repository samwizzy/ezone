import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as Actions from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectFixedAssets, * as Selectors from './selectors';
import AssetsList from './AssetsList'
import AssetDetails from './assetDetails'
import NewAsset from './NewAsset'
import AssetDialog from './components/AssetDialog'

const key = 'fixedAssets';
export function FixedAssetsPage(props) {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });
	const { getAssets, getAssetTypes } = props
	const { path } = useRouteMatch()

	useEffect(() => {
		getAssets()
		getAssetTypes()
	}, [])

	return (
		<div>
			<Helmet>
				<title>Fixed Assets</title>
				<meta name="description" content="Description of Fixed Assets" />
			</Helmet>

			<Route exact path={path} component={AssetsList} />
			<Route path={`${path}/new`} component={NewAsset} />
			<Route path={`${path}/edit/:assetId`} component={NewAsset} />
			<Route path={`${path}/view/:assetId`} component={AssetDetails} />

			<AssetDialog />
		</div>
	);
}

FixedAssetsPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
	fixedAssets: makeSelectFixedAssets(),
	loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
	return {
		getAssets: () => dispatch(Actions.getAssets()),
		getAssetTypes: () => dispatch(Actions.getAssetTypes()),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
)(FixedAssetsPage);
