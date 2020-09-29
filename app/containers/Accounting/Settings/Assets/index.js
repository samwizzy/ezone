import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, useRouteMatch } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as Selectors from '../selectors';
import { CircleLoader } from '../../../../components/LoadingIndicator';
import AssetsList from './AssetsList'
import NewAsset from './NewAsset'
import AssetDialog from './components/AssetDialog'

export function AssetsSettings(props) {
	const { path } = useRouteMatch()

	return (
		<div>
			<Helmet>
				<title>Assets Settings</title>
				<meta name="description" content="Description of Assets Settings" />
			</Helmet>

			<Route exact path={path} component={AssetsList} />
			<Route path={`${path}/new`} component={NewAsset} />
			<Route path={`${path}/edit/:assetId`} component={NewAsset} />

			<AssetDialog />
		</div>
	);
}

AssetsSettings.propTypes = {};

const mapStateToProps = createStructuredSelector({
	loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
	return {}
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
)

export default compose(
	withConnect,
	memo,
)(AssetsSettings);
