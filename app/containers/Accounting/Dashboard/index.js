import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModuleLayout from './ModuleLayout';
import { Helmet } from 'react-helmet';
import { Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as Actions from './actions';
import saga from './saga';
import reducer from './reducer';
import makeSelectDashboard, * as Selectors from './selectors';
import * as AccSelectors from './../selectors';
import AccountDashboard from './components/AccountDashboard';

const key = 'dashboard';
const DashBoard = props => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const {
    history,
    accountSetupData,
    chartofAccounts,
    getAccountsRange,
  } = props;

  useEffect(() => {
    getAccountsRange({ startDate: '2020/09/03', endDate: '2020/09/10' });
  }, []);

  if (!accountSetupData) {
    history.push('/account/settings');
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>

      <ModuleLayout>
        <AccountDashboard
          accounts={chartofAccounts}
          accData={accountSetupData}
        />
      </ModuleLayout>
    </div>
  );
};

DashBoard.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
  loading: Selectors.makeSelectLoading(),
  chartofAccounts: AccSelectors.makeSelectChartOfAccounts(),
  accountSetupData: AccSelectors.makeSelectGetAccountingSetupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAccountsRange: data => dispatch(Actions.getAccountsRange(data)),
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
)(DashBoard);
