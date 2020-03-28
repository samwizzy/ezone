/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHR = state => state.hrPage || initialState;

const makeSelectHRPage = () =>
  createSelector(
    selectHR,
    hrState => hrState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectHR,
    hrState => hrState.loading,
  );

const makeSelectEmployees = () =>
  createSelector(
    selectHR,
    hrState => hrState.employees,
  );

const makeSelectEmployee = () =>
  createSelector(
    selectHR,
    hrState => hrState.employee,
  );

const makeSelectEmpDialog = () =>
  createSelector(
    selectHR,
    hrState => hrState.empDialog,
  );
const makeSelectDeptDialog = () =>
  createSelector(
    selectHR,
    hrState => hrState.deptDialog,
  );
const makeSelectBranchDialog = () =>
  createSelector(
    selectHR,
    hrState => hrState.branchDialog,
  );
const makeSelectRoleDialog = () =>
  createSelector(
    selectHR,
    hrState => hrState.roleDialog,
  );
const makeSelectAttendanceDialog = () =>
  createSelector(
    selectHR,
    hrState => hrState.attdDialog,
  );
const makeSelectPayrollDialog = () =>
  createSelector(
    selectHR,
    hrState => hrState.payrollDialog,
  );

export default makeSelectHRPage;
export { 
  selectHR,
  makeSelectEmployees,
  makeSelectLoading,
  makeSelectEmployee,
  makeSelectEmpDialog,
  makeSelectDeptDialog,
  makeSelectBranchDialog,
  makeSelectRoleDialog,
  makeSelectAttendanceDialog,
  makeSelectPayrollDialog,
};
