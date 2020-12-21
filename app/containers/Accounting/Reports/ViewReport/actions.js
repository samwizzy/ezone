import * as Constants from './constants';

// set date
export function setStartDate(payload) {
  return {
    type: Constants.SET_START_DATE,
    payload,
  };
}
export function setEndDate(payload) {
  return {
    type: Constants.SET_END_DATE,
    payload,
  };
}

// Get general journals
export function getGeneralJournals(payload) {
  return {
    type: Constants.GET_GENERAL_JOURNALS,
    payload,
  };
}
export function getGeneralJournalsSuccess(data) {
  return {
    type: Constants.GET_GENERAL_JOURNALS_SUCCESS,
    payload: data,
  };
}
export function getGeneralJournalsError(data) {
  return {
    type: Constants.GET_GENERAL_JOURNALS_ERR,
    payload: data,
  };
}

// Get all chart of accounts
export function getChartOfAccounts(payload) {
  return {
    type: Constants.GET_CHART_OF_ACCOUNTS,
    payload,
  };
}

export function getChartOfAccountsSuccess(data) {
  return {
    type: Constants.GET_CHART_OF_ACCOUNTS_SUCCESS,
    payload: data,
  };
}

export function getChartOfAccountsError(data) {
  return {
    type: Constants.GET_CHART_OF_ACCOUNTS_ERR,
    payload: data,
  };
}

// Get general ledgers actions
export function getGeneralLedgers(data) {
  return {
    type: Constants.GET_GENERAL_LEDGERS,
    payload: data,
  };
}
export function getGeneralLedgersSuccess(data) {
  return {
    type: Constants.GET_GENERAL_LEDGERS_SUCCESS,
    payload: data,
  };
}

export function getGeneralLedgersError(data) {
  return {
    type: Constants.GET_GENERAL_LEDGERS_ERR,
    payload: data,
  };
}

/** Get Trial balance */
export function getAllTrialBalance(payload) {
  return {
    type: Constants.GET_ALL_TRIAL_BALANCE,
    payload,
  };
}
export function getAllTrialBalanceSuccess(data) {
  return {
    type: Constants.GET_ALL_TRIAL_BALANCE_SUCCESS,
    payload: data,
  };
}

export function getAllTrialBalanceError(data) {
  return {
    type: Constants.GET_ALL_TRIAL_BALANCE_ERR,
    payload: data,
  };
}

/**Get FIxed Asset Register */
export function getAllFixedAssetRegisterAction() {
  return {
    type: Constants.GET_ALL_FIXED_ASSET_REGISTER_TYPES,
  };
}
export function getFixedAssetRegisterSuccesAction(data) {
  return {
    type: Constants.GET_FIXED_ASSET_REGISTER_SUCCES_ACTION,
    payload: data,
  };
}

export function getFixedAssetRegisterErrorAction(data) {
  return {
    type: Constants.GET_FIXED_ASSET_REGISTER_ERR,
    payload: data,
  };
}

export function getFixedAssetRegisterRangeAction(data) {
  return {
    type: Constants.GET_FIXED_ASSET_REGISTER_RANGE,
    payload: data,
  };
}

/**Get FIxed Asset Shedules */
export function getAllFixedAssetScheduleAction() {
  return {
    type: Constants.GET_ALL_FIXED_ASSET_SCHEDULE_TYPES,
  };
}
export function getFixedAssetScheduleSuccesAction(data) {
  return {
    type: Constants.GET_FIXED_ASSET_SCHEDULE_SUCCES_ACTION,
    payload: data,
  };
}

export function getFixedAssetScheduleErrorAction(data) {
  return {
    type: Constants.GET_FIXED_ASSET_SCHEDULE_ERR,
    payload: data,
  };
}

export function getFixedAssetScheduleRangeAction(data) {
  return {
    type: Constants.GET_FIXED_ASSET_SCHEDULE_RANGE,
    payload: data,
  };
}

/**Get Income Statement */
export function getAllIncomeStatementAction() {
  return {
    type: Constants.GET_ALL_INCOME_STATEMENT_TYPES,
  };
}
export function getIncomeStatementSuccesAction(data) {
  return {
    type: Constants.GET_INCOME_STATEMENT_SUCCES_ACTION,
    payload: data,
  };
}

export function getIncomeStatementErrorAction(data) {
  return {
    type: Constants.GET_INCOME_STATEMENT_ERR,
    payload: data,
  };
}

export function getIncomeStatementRangeAction(data) {
  return {
    type: Constants.GET_INCOME_STATEMENT_RANGE,
    payload: data,
  };
}

//Cash flow
export function getAllCashFlowAction() {
  return {
    type: Constants.GET_ALL_CASH_FLOW_TYPES,
  };
}
export function getCashFlowSuccesAction(data) {
  return {
    type: Constants.GET_CASH_FLOW_SUCCES_ACTION,
    payload: data,
  };
}

export function getCashFlowErrorAction(data) {
  return {
    type: Constants.GET_CASH_FLOW_ERR,
    payload: data,
  };
}

export function getCashFlowRangeAction(data) {
  return {
    type: Constants.GET_CASH_FLOW_RANGE,
    payload: data,
  };
}

//Financial Position
export function getAllFinancialPositionAction() {
  return {
    type: Constants.GET_ALL_FINANCIAL_POSITION_TYPES,
  };
}
export function getFinancialPositionSuccesAction(data) {
  return {
    type: Constants.GET_FINANCIAL_POSITION_SUCCES_ACTION,
    payload: data,
  };
}

export function getFinancialPositionErrorAction(data) {
  return {
    type: Constants.GET_FINANCIAL_POSITION_ERR,
    payload: data,
  };
}

export function getFinancialPositionRangeAction(data) {
  return {
    type: Constants.GET_FINANCIAL_POSITION_RANGE,
    payload: data,
  };
}

//Cash account register
export function getAllCashAccountRegisterAction() {
  return {
    type: Constants.GET_ALL_CASH_ACCOUNT_REGISTER_TYPES,
  };
}
export function getCashAccountRegisterSuccesAction(data) {
  return {
    type: Constants.GET_CASH_ACCOUNT_REGISTER_SUCCES_ACTION,
    payload: data,
  };
}

export function getCashAccountRegisterErrorAction(data) {
  return {
    type: Constants.GET_CASH_ACCOUNT_REGISTER_ERR,
    payload: data,
  };
}

export function getCashAccountRegisterRangeAction(data) {
  return {
    type: Constants.GET_CASH_ACCOUNT_REGISTER_RANGE,
    payload: data,
  };
}
