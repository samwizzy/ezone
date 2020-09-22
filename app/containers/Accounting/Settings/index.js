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

export function Settings(props) {
  useInjectReducer({ key: 'settings', reducer });
  useInjectSaga({ key: 'settings', saga });
  const { path } = useRouteMatch()

  const { loading, getAccountingSetupAction, getAllAccountingPeriodAction, getBusinessTypes, getCurrencies } = props;

  useEffect(() => {
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

      <Route path={path} component={AccountSetup} />
      {/* <Route path={`${path}/setup`} component={SettingsLayout} /> */}

    </div>
  );
}

Settings.propTypes = {};

const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {
  return {
    getAccountingSetupAction: () => dispatch(Actions.getAccountingSetupAction()),
    getAllAccountingPeriodAction: () => dispatch(Actions.getAllAccountingPeriodAction()),
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
