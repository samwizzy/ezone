import * as Constants from './constants';

export function createAccountingSetupAction(data) {
  console.log('action triggered from settings module');
  return {
    type: Constants.CREATE_ACCOUNTING_SETUP,
    payload: data,
  }
}

export function createAccountingSetupSuccessAction(data) {
  return {
    type: Constants.CREATE_ACCOUNTING_SETUP_SUCCESS,
    payload: data,
  }
}

export function createAccountingSetupErrorAction(data) {
  return {
    type: Constants.CREATE_ACCOUNTING_SETUP_ERR,
    payload: data,
  }
}

// Get accounting setup data
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

// Get account periods
export function getAllAccountingPeriodAction() {
  return {
    type: Constants.GET_ALL_ACCOUNTING_PERIOD,
  }
}

export function getAllAccountingPeriodSuccessAction(data) {
  return {
    type: Constants.GET_ALL_ACCOUNTING_PERIOD_SUCCESS,
    payload: data,
  }
}

export function getAllAccountingPeriodErrorAction(data) {
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
export function editOpenAccountPeriodDialog(data) {
  console.log('editOpenAccountPeriodDialog data ', data);
  return {
    type: Constants.EDIT_OPEN_ACCOUNT_PERIOD_DIALOG,
    payload: data,
  }
}

export function editCloseAccountPeriodDialog() {
  return {
    type: Constants.EDIT_CLOSE_ACCOUNT_PERIOD_DIALOG,
  };
}

// Edit account period dialog
export function openDialogCloseAccountPeriod(data) {
  return {
    type: Constants.OPEN_DIALOG_CLOSE_ACCOUNT_PERIOD,
    payload: data,
  };
}

export function closeDialogCloseAccountPeriod() {
  return {
    type: Constants.CLOSE_DIALOG_CLOSE_ACCOUNT_PERIOD,
  }
}

// Create accounting period
export function createAccountPeriodAction(data) {
  return {
    type: Constants.CREATE_ACCOUNT_PERIOD,
    payload: data,
  }
}

export function createAccountPeriodSuccessAction(data) {
  return {
    type: Constants.CREATE_ACCOUNT_PERIOD_SUCCESS,
    payload: data,
  }
}

export function createAccountPeriodErrorAction(data) {
  return {
    type: Constants.CREATE_ACCOUNT_PERIOD_ERR,
    payload: data,
  }
}

// Create accounting period
export function updateAccountPeriodAction(data) {
  console.log('updateAccountPeriodAction data ', data);
  return {
    type: Constants.UPDATE_ACCOUNT_PERIOD,
    payload: data,
  }
}

export function updateAccountPeriodSuccessAction(data) {
  return {
    type: Constants.UPDATE_ACCOUNT_PERIOD_SUCCESS,
    payload: data,
  }
}

export function updateAccountPeriodErrorAction(data) {
  return {
    type: Constants.UPDATE_ACCOUNT_PERIOD_ERR,
    payload: data,
  }
}

// Set accounting period as active
export function setAccountPeriodAsActiveAction(data) {
  return {
    type: Constants.SET_ACCOUNT_PERIOD_AS_ACTIVE,
    payload: data,
  }
}

export function setAccountPeriodAsActiveSuccessAction(data) {
  return {
    type: Constants.SET_ACCOUNT_PERIOD_AS_ACTIVE_SUCCESS,
    payload: data,
  }
}

export function setAccountPeriodAsActiveErrorAction(data) {
  return {
    type: Constants.SET_ACCOUNT_PERIOD_AS_ACTIVE_ERR,
    payload: data,
  }
}

