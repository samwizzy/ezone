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

export function editOpenBankAccountDialog() {
  return {
    type: Constants.EDIT_OPEN_ACCOUNT_DIALOG,
  };
}

export function editCloseBankAccountDialog() {
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