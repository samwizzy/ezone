import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the journal state domain
 */

const selectJournalDomain = state => state.journal || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Journal
 */

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

const makeSelectNewAccountJournalPostData = () =>
  createSelector(
    selectJournalDomain,
    subState => subState.accountJournalPostData,
);

const makeSelectJournalListData = () =>
  createSelector(
    selectJournalDomain,
    subState => subState.journalListData,
);

export default makeSelectJournal;

export { 
  selectJournalDomain,
  makeSelectLoading,
  makeSelectGetChartOfAccountData,
  makeSelectGetAccountPeriodData,
  makeSelectNewAccountJournalPostData,
  makeSelectJournalListData
};
