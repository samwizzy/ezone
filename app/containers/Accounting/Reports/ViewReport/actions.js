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
export function getFixedAssetRegister(payload) {
  return {
    type: Constants.GET_FIXED_ASSET_REGISTER,
    payload,
  };
}
export function getFixedAssetRegisterSuccess(data) {
  return {
    type: Constants.GET_FIXED_ASSET_REGISTER_SUCCESS,
    payload: data,
  };
}

export function getFixedAssetRegisterError(data) {
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

/**Get FIxed Asset Schedules */
export function getFixedAssetSchedule(payload) {
  return {
    type: Constants.GET_FIXED_ASSET_SCHEDULE,
    payload,
  };
}

export function getFixedAssetScheduleSuccess(data) {
  return {
    type: Constants.GET_FIXED_ASSET_SCHEDULE_SUCCESS,
    payload: data,
  };
}

export function getFixedAssetScheduleError(data) {
  return {
    type: Constants.GET_FIXED_ASSET_SCHEDULE_ERR,
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
export function getCashFlow() {
  return {
    type: Constants.GET_CASH_FLOW,
  };
}
export function getCashFlowSuccess(data) {
  return {
    type: Constants.GET_CASH_FLOW_SUCCESS,
    payload: data,
  };
}

export function getCashFlowError(data) {
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

/** Financial Position */
export function getFinancialPosition() {
  return {
    type: Constants.GET_FINANCIAL_POSITION,
  };
}
export function getFinancialPositionSuccess(data) {
  return {
    type: Constants.GET_FINANCIAL_POSITION_SUCCESS,
    payload: data,
  };
}

export function getFinancialPositionError(data) {
  return {
    type: Constants.GET_FINANCIAL_POSITION_ERR,
    payload: data,
  };
}

//Cash account register
export function getCashAccountRegister(payload) {
  return {
    type: Constants.GET_CASH_ACCOUNT_REGISTER,
    payload,
  };
}
export function getCashAccountRegisterSuccess(data) {
  return {
    type: Constants.GET_CASH_ACCOUNT_REGISTER_SUCCESS,
    payload: data,
  };
}

export function getCashAccountRegisterError(data) {
  return {
    type: Constants.GET_CASH_ACCOUNT_REGISTER_ERR,
    payload: data,
  };
}
