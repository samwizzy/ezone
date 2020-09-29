import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the accounting state domain
 */

const selectAccountingDomain = state => state.dashboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Accounting
 */

const makeSelectAccounting = () =>
  createSelector(
    selectAccountingDomain,
    substate => substate,
  );

const makeSelectNewAccountDialog = () =>
  createSelector(
    selectAccountingDomain,
    substate => substate.accountDialog,
  );

const makeSelectAccountTypeData = () =>
  createSelector(
    selectAccountingDomain,
    substate => substate.accountTypeData,
  );

const makeSelectDetailTypeData = () =>
  createSelector(
    selectAccountingDomain,
    substate => substate.detailTypeData,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAccountingDomain,
    subState => subState.loading,
  );

const makeSelectChartOfAccountPostData = () =>
  createSelector(
    selectAccountingDomain,
    subState => subState.chartOfAccPostData,
  );

const makeSelectGetChartOfAccountData = () =>
  createSelector(
    selectAccountingDomain,
    substate => substate.chartOfAccData,
  );

const makeSelectGetAccountingSetupData = () =>
  createSelector(
    selectAccountingDomain,
    substate => substate.accountingSetupData,
  );

const makeSelectAccountingSetupPostData = () =>
  createSelector(
    selectAccountingDomain,
    subState => subState.accountSetupPostData,
  );

const makeSelectGetAllAccountPeriodData = () =>
  createSelector(
    selectAccountingDomain,
    substate => substate.allAccountPeriodData,
  );


export default makeSelectAccounting;

export {
  selectAccountingDomain,
  makeSelectLoading,
  makeSelectNewAccountDialog,
  makeSelectAccountTypeData,
  makeSelectDetailTypeData,
  makeSelectChartOfAccountPostData,
  makeSelectGetChartOfAccountData,
  makeSelectGetAccountingSetupData,
  makeSelectAccountingSetupPostData,
  makeSelectGetAllAccountPeriodData
};
