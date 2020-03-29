import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the accounting state domain
 */

const selectAccountingDomain = state => state.accounting || initialState;

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

const makeSelectUpdateChartOfAccountData= () =>
  createSelector(
    selectAccountingDomain,
    substate => substate.updateChartOfAccData,
  );

const makeSelectGetChartOfAccountData = () =>
  createSelector(
    selectAccountingDomain,
    substate => substate.chartOfAccData,
  );

export default makeSelectAccounting;

export { 
  selectAccountingDomain,
  makeSelectLoading,
  makeSelectNewAccountDialog,
  makeSelectAccountTypeData,
  makeSelectDetailTypeData,
  makeSelectChartOfAccountPostData,
  makeSelectUpdateChartOfAccountData,
  makeSelectGetChartOfAccountData 
};
