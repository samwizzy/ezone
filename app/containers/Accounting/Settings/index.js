import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, useRouteMatch } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as Actions from './actions';
import reducer from './reducer';
import saga from './saga';
import CircularProgress from '@material-ui/core/CircularProgress';
import SettingsLayout from './components/SettingsLayout';
import AccountSetup from './components/AccountSetup';
import AccountingPeriod from './components/AccountingPeriod';
import DepreciationAreas from './components/depreciationAreas';
import AssetType from './components/assettype';
import TaxRate from './components/taxrate';
import TaxType from './components/taxtype';
import Currencies from './components/currencies';

export function Settings(props) {
  useInjectReducer({ key: 'settings', reducer });
  useInjectSaga({ key: 'settings', saga });
  const { path } = useRouteMatch()

  const { loading, getAccountingSetupAction, getAllAccountingPeriodAction, getChartOfAccounts, getBusinessTypes, getCurrencies } = props;

  useEffect(() => {
    getChartOfAccounts()
    getBusinessTypes()
    getCurrencies()
  }, []);

  if (loading) {
    return <CircularProgress />
  }

  return (
    <div>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Description of Settings" />
      </Helmet>

      <Route exact path={path} component={AccountSetup} />
      <Route path={`${path}/period`} component={AccountingPeriod} />
      <Route path={`${path}/depreciation-type`} component={SettingsLayout} />
      <Route path={`${path}/depreciation-area`} component={DepreciationAreas} />
      <Route path={`${path}/asset-type`} component={AssetType} />
      <Route path={`${path}/taxrate`} component={TaxRate} />
      <Route path={`${path}/taxtype`} component={TaxType} />
      <Route path={`${path}/currencies`} component={Currencies} />

    </div>
  );
}

Settings.propTypes = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    getAccountingSetupAction: () => dispatch(Actions.getAccountingSetupAction()),
    getAllAccountingPeriodAction: () => dispatch(Actions.getAllAccountingPeriodAction()),
    getChartOfAccounts: () => dispatch(Actions.getChartOfAccounts()),
    getBusinessTypes: () => dispatch(Actions.getBusinessTypes()),
    getCurrencies: () => dispatch(Actions.getCurrencies()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(Settings);
