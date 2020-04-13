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

import { Redirect } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAccounting from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import AccountChart from './components/AccountChart';
// import AccountJournal from './components/AccountJournal';
// import JournalListing from './components/JournalListing';
// import NewAccountDialog from './components/NewAccountDialog';
import AccountSetting from './components/AccountSetting';
import * as Actions from './actions';
import * as Selectors from './selectors';
import LoadingIndicator from './../../components/LoadingIndicator';
import Dashboard from './Dashboard'
import Router from '../Accounting/components/Router';

export function Accounting(props) {
  useInjectReducer({ key: 'accounting', reducer });
  useInjectSaga({ key: 'accounting', saga });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatchGetAccountPeriodAction();
    getAccountingSetupAction();
    dispatchGetAllChartOfAccountTypeAction();
    dispatchGetAllAccountTypeAction();
    createNewAccountJournalAction();
  }, []);

  const {
    loading,
    accountingSetupData,
    getAccountingSetupAction,
    dispatchGetAllChartOfAccountTypeAction,
    dispatchGetAllAccountTypeAction,
    dispatchGetAccountPeriodAction,
    createNewAccountJournalAction
  } = props;

  console.log('loading', loading);
  console.log('accountingSetupData index.js file', accountingSetupData);


  if (loading) {
    return <LoadingIndicator />;
  }
  if (accountingSetupData.id) {
    return props.history.push({ pathname: '/dashboard' });
  }
  return props.history.push({ pathname: '/account/setting' });
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
    getAccountingSetupAction: () => dispatch(Actions.getAccountingSetupAction()),
    dispatchGetAllChartOfAccountTypeAction: () => dispatch(Actions.getAllChartOfAccountTypeAction()),
    dispatchGetAllAccountTypeAction: () => dispatch(Actions.getAllAccountTypeAction()),
    dispatchGetAccountPeriodAction: () => dispatch(Actions.getAccountPeriodAction()),
    createNewAccountJournalAction: evt => dispatch(Actions.createNewAccountJournalAction(evt)),
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
