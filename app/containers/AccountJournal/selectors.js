import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the accountJournal state domain
 */

const selectAccountJournalDomain = state =>
  state.accountJournal || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AccountJournal
 */

const makeSelectAccountJournal = () =>
  createSelector(
    selectAccountJournalDomain,
    substate => substate,
  );

export default makeSelectAccountJournal;
export { selectAccountJournalDomain };
