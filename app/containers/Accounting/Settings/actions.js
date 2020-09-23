import * as Constants from './constants';

export function createAccountingSetup(data) {
  return {
    type: Constants.CREATE_ACCOUNTING_SETUP,
    payload: data,
  }
}

export function createAccountingSetupSuccess(data) {
  return {
    type: Constants.CREATE_ACCOUNTING_SETUP_SUCCESS,
    payload: data,
  }
}

export function createAccountingSetupError(data) {
  return {
    type: Constants.CREATE_ACCOUNTING_SETUP_ERR,
    payload: data,
  }
}

// Get accounting setup data
export function getAccountingSetup() {
  return {
    type: Constants.GET_ACCOUNTING_SETUP,
  }
}

export function getAccountingSetupSuccess(data) {
  return {
    type: Constants.GET_ACCOUNTING_SETUP_SUCCESS,
    payload: data,
  }
}

export function getAccountingSetupError(data) {
  return {
    type: Constants.GET_ACCOUNTING_SETUP_ERR,
    payload: data,
  }
}

// Get account periods
export function getAllAccountingPeriod() {
  return {
    type: Constants.GET_ALL_ACCOUNTING_PERIOD,
  }
}

export function getAllAccountingPeriodSuccess(data) {
  return {
    type: Constants.GET_ALL_ACCOUNTING_PERIOD_SUCCESS,
    payload: data,
  }
}

export function getAllAccountingPeriodError(data) {
  return {
    type: Constants.GET_ALL_ACCOUNTING_PERIOD_ERR,
    payload: data,
  }
}

// Get business types
export function getBusinessTypes() {
  return {
    type: Constants.GET_BUSINESS_TYPES,
  }
}

export function getBusinessTypesSuccess(data) {
  return {
    type: Constants.GET_BUSINESS_TYPES_SUCCESS,
    payload: data,
  }
}

export function getBusinessTypesError(data) {
  return {
    type: Constants.GET_BUSINESS_TYPES_ERROR,
    payload: data,
  }
}

// Get depreciation area
export function getDepreciationArea() {
  return {
    type: Constants.GET_DEPRECIATION_AREA,
  }
}

export function getDepreciationAreaSuccess(data) {
  return {
    type: Constants.GET_DEPRECIATION_AREA_SUCCESS,
    payload: data,
  }
}

export function getDepreciationAreaError(data) {
  return {
    type: Constants.GET_DEPRECIATION_AREA_ERROR,
    payload: data,
  }
}

// Get currencies
export function getCurrencies() {
  return {
    type: Constants.GET_CURRENCIES,
  }
}

export function getCurrenciesSuccess(data) {
  return {
    type: Constants.GET_CURRENCIES_SUCCESS,
    payload: data,
  }
}

export function getCurrenciesError(data) {
  return {
    type: Constants.GET_CURRENCIES_ERROR,
    payload: data,
  }
}

// Get default chart of accounts
export function getDefaultChartOfAccounts() {
  return {
    type: Constants.GET_DEFAULT_CHART_OF_ACCOUNTS,
  }
}

export function getDefaultChartOfAccountsSuccess(data) {
  return {
    type: Constants.GET_DEFAULT_CHART_OF_ACCOUNTS_SUCCESS,
    payload: data,
  }
}

export function getDefaultChartOfAccountsError(data) {
  return {
    type: Constants.GET_DEFAULT_CHART_OF_ACCOUNTS_ERROR,
    payload: data,
  }
}

// Get chart of accounts
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

// Open account period dialog
export function openAccountPeriodDialog() {
  return {
    type: Constants.OPEN_ACCOUNT_PERIOD_DIALOG,
  }
}

export function closeAccountPeriodDialog() {
  return {
    type: Constants.CLOSE_ACCOUNT_PERIOD_DIALOG,
  }
}

// Edit account period dialog
export function openEditAccountPeriodDialog(data) {
  return {
    type: Constants.EDIT_OPEN_ACCOUNT_PERIOD_DIALOG,
    payload: data,
  }
}

export function closeEditAccountPeriodDialog() {
  return {
    type: Constants.EDIT_CLOSE_ACCOUNT_PERIOD_DIALOG,
  }
}

// Edit account period dialog
export function openAccountPeriodCloseDialog(data) {
  return {
    type: Constants.OPEN_DIALOG_CLOSE_ACCOUNT_PERIOD,
    payload: data,
  };
}

export function closeAccountPeriodCloseDialog() {
  return {
    type: Constants.CLOSE_DIALOG_CLOSE_ACCOUNT_PERIOD,
  }
}

// Create accounting period
export function createAccountPeriod(data) {
  return {
    type: Constants.CREATE_ACCOUNT_PERIOD,
    payload: data,
  }
}

export function createAccountPeriodSuccess(data) {
  return {
    type: Constants.CREATE_ACCOUNT_PERIOD_SUCCESS,
    payload: data,
  }
}

export function createAccountPeriodError(data) {
  return {
    type: Constants.CREATE_ACCOUNT_PERIOD_ERR,
    payload: data,
  }
}

// update accounting period
export function updateAccountPeriod(data) {
  return {
    type: Constants.UPDATE_ACCOUNT_PERIOD,
    payload: data,
  }
}

export function updateAccountPeriodSuccess(data) {
  return {
    type: Constants.UPDATE_ACCOUNT_PERIOD_SUCCESS,
    payload: data,
  }
}

export function updateAccountPeriodError(data) {
  return {
    type: Constants.UPDATE_ACCOUNT_PERIOD_ERR,
    payload: data,
  }
}

// update accounting period status
export function updateAccountPeriodStatus(data) {
  return {
    type: Constants.UPDATE_ACCOUNT_PERIOD_STATUS,
    payload: data,
  }
}

export function updateAccountPeriodStatusSuccess(data) {
  return {
    type: Constants.UPDATE_ACCOUNT_PERIOD_STATUS_SUCCESS,
    payload: data,
  }
}

export function updateAccountPeriodStatusError(data) {
  return {
    type: Constants.UPDATE_ACCOUNT_PERIOD_STATUS_ERR,
    payload: data,
  }
}

// Set accounting period as active
export function setAccountPeriodAsActive(data) {
  return {
    type: Constants.SET_ACCOUNT_PERIOD_AS_ACTIVE,
    payload: data,
  }
}

export function setAccountPeriodAsActiveSuccess(data) {
  return {
    type: Constants.SET_ACCOUNT_PERIOD_AS_ACTIVE_SUCCESS,
    payload: data,
  }
}

export function setAccountPeriodAsActiveError(data) {
  return {
    type: Constants.SET_ACCOUNT_PERIOD_AS_ACTIVE_ERR,
    payload: data,
  }
}

