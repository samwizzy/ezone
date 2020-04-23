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


// Get accounting setup
export function getAccountingSetupAction() {
  console.log('settings getAccountingSetupAction triggered');
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