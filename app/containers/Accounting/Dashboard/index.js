import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ModuleLayout from './ModuleLayout'
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
import * as Selectors from './selectors';
import * as AccSelectors from './../selectors';
import AccountDashboard from './components/AccountDashboard'

const key = "dashboard";
const DashBoard = (props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { accountSetupData, chartofAccounts } = props

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>

      <ModuleLayout>
        <AccountDashboard accounts={chartofAccounts} accData={accountSetupData} />
      </ModuleLayout>
    </div>
  );
};

DashBoard.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  chartofAccounts: AccSelectors.makeSelectChartOfAccounts(),
  accountSetupData: AccSelectors.makeSelectGetAccountingSetupData(),
});

function mapDispatchToProps(dispatch) {
  return {};
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
