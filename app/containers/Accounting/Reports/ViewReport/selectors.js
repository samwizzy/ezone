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
const makeSelectDate = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.date,
  );
const makeSelectGeneralJournals = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.generalJournals,
  );
const makeSelectChartOfAccounts = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.chartOfAccounts,
  );
const makeSelectGeneralLedgers = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.generalLedgers,
  );

const makeSelectAllTrialBalance = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.trialBalances,
  );

export default makeSelectReports;

export {
  selectReportsDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectGeneralJournals,
  makeSelectDate,
  makeSelectChartOfAccounts,
  makeSelectGeneralLedgers,
  makeSelectAllTrialBalance,
};
