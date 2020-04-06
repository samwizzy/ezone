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
import NewAccountDialog from './components/NewAccountDialog';
import AccountJournal from './components/AccountJournal';
import AccountSetting from './components/AccountSetting';
import * as Actions from './actions';
import * as Selectors from './selectors';
import LoadingIndicator from './../../components/LoadingIndicator';

export function Accounting(props) {
  useInjectReducer({ key: 'accounting', reducer });
  useInjectSaga({ key: 'accounting', saga });

  const {
    loading,
    accountingSetupData,
    getAccountingSetupAction,
    dispatchGetAllChartOfAccountTypeAction,
    dispatchGetAllAccountTypeAction
  } = props;
  console.log('accountingSetupData index.js -> ', accountingSetupData);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    getAccountingSetupAction()
    dispatchGetAllChartOfAccountTypeAction();
    dispatchGetAllAccountTypeAction();
  }, []);


  if (loading) {
    return <LoadingIndicator />
  }
  else if (accountingSetupData) {
    // return <Redirect to="/accountChart" />;
    return (
      <div>
        <Helmet>
          <title>Accounting</title>
          <meta name="description" content="Description of Accounting" />
        </Helmet>
        <AccountChart />
        <AccountJournal />
        <NewAccountDialog />
      </div>
    );
  }
  return (
    <div>
      <Helmet>
        <title>Accounting</title>
        <meta name="description" content="Description of Accounting" />
      </Helmet>
      <AccountSetting />
    </div>
  );
}

Accounting.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
