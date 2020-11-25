import React, { memo, useEffect } from 'react';
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
import makeSelectDashboard, * as Selectors from './selectors';
import * as PayrollSelectors from './../selectors';
import ReportDashboard from './components/ReportDashboard'

const key = "reports";
const Reports = (props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { loading } = props

  useEffect(() => {
  }, [])

  return (
    <div>
      <Helmet>
        <title>Reports</title>
        <meta name="description" content="Description of Reports" />
      </Helmet>

      <ModuleLayout>
        <ReportDashboard />
      </ModuleLayout>
    </div>
  );
};

Reports.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  reports: makeSelectDashboard(),
  loading: Selectors.makeSelectLoading(),
  chartofAccounts: PayrollSelectors.makeSelectChartOfAccounts(),
  payrollSetupData: PayrollSelectors.makeSelectGetPayrollSetupData(),
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
)(Reports);
