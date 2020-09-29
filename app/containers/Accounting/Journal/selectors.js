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

const makeSelectJournalListData = () =>
  createSelector(
    selectJournalDomain,
    subState => subState.journalListData,
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
  makeSelectGetChartOfAccountData,
  makeSelectGetAccountPeriodData,
  makeSelectJournalDialog,
  makeSelectJournalListData,
  makeSelectCurrencies,
};
