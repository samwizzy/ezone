/**
 *
 * EmployeePage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectEmployeePage from '../selectors';
import * as Actions from '../actions';
import reducer from '../reducer';
import saga from '../saga';
import ModuleLayout from './../components/ModuleLayout';
import EmployeeDialog from './components/EmployeeDialog';
import ConfirmDeleteEmployeeDialog from './components/ConfirmDeleteEmployeeDialog';
import EmployeeList from './components/EmployeeList';

export function EmployeePage(props) {
  useInjectReducer({ key: 'usersPage', reducer });
  useInjectSaga({ key: 'usersPage', saga });

  const {
    getAllEmployees,
    getPagedEmployees,
    getBranches,
    getDepartments,
    getPositions,
    getEmployeeTypes,
    getSourceOfHire,
    getPayRates,
    getPayTypes,
  } = props;

  useEffect(() => {
    getAllEmployees();
    getPagedEmployees();
    getBranches();
    getDepartments();
    getPositions();
    getEmployeeTypes();
    getSourceOfHire();
    getPayRates();
    getPayTypes();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Users</title>
        <meta name="description" content="Description of Users" />
      </Helmet>

      <ModuleLayout>
        <EmployeeList />
      </ModuleLayout>

      <EmployeeDialog />
      <ConfirmDeleteEmployeeDialog />
    </div>
  );
}

EmployeePage.propTypes = {
  getAllEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  employeePage: makeSelectEmployeePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllEmployees: () => dispatch(Actions.getAllEmployees()),
    getPagedEmployees: data => dispatch(Actions.getPagedEmployees(data)),
    getBranches: () => dispatch(Actions.getBranches()),
    getDepartments: () => dispatch(Actions.getDepartments()),
    getPositions: () => dispatch(Actions.getPositions()),
    getEmployeeTypes: () => dispatch(Actions.getEmployeeTypes()),
    getSourceOfHire: () => dispatch(Actions.getSourceOfHire()),
    getPayRates: () => dispatch(Actions.getPayRates()),
    getPayTypes: () => dispatch(Actions.getPayTypes()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EmployeePage);
