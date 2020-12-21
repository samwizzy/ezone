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
