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
import ModuleLayout from '../components/ModuleLayout';
import AssetsList from './AssetsList';
import AssetDetails from './assetDetails';
import NewAsset from './NewAsset';
import AssetDialog from './components/AssetDialog';
import AssetDisposalDialog from './components/AssetDisposalDialog';

const key = 'fixedAssets';
export function FixedAssetsPage(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { getAssets, getAssetTypes, getChartOfAccounts, getBranches } = props;
  const { path } = useRouteMatch();

  useEffect(() => {
    getAssets();
    getAssetTypes();
    getChartOfAccounts();
    getBranches();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Fixed Assets</title>
        <meta name="description" content="Description of Fixed Assets" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={AssetsList} />
        <Route path={`${path}/new`} component={NewAsset} />
        <Route path={`${path}/edit/:assetId`} component={NewAsset} />
        <Route path={`${path}/view/:assetId`} component={AssetDetails} />
      </ModuleLayout>

      <AssetDisposalDialog />
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
    getChartOfAccounts: () => dispatch(Actions.getChartOfAccounts()),
    getBranches: () => dispatch(Actions.getBranches()),
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
