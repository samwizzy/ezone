import * as Constants from './constants';

export function getAccountingSetupAction() {
  return {
    type: Constants.GET_ACCOUNTING_SETUP,
  }
}

export function getAccountingSetupSuccessAction(data) {
  return {
    type: Constants.GET_ACCOUNTING_SETUP_SUCCESS,
    payload: data,
  }
}

export function getAccountingSetupErrorAction(data) {
  return {
    type: Constants.GET_ACCOUNTING_SETUP_ERR,
    payload: data,
  }
}

// Get all chart of accounts
export function getChartOfAccounts() {
  return {
    type: Constants.GET_CHART_OF_ACCOUNTS,
  }
}

export function getChartOfAccountsSuccess(data) {
  return {
    type: Constants.GET_CHART_OF_ACCOUNTS_SUCCESS,
    payload: data,
  }
}

export function getChartOfAccountsError(data) {
  return {
    type: Constants.GET_CHART_OF_ACCOUNTS_ERROR,
    payload: data,
  }
}

