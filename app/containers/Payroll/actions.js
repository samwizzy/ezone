import * as Constants from './constants';

export function getPayrollSetup() {
  return {
    type: Constants.GET_PAYROLL_SETUP,
  }
}

export function getPayrollSetupSuccess(data) {
  return {
    type: Constants.GET_PAYROLL_SETUP_SUCCESS,
    payload: data,
  }
}

export function getPayrollSetupError(data) {
  return {
    type: Constants.GET_PAYROLL_SETUP_ERROR,
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

