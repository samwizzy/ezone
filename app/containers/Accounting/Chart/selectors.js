import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the chart state domain
 */

const selectChartDomain = state => state.chart || initialState;

const makeSelectAccountChart = () =>
  createSelector(
    selectChartDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectChartDomain,
    subState => subState.loading,
  );

const makeSelectNewAccountDialog = () =>
  createSelector(
    selectChartDomain,
    substate => substate.accountDialog,
  );

const makeSelectConfirmAccountDeleteDialog = () =>
  createSelector(
    selectChartDomain,
    substate => substate.confirmDeleteDialog,
  );

const makeSelectAccountTypeData = () =>
  createSelector(
    selectChartDomain,
    substate => substate.accountTypes,
  );

const makeSelectGetChartOfAccounts = () =>
  createSelector(
    selectChartDomain,
    substate => substate.chartOfAccounts,
  );

const makeSelectGetChartOfAccountById = () =>
  createSelector(
    selectChartDomain,
    substate => substate.chartOfAccount,
  );


export default makeSelectAccountChart;

export {
  selectChartDomain,
  makeSelectLoading,
  makeSelectNewAccountDialog,
  makeSelectConfirmAccountDeleteDialog,
  makeSelectAccountTypeData,
  makeSelectGetChartOfAccounts,
  makeSelectGetChartOfAccountById,
};
