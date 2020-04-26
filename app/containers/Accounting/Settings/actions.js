/*
 *
 * Settings actions
 *
 */

import * as Constants from './constants';


// Create accounting setup
export function createAccountingSetupAction(data) {
  console.log('action triggered from settings module');
  return {
    type: Constants.CREATE_ACCOUNTING_SETUP,
    payload: data,
  };
}

export function createAccountingSetupSuccessAction(data) {
  return {
    type: Constants.CREATE_ACCOUNTING_SETUP_SUCCESS,
    payload: data,
  };
}

export function createAccountingSetupErrorAction(data) {
  return {
    type: Constants.CREATE_ACCOUNTING_SETUP_ERR,
    payload: data,
  };
}


// Get accounting setup data
export function getAccountingSetupAction() {
  return {
    type: Constants.GET_ACCOUNTING_SETUP,
  };
}

export function getAccountingSetupSuccessAction(data) {
  return {
    type: Constants.GET_ACCOUNTING_SETUP_SUCCESS,
    payload: data,
  };
}

export function getAccountingSetupErrorAction(data) {
  return {
    type: Constants.GET_ACCOUNTING_SETUP_ERR,
    payload: data,
  };
}


// Get account periods
export function getAllAccountingPeriodAction() {
  return {
    type: Constants.GET_ALL_ACCOUNTING_PERIOD,
  };
}

export function getAllAccountingPeriodSuccessAction(data) {
  return {
    type: Constants.GET_ALL_ACCOUNTING_PERIOD_SUCCESS,
    payload: data,
  };
}

export function getAllAccountingPeriodErrorAction(data) {
  return {
    type: Constants.GET_ALL_ACCOUNTING_PERIOD_ERR,
    payload: data,
  };
}


// Open account period dialog
export function openAccountPeriodDialog() {
  return {
    type: Constants.OPEN_ACCOUNT_PERIOD_DIALOG,
  };
}

export function closeAccountPeriodDialog() {
  return {
    type: Constants.CLOSE_ACCOUNT_PERIOD_DIALOG,
  };
}


// Edit account period dialog
export function editOpenAccountPeriodDialog() {
  return {
    type: Constants.EDIT_OPEN_ACCOUNT_PERIOD_DIALOG,
  };
}

export function editCloseAccountPeriodDialog() {
  return {
    type: Constants.EDIT_CLOSE_ACCOUNT_PERIOD_DIALOG,
  };
}


// Create accounting period
export function createAccountPeriodAction(data) {
  return {
    type: Constants.CREATE_ACCOUNT_PERIOD,
    payload: data,
  };
}

export function createAccountPeriodSuccessAction(data) {
  return {
    type: Constants.CREATE_ACCOUNT_PERIOD_SUCCESS,
    payload: data,
  };
}

export function createAccountPeriodErrorAction(data) {
  return {
    type: Constants.CREATE_ACCOUNT_PERIOD_ERR,
    payload: data,
  };
}


// Create accounting period
export function updateAccountPeriodAction(data) {
  console.log('updateAccountPeriodAction data ', data);
  return {
    type: Constants.UPDATE_ACCOUNT_PERIOD,
    payload: data,
  };
}

export function updateAccountPeriodSuccessAction(data) {
  return {
    type: Constants.UPDATE_ACCOUNT_PERIOD_SUCCESS,
    payload: data,
  };
}

export function updateAccountPeriodErrorAction(data) {
  return {
    type: Constants.UPDATE_ACCOUNT_PERIOD_ERR,
    payload: data,
  };
}

