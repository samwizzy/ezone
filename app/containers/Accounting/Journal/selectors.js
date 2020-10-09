import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the journal state domain
 */

const selectJournalDomain = state => state.journal || initialState;

const makeSelectJournal = () =>
  createSelector(
    selectJournalDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectJournalDomain,
    subState => subState.loading,
  );

const makeSelectGetAccountSetupData = () =>
  createSelector(
    selectJournalDomain,
    substate => substate.accountSetupData,
  );

const makeSelectGetTaxesData = () =>
  createSelector(
    selectJournalDomain,
    substate => substate.taxes,
  );

const makeSelectGetChartOfAccountData = () =>
  createSelector(
    selectJournalDomain,
    substate => substate.chartOfAccountData,
  );

const makeSelectGetAccountPeriodData = () =>
  createSelector(
    selectJournalDomain,
    substate => substate.accountPeriodData,
  );

const makeSelectJournalDialog = () =>
  createSelector(
    selectJournalDomain,
    subState => subState.journalDialog,
  );

const makeSelectTaxDialog = () =>
  createSelector(
    selectJournalDomain,
    subState => subState.taxDialog,
  );

const makeSelectJournalListData = () =>
  createSelector(
    selectJournalDomain,
    subState => subState.journalListData,
  );

const makeSelectJournalData = () =>
  createSelector(
    selectJournalDomain,
    subState => subState.journalData,
  );

const makeSelectCurrencies = () =>
  createSelector(
    selectJournalDomain,
    subState => subState.currencies,
  );

export default makeSelectJournal;

export {
  selectJournalDomain,
  makeSelectLoading,
  makeSelectGetAccountSetupData,
  makeSelectGetTaxesData,
  makeSelectGetChartOfAccountData,
  makeSelectGetAccountPeriodData,
  makeSelectJournalDialog,
  makeSelectTaxDialog,
  makeSelectJournalListData,
  makeSelectJournalData,
  makeSelectCurrencies,
};
