import * as Constants from './constants';

export function openNewBudgetingDialog() {
  return {
    type: Constants.OPEN_NEW_BUDGETING_DIALOG,
  };
}

export function closeNewBudgetingDialog() {
  return {
    type: Constants.CLOSE_NEW_BUDGETING_DIALOG,
  };
}

export function editOpenBudgetingDialog() {
  return {
    type: Constants.EDIT_OPEN_BUDGETING_DIALOG,
  };
}

export function editCloseBudgetingDialog() {
  return {
    type: Constants.EDIT_CLOSE_BUDGETING_DIALOG,
  };
}

// Create new budget
export function createNewBudgeting(data) {
  return {
    type: Constants.CREATE_BUDGETING,
    payload: data,
  };
}

export function createNewBudgetingSuccess(data) {
  return {
    type: Constants.CREATE_BUDGETING_SUCCESS,
    payload: data,
  };
}

export function createNewBudgetingError(data) {
  return {
    type: Constants.CREATE_BUDGETING_ERR,
    payload: data,
  };
}

// Get account periods
export function getAccountingPeriods() {
  return {
    type: Constants.GET_ALL_ACCOUNTING_PERIOD,
  };
}

export function getAccountingPeriodsSuccess(data) {
  return {
    type: Constants.GET_ALL_ACCOUNTING_PERIOD_SUCCESS,
    payload: data,
  };
}

export function getAccountingPeriodsError(data) {
  return {
    type: Constants.GET_ALL_ACCOUNTING_PERIOD_ERR,
    payload: data,
  };
}