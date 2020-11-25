import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the salary advance state domain
 */

const selectSalaryAdvanceDomain = state => state.salaryAdvance || initialState;

const makeSelectSalaryAdvance = () =>
  createSelector(
    selectSalaryAdvanceDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectSalaryAdvanceDomain,
    subState => subState.loading,
  );

const makeSelectSalaryAdvanceDialog = () =>
  createSelector(
    selectSalaryAdvanceDomain,
    substate => substate.salaryAdvanceDialog,
  );

const makeSelectSalaryAdvanceConfirmDialog = () =>
  createSelector(
    selectSalaryAdvanceDomain,
    substate => substate.salaryAdvanceConfirmDialog,
  );

const makeSelectSalaryAdvanceData = () =>
  createSelector(
    selectSalaryAdvanceDomain,
    substate => substate.salaryAdvances,
  );

const makeSelectSalaryAdvanceByIdData = () =>
  createSelector(
    selectSalaryAdvanceDomain,
    substate => substate.salaryAdvance,
  );

export default makeSelectSalaryAdvance;

export {
  selectSalaryAdvanceDomain,
  makeSelectLoading,
  makeSelectSalaryAdvanceDialog,
  makeSelectSalaryAdvanceConfirmDialog,
  makeSelectSalaryAdvanceData,
  makeSelectSalaryAdvanceByIdData,
};
