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
 * Default selector used by Reports
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

const makeSelectFixedAssetRegister = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.fixedAssetRegister,
  );

const makeSelectFixedAssetRegisterTimeRange = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.fixedAssetRegisterTimeRange,
  );
const makeSelectFixedAssetSchedule = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.fixedAssetSchedule,
  );

const makeSelectFixedAssetScheduleTimeRange = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.fixedAssetScheduleTimeRange,
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

const makeSelectCashAccountRegisterTimeRange = () =>
  createSelector(
    selectReportsDomain,
    substate => substate.cashAccountRegisterTimeRange,
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
  makeSelectFixedAssetRegister,
  makeSelectFixedAssetRegisterTimeRange,
  makeSelectFixedAssetSchedule,
  makeSelectFixedAssetScheduleTimeRange,
  makeSelectIncomeStatement,
  makeSelectIncomeStatementTimeRange,
  makeSelectCashFlow,
  makeSelectCashFlowTimeRange,
  makeSelectFinancialPosition,
  makeSelectFinancialPositionTimeRange,
  makeSelectCashAccountRegister,
  makeSelectCashAccountRegisterTimeRange,
};
