import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the chart state domain
 */

const selectChartDomain = state => state.chart || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Chart
 */

const makeSelectAccounting = () =>
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
    substate => substate.accountTypeData,
  );

const makeSelectParentAccountTypeData = () =>
  createSelector(
    selectChartDomain,
    substate => substate.parentAccountTypeData,
  );

const makeSelectChartOfAccountPostData = () =>
  createSelector(
    selectChartDomain,
    subState => subState.chartOfAccountPostData,
  );

const makeSelectGetChartOfAccountData = () =>
  createSelector(
    selectChartDomain,
    substate => substate.chartOfAccountData,
  );


export default makeSelectAccounting;

export { 
  selectChartDomain,
  makeSelectLoading,
  makeSelectNewAccountDialog,
  makeSelectConfirmAccountDeleteDialog,
  makeSelectAccountTypeData,
  makeSelectParentAccountTypeData,
  makeSelectChartOfAccountPostData,
  makeSelectGetChartOfAccountData
};
