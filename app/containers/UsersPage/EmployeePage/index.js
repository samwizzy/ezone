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
import EmployeeList from './components/EmployeeList';
import AddButton from './components/AddButton';

export function EmployeePage(props) {
  useInjectReducer({ key: 'usersPage', reducer });
  useInjectSaga({ key: 'usersPage', saga });

  const { getAllEmployees, getBranches, getDepartments, getPositions, getEmployeeTypes, getSourceOfHire, getPayRates, getPayTypes } = props;

  useEffect(() => {
    getAllEmployees();
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
    </div>
  );
}

EmployeePage.propTypes = {
  getAllEmployees: PropTypes.func,
  openNewEmployeeDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  employeePage: makeSelectEmployeePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllEmployees: () => dispatch(Actions.getAllEmployees()),
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
