import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectPayrollDomain = state => state.payroll || initialState;

const makeSelectPayroll = () =>
  createSelector(
    selectPayrollDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.loading,
  );

const makeSelectGetPayrollSetupData = () =>
  createSelector(
    selectPayrollDomain,
    substate => substate.payrollSetupData,
  );

const makeSelectChartOfAccounts = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.chartOfAccounts,
  );

const makeSelectEmployees = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.employees,
  );

const makeSelectDepartments = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.departments,
  );

const makeSelectBranches = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.branches,
  );

const makeSelectRoles = () =>
  createSelector(
    selectPayrollDomain,
    subState => subState.roles,
  );


export default makeSelectPayroll;

export {
  selectPayrollDomain,
  makeSelectLoading,
  makeSelectGetPayrollSetupData,
  makeSelectChartOfAccounts,
  makeSelectEmployees,
  makeSelectDepartments,
  makeSelectBranches,
  makeSelectRoles,
};
