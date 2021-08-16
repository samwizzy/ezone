import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPayrollItems from './selectors';
import reducer from './reducer';
import saga from './saga';
import ModuleLayout from './ModuleLayout';
import Allowance from './Allowance';
import Benefits from './Benefits';
import Earnings from './Earnings';
import Deductions from './Deductions';
import * as Actions from './actions';
import * as Selectors from './selectors';

export function PayrollItemsApp(props) {
  useInjectReducer({ key: 'payrollItems', reducer });
  useInjectSaga({ key: 'payrollItems', saga });

  const { loading, match, getAllowances } = props;
  const { path } = match;

  useEffect(() => {
    // getAllowances();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Payroll — Payroll Items</title>
        <meta name="description" content="Description of Payroll Items" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={Allowance} />
        <Route path={`${path}/allowance`} component={Allowance} />
        <Route path={`${path}/benefits`} component={Benefits} />
        <Route path={`${path}/earnings`} component={Earnings} />
        <Route path={`${path}/deductions`} component={Deductions} />
      </ModuleLayout>
    </div>
  );
}

PayrollItemsApp.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  payrollItems: makeSelectPayrollItems(),
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllowances: () => dispatch(Actions.getAllowances()),
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
)(PayrollItemsApp);
