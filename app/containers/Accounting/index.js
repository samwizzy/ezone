/**
 *
 * Accounting
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import makeSelectAccounting, * as Selectors from './selectors';
import AccountSetup from './Settings/components/AccountSetup';
import Dashboard from './Dashboard';
import LoadingIndicator from './../../components/LoadingIndicator';
import ModuleLayout from './components/ModuleLayout';

export function Accounting(props) {
  useInjectReducer({ key: 'accounting', reducer });
  useInjectSaga({ key: 'accounting', saga });

  console.log('Accounting index.js loaded');

  const {
    loading,
    accountingSetupData,
    dispatchGetAccountingSetupAction,
  } = props;

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatchGetAccountingSetupAction();
  }, []);

  console.log('accountingSetupData main index.js', accountingSetupData);

  // Routing based on api response
  if (loading) {
    return <LoadingIndicator />;
  }
  else if (accountingSetupData === null) {
    return (
      <ModuleLayout>
        <AccountSetup />
      </ModuleLayout>
    ) 
  } 
  else {
    return <Dashboard />
  }
}

Accounting.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  accounting: makeSelectAccounting(),
  loading: Selectors.makeSelectLoading(),
  accountingSetupData: Selectors.makeSelectGetAccountingSetupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetAccountingSetupAction: () => dispatch(Actions.getAccountingSetupAction()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Accounting);
