/*
 *
 * Banking actions
 *
 */

import * as Constants from './constants';

// New bank account dialog
export function openNewBankAccountDialog() {
  return {
    type: Constants.OPEN_NEW_BANK_ACCOUNT_DIALOG,
  };
}

export function closeNewBankAccountDialog() {
  return {
    type: Constants.CLOSE_NEW_BANK_ACCOUNT_DIALOG,
  };
}

export function editOpenBankAccountDialog(data) {
  return {
    type: Constants.EDIT_OPEN_ACCOUNT_DIALOG,
    payload: data,
  };
}

export function editCloseBankAccountDialog() {
  return {
    type: Constants.EDIT_CLOSE_ACCOUNT_DIALOG,
  };
}

// Delete bank account action
export function openDeleteBankAccountDialog(data) {
  return {
    type: Constants.OPEN_DELETE_BANK_ACCOUNT_DIALOG,
    payload: data,
  };
}

export function closeDeleteBankAccountDialog() {
  return {
    type: Constants.CLOSE_DELETE_BANK_ACCOUNT_DIALOG,
  };
}

// Activate bank account action
export function openActivateBankAccountDialog(data) {
  return {
    type: Constants.OPEN_ACTIVATE_BANK_ACCOUNT_DIALOG,
    payload: data,
  };
}

export function closeActivateBankAccountDialog() {
  return {
    type: Constants.CLOSE_ACTIVATE_BANK_ACCOUNT_DIALOG,
  };
}

// Deactivate bank account action
export function deactivateBankAccountDialogOpen(data) {
  return {
    type: Constants.DEACTIVATE_BANK_ACCOUNT_DIALOG_OPEN,
    payload: data,
  };
}

export function deactivateBankAccountDialogClose() {
  return {
    type: Constants.DEACTIVATE_BANK_ACCOUNT_DIALOG_CLOSE,
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

// Create new bank
export function createNewBankAction(data) {
  return {
    type: Constants.CREATE_NEW_BANK,
    payload: data,
  };
}

export function createNewBankSuccessAction(data) {
  return {
    type: Constants.CREATE_NEW_BANK_SUCCESS,
    payload: data,
  };
}

export function createNewBankErrorAction(data) {
  return {
    type: Constants.CREATE_NEW_BANK_ERR,
    payload: data,
  };
}

// Get bank account 
export function getAllBankAccountAction() {
  return {
    type: Constants.GET_ALL_BANK_ACCOUNT,
  };
}

export function getAllBankAccountSuccessAction(data) {
  return {
    type: Constants.GET_ALL_BANK_ACCOUNT_SUCCESS,
    payload: data,
  };
}

export function getAllBankAccountErrorAction(data) {
  return {
    type: Constants.GET_ALL_BANK_ACCOUNT_ERR,
    payload: data,
  };
}


// Update a bank account
export function updateBankAccountAction(data) {
  return {
    type: Constants.UPDATE_BANK_ACCOUNT,
    payload: data,
  };
}

export function updateBankAccountSuccessAction(data) {
  return {
    type: Constants.UPDATE_BANK_ACCOUNT_SUCCESS,
    payload: data,
  };
}

export function updateBankAccountErrorAction(data) {
  return {
    type: Constants.UPDATE_BANK_ACCOUNT_ERR,
    payload: data,
  };
}


// Get all bank transfers made by organisation 
export function getAllTransferByOrgIdAction() {
  return {
    type: Constants.GET_ALL_TRANSFER_BY_ORGID,
  };
}

export function getAllTransferByOrgIdSuccessAction(data) {
  return {
    type: Constants.GET_ALL_TRANSFER_BY_ORGID_SUCCESS,
    payload: data,
  };
}

export function getAllTransferByOrgIdErrorAction(data) {
  return {
    type: Constants.GET_ALL_TRANSFER_BY_ORGID_ERR,
    payload: data,
  };
}


// Transaction transfer dialog
export function openAccountTransferDialog(data) {
  return {
    type: Constants.OPEN_ACCOUNT_TRANSFER_DIALOG,
    payload: data,
  };
}

export function closeAccountTransferDialog() {
  return {
    type: Constants.CLOSE_ACCOUNT_TRANSFER_DIALOG,
  };
}


// Create a bank transfer
export function createBankTransferAction(data) {
  return {
    type: Constants.CREATE_BANK_TRANSFER,
    payload: data,
  };
}

export function createBankTransferSuccessAction(data) {
  return {
    type: Constants.CREATE_BANK_TRANSFER_SUCCESS,
    payload: data,
  };
}

export function createBankTransferErrorAction(data) {
  return {
    type: Constants.CREATE_BANK_TRANSFER_ERR,
    payload: data,
  };
}


// Get all bank transfers made account 
export function getTransferByAccountIdAction(data) {
  console.log('data getTransferByAccountIdAction -> ', data);
  return {
    type: Constants.GET_TRANSFERS_BY_ACCOUNT_ID,
    payload: data,
  };
}

export function getTransferByAccountIdSuccessAction(data) {
  return {
    type: Constants.GET_TRANSFERS_BY_ACCOUNT_ID_SUCCESS,
    payload: data,
  };
}

export function getTransferByAccountIdErrorAction(data) {
  return {
    type: Constants.GET_TRANSFERS_BY_ACCOUNT_ID_ERR,
    payload: data,
  };
}


// Activate bank account
export function activateBankAccountAction(data) {
  return {
    type: Constants.ACTIVATE_BANK_ACCOUNT,
    payload: data,
  };
}

export function activateBankAccountSuccessAction(data) {
  return {
    type: Constants.ACTIVATE_BANK_ACCOUNT_SUCCESS,
    payload: data,
  };
}

export function activateBankAccountErrorAction(data) {
  return {
    type: Constants.ACTIVATE_BANK_ACCOUNT_ERR,
    payload: data,
  };
}


// Deactivate bank account
export function deactivateBankAccountAction(data) {
  return {
    type: Constants.DEACTIVATE_BANK_ACCOUNT,
    payload: data,
  };
}

export function deactivateBankAccountSuccessAction(data) {
  return {
    type: Constants.DEACTIVATE_BANK_ACCOUNT_SUCCESS,
    payload: data,
  };
}

export function deactivateBankAccountErrorAction(data) {
  return {
    type: Constants.DEACTIVATE_BANK_ACCOUNT_ERR,
    payload: data,
  };
}


// Delete a bank account
export function deleteBankAccountAction(data) {
  return {
    type: Constants.DELETE_BANK_ACCOUNT,
    payload: data,
  };
}

export function deleteBankAccountSuccessAction(data) {
  return {
    type: Constants.DELETE_BANK_ACCOUNT_SUCCESS,
    payload: data,
  };
}

export function deleteBankAccountErrorAction(data) {
  return {
    type: Constants.DELETE_BANK_ACCOUNT_ERR,
    payload: data,
  };
}