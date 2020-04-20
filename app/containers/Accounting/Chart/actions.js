/*
 *
 * Chart actions
 *
 */

import * as Constants from './constants';

// Chart dialog operations (Open new)
export function openNewAccountDialog() {
  console.log('openNewAccountDialog from chart module');
  return {
    type: Constants.OPEN_NEW_ACCOUNT_DIALOG,
  };
}

export function closeNewAccountDialog() {
  return {
    type: Constants.CLOSE_NEW_ACCOUNT_DIALOG,
  };
}

// Chart dialog operations (Edit)
export function editOpenAccountDialog(data) {
  return {
    type: Constants.EDIT_OPEN_ACCOUNT_DIALOG,
    payload: data,
  };
}

export function editCloseAccountDialog() {
  return {
    type: Constants.EDIT_CLOSE_ACCOUNT_DIALOG,
  };
}

// Get account types 
export function getAllAccountTypeAction() {
  return {
    type: Constants.GET_ALL_ACCOUNT_TYPES,
  };
}

export function getAllAccountTypeSuccessAction(data) {
  return {
    type: Constants.GET_ALL_ACCOUNT_TYPES_SUCCESS,
    payload: data,
  };
}

export function getAllAccountTypeErrorAction(data) {
  return {
    type: Constants.GET_ALL_ACCOUNT_TYPES_ERR,
    payload: data,
  };
}

// Get parent account types 
export function getParentAccountTypeAction(data) {
  console.log('getParentAccountTypeAction triggered ', data);
  return {
    type: Constants.GET_PARENT_ACCOUNT_TYPES,
    payload: data,
  };
}

export function getParentAccountTypeSuccessAction(data) {
  return {
    type: Constants.GET_PARENT_ACCOUNT_TYPES_SUCCESS,
    payload: data,
  };
}

export function getParentAccountTypeErrorAction(data) {
  return {
    type: Constants.GET_PARENT_ACCOUNT_TYPES_ERR,
    payload: data,
  };
}


// Create new chart of account
export function createNewChartOfAccountAction(data) {
  return {
    type: Constants.CREATE_NEW_CHART_OF_ACCOUNT,
    payload: data,
  };
}

export function createNewChartOfAccountSuccessAction(data) {
  return {
    type: Constants.CREATE_NEW_CHART_OF_ACCOUNT_SUCCESS,
    payload: data,
  };
}

export function createNewChartOfAccountErrorAction(data) {
  return {
    type: Constants.CREATE_NEW_CHART_OF_ACCOUNT_ERR,
    payload: data,
  };
}

// Get all chart of accounts
export function getAllChartOfAccountTypeAction() {
  console.log('getAllChartOfAccountTypeAction from chart module');
  return {
    type: Constants.GET_ALL_CHART_OF_ACCOUNT,
  };
}

export function getAllChartOfAccountTypeSuccessAction(data) {
  return {
    type: Constants.GET_ALL_CHART_OF_ACCOUNT_SUCCESS,
    payload: data,
  };
}

export function getAllChartOfAccountTypeErrorAction(data) {
  return {
    type: Constants.GET_ALL_CHART_OF_ACCOUNT_ERR,
    payload: data,
  };
}


// Delete a chart of account
export function deleteChartOfAccountAction(data) {
  return {
    type: Constants.DELETE_CHART_OF_ACCOUNT,
    payload: data,
  };
}

export function deleteChartOfAccountSuccessAction(data) {
  return {
    type: Constants.DELETE_CHART_OF_ACCOUNT_SUCCESS,
    payload: data,
  };
}

export function deleteChartOfAccountErrorAction(data) {
  return {
    type: Constants.DELETE_CHART_OF_ACCOUNT_ERR,
    payload: data,
  };
}


// Update a chart of account
export function updateChartOfAccountAction(data) {
  return {
    type: Constants.UPDATE_CHART_OF_ACCOUNT,
    payload: data,
  };
}

export function updateChartOfAccountSuccessAction(data) {
  return {
    type: Constants.UPDATE_CHART_OF_ACCOUNT_SUCCESS,
    payload: data,
  };
}

export function updateChartOfAccountErrorAction(data) {
  return {
    type: Constants.UPDATE_CHART_OF_ACCOUNT_ERR,
    payload: data,
  };
}