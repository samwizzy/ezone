import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the employeePage state domain
 */

const selectEmployeePageDomain = state => state.employeePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EmployeePage
 */

const makeSelectEmployeePage = () =>
  createSelector(
    selectEmployeePageDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectEmployeePageDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectEmployeePageDomain,
    subState => subState.error,
  );

const makeSelectEmployeeDialog = () =>
  createSelector(
    selectEmployeePageDomain,
    subState => subState.employeeDialog,
  );

const makeSelectCreateNewEmployeeData = () =>
  createSelector(
    selectEmployeePageDomain,
    subState => subState.createNewEmployeeData,
  );

export default makeSelectEmployeePage;
export {
  selectEmployeePageDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectEmployeeDialog,
  makeSelectCreateNewEmployeeData,
};
