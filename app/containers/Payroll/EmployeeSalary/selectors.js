import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the chart state domain
 */

const selectEmployeeSalaryDomain = state => state.employeeSalary || initialState;

const makeSelectEmployeeSalary = () =>
  createSelector(
    selectEmployeeSalaryDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectEmployeeSalaryDomain,
    subState => subState.loading,
  );

const makeSelectNewEmployeeSalaryDialog = () =>
  createSelector(
    selectEmployeeSalaryDomain,
    substate => substate.employeeSalaryDialog,
  );

const makeSelectConfirmEmployeeSalaryDeleteDialog = () =>
  createSelector(
    selectEmployeeSalaryDomain,
    substate => substate.confirmDeleteDialog,
  );

const makeSelectGetEmployeeSalariesData = () =>
  createSelector(
    selectEmployeeSalaryDomain,
    substate => substate.employeeSalaries,
  );

const makeSelectGetEmployeeSalaryByIdData = () =>
  createSelector(
    selectEmployeeSalaryDomain,
    substate => substate.employeeSalary,
  );

export default makeSelectEmployeeSalary;

export {
  selectEmployeeSalaryDomain,
  makeSelectLoading,
  makeSelectNewEmployeeSalaryDialog,
  makeSelectConfirmEmployeeSalaryDeleteDialog,
  makeSelectGetEmployeeSalariesData,
  makeSelectGetEmployeeSalaryByIdData,
};
