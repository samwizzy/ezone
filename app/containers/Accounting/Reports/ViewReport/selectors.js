import { createSelector } from 'reselect';
import { initialState } from './reducers';

/**
 * Direct selector to the banking state domain
 */

const selectReportsDomain = state => state.reports || initialState;

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

const makeSelectFixedAssetRegister = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.fixedAssetRegister,
  );

const makeSelectFixedAssetSchedule = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.fixedAssetSchedule,
  );

const makeSelectIncomeStatement = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.incomeStatement,
  );

const makeSelectIncomeStatementTimeRange = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.incomeStatementTimeRange,
  );
const makeSelectCashFlow = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.cashFlow,
  );

const makeSelectCashFlowTimeRange = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.cashFlowTimeRange,
  );
const makeSelectFinancialPosition = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.financialPosition,
  );

const makeSelectFinancialPositionTimeRange = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.financialPositionTimeRange,
  );

const makeSelectCashAccountRegister = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.cashAccountRegister,
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
  makeSelectFixedAssetRegister,
  makeSelectFixedAssetSchedule,
  makeSelectIncomeStatement,
  makeSelectIncomeStatementTimeRange,
  makeSelectCashFlow,
  makeSelectCashFlowTimeRange,
  makeSelectFinancialPosition,
  makeSelectFinancialPositionTimeRange,
  makeSelectCashAccountRegister,
};
