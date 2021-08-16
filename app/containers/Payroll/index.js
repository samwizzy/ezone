import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { withRouter, Route, useRouteMatch } from 'react-router-dom';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import makeSelectPayroll, * as Selectors from './selectors';
import { CircleLoader } from '../../components/LoadingIndicator';
import EmployeeSalary from './EmployeeSalary/Loadable';
import Dashboard from './Dashboard';
import PayrollItems from './PayrollItems';
import SalaryAdvance from './SalaryAdvance';
import PayRuns from './PayRuns';
import Reports from './Reports';
import Settings from './Settings';

const key = 'payroll';

export function PayrollApp(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { loading, payrollSetUpData } = props;

  useEffect(() => {}, [payrollSetUpData]);

  const { path } = useRouteMatch();

  if (loading) {
    // return <CircleLoader />;
  }

  if (payrollSetUpData && !loading) {
    return <Settings />;
  }

  return (
    <div>
      <Helmet>
        <title>Payroll</title>
        <meta name="description" content="Description of Payroll" />
      </Helmet>

      <Fragment>
        <Route exact path={path} component={Dashboard} />
        <Route path={`${path}/dashboard`} component={Dashboard} />
        <Route path={`${path}/employee-salary`} component={EmployeeSalary} />
        <Route path={`${path}/pay-runs`} component={PayRuns} />
        <Route path={`${path}/payroll-items`} component={PayrollItems} />
        <Route path={`${path}/salary-advance`} component={SalaryAdvance} />
        <Route path={`${path}/reports/:reportId?`} component={Reports} />
        <Route path={`${path}/settings`} component={Settings} />
      </Fragment>
    </div>
  );
}

PayrollApp.propTypes = {};

const mapStateToProps = createStructuredSelector({
  payroll: makeSelectPayroll(),
  loading: Selectors.makeSelectLoading(),
  payrollSetUpData: Selectors.makeSelectGetPayrollSetupData(),
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(PayrollApp);
