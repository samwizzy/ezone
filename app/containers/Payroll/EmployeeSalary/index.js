import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Route, withRouter } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import saga from './saga';
import reducer from './reducer';
import * as Actions from './actions';
import makeSelectEmployeeSalary, * as Selectors from './selectors';
import ModuleLayout from '../components/ModuleLayout';
import EmployeeSalariesList from './components/EmployeeSalaryList';
import EmployeeSalaryDetails from './employeeSalaryDetails';
import AddEmployeeSalary from './components/AddEmployeeSalary';
import EmployeeSalaryDialog from './components/EmployeeSalaryDialog';
import ConfirmDeleteEmployeeSalaryDialog from './components/ConfirmDeleteEmployeeSalaryDialog';

const key = 'employeeSalary';
const EmployeeSalaryPage = props => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { loading, getEmployeeSalaries, match } = props;
  const { path } = match

  useEffect(() => {
    // getEmployeeSalaries();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Employee Salary</title>
        <meta name="description" content="Description of Employee Salary" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={EmployeeSalariesList} />
        <Route path={`${path}/view/:salaryId`} component={EmployeeSalaryDetails} />
        <Route path={`${path}/new`} component={AddEmployeeSalary} />
      </ModuleLayout>

      <EmployeeSalaryDialog />
      <ConfirmDeleteEmployeeSalaryDialog />
    </div>
  );
};

EmployeeSalaryPage.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  employeeSalary: makeSelectEmployeeSalary(),
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEmployeeSalaries: () => dispatch(Actions.getEmployeeSalaries()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(EmployeeSalaryPage);
