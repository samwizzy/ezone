import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, useRouteMatch, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as Actions from './actions';
import reducer from './reducer';
import makeSelectSettings, * as Selectors from './selectors';
import saga from './saga';
import AccountSetup from './AccountSetup';
import AccountingPeriod from './AccountingPeriod';
import DepreciationAreas from './DepreciationArea';
import DepreciationType from './DepreciationType';
import AssetTypes from './AssetTypes';
import Taxes from './Taxes';
import Currencies from './Currencies';
import ModuleLayout from '../components/ModuleLayout';

const key = 'settings';

export function Settings(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { path } = useRouteMatch();

  const {
    loading,
    getAccountingSetup,
    getAllAccountingPeriod,
    getChartOfAccounts,
    getBusinessTypes,
    getDepreciationArea,
    getDepreciationTypes,
    getCurrencies,
    getTaxes,
    getAssets,
    getAssetTypes,
  } = props;

  useEffect(() => {
    getAccountingSetup();
    getAllAccountingPeriod();
    getChartOfAccounts();
    getBusinessTypes();
    getDepreciationArea();
    getDepreciationTypes();
    getCurrencies();
    getTaxes();
    getAssets();
    getAssetTypes();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Description of Settings" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={AccountSetup} />
        <Route path={`${path}/period`} component={AccountingPeriod} />
        <Route
          path={`${path}/depreciation-type`}
          component={DepreciationType}
        />
        <Route
          path={`${path}/depreciation-area`}
          component={DepreciationAreas}
        />
        <Route path={`${path}/assettypes`} component={AssetTypes} />
        <Route path={`${path}/taxes`} component={Taxes} />
        <Route path={`${path}/currencies`} component={Currencies} />
      </ModuleLayout>
    </div>
  );
}

Settings.propTypes = {};

const mapStateToProps = createStructuredSelector({
  settings: makeSelectSettings(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAccountingSetup: () => dispatch(Actions.getAccountingSetup()),
    getAllAccountingPeriod: () => dispatch(Actions.getAllAccountingPeriod()),
    getChartOfAccounts: () => dispatch(Actions.getChartOfAccounts()),
    getBusinessTypes: () => dispatch(Actions.getBusinessTypes()),
    getDepreciationArea: () => dispatch(Actions.getDepreciationArea()),
    getDepreciationTypes: () => dispatch(Actions.getDepreciationTypes()),
    getAssets: () => dispatch(Actions.getAssets()),
    getAssetTypes: () => dispatch(Actions.getAssetTypes()),
    getCurrencies: () => dispatch(Actions.getCurrencies()),
    getTaxes: () => dispatch(Actions.getTaxes()),
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
)(Settings);
