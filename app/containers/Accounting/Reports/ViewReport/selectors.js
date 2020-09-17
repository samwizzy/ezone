import { createSelector } from 'reselect';
import { initialState } from './reducers';

/**
 * Direct selector to the banking state domain
 */

const selectReportsDomain = state => state.reports || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Banking
 */

const makeSelectReports = () =>
  createSelector(
    selectReportsDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.loading,
  );

const makeSelectGeneralJournal = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.generalJournal,
  );

export default makeSelectReports;

export { selectReportsDomain, makeSelectLoading, makeSelectGeneralJournal };
