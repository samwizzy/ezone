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
const makeSelectError = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.error,
  );
const makeSelectTime = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.time,
  );
const makeSelectGeneralJournal = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.generaljournal,
  );
const makeSelectChatsOfAccount = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.chatsOfAccount,
  );
const makeSelectGeneralLedger = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.generalLedger,
  );

const makeSelectTrialBalance = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.trialBalance,
  );

export default makeSelectReports;

export {
  selectReportsDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectGeneralJournal,
  makeSelectTime,
  makeSelectChatsOfAccount,
  makeSelectGeneralLedger,
  makeSelectTrialBalance,
};
