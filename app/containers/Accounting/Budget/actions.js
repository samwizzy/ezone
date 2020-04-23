/*
 *
 * Banking actions
 *
 */

import * as Constants from './constants';

// New bank account dialog
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

// Create new bank
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
