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
  console.log('makeSelectNewAccountDialog');
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

const makeSelectGetAccountPeriodData = () =>
  createSelector(
    selectAccountingDomain,
    substate => substate.accountPeriodData,
  );

const makeSelectNewAccountJournalPostData = () =>
  createSelector(
    selectAccountingDomain,
    subState => subState.accountJournalPostData,
);

const makeSelectAccountJournal = () =>
  createSelector(
    selectAccountingDomain,
    subState => subState.accountJournal,
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
  makeSelectGetAccountPeriodData,
  makeSelectNewAccountJournalPostData,
  makeSelectAccountJournal
};
