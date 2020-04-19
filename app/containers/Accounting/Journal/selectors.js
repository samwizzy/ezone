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

export default makeSelectJournal;
export { selectJournalDomain };
