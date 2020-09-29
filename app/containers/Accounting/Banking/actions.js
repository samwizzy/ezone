import * as Constants from './constants';

export function openNewBankAccountDialog() {
  return {
    type: Constants.OPEN_NEW_BANK_ACCOUNT_DIALOG,
  }
}

export function closeNewBankAccountDialog() {
  return {
    type: Constants.CLOSE_NEW_BANK_ACCOUNT_DIALOG,
  }
}

export function openEditBankAccountDialog(data) {
  return {
    type: Constants.EDIT_OPEN_ACCOUNT_DIALOG,
    payload: data,
  }
}

export function closeEditBankAccountDialog() {
  return {
    type: Constants.EDIT_CLOSE_ACCOUNT_DIALOG,
  }
}

// Delete bank account action
export function openDeleteBankAccountDialog(data) {
  return {
    type: Constants.OPEN_DELETE_BANK_ACCOUNT_DIALOG,
    payload: data,
  }
}

export function closeDeleteBankAccountDialog() {
  return {
    type: Constants.CLOSE_DELETE_BANK_ACCOUNT_DIALOG,
  }
}

// Activate bank account action
export function openActivateBankAccountDialog(data) {
  return {
    type: Constants.OPEN_ACTIVATE_BANK_ACCOUNT_DIALOG,
    payload: data,
  }
}

export function closeActivateBankAccountDialog() {
  return {
    type: Constants.CLOSE_ACTIVATE_BANK_ACCOUNT_DIALOG,
  }
}

// Deactivate bank account action
export function openDeactivateBankAccountDialog(data) {
  return {
    type: Constants.OPEN_DEACTIVATE_BANK_ACCOUNT_DIALOG,
    payload: data,
  };
}

export function closeDeactivateBankAccountDialog() {
  return {
    type: Constants.CLOSE_DEACTIVATE_BANK_ACCOUNT_DIALOG,
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

// Get account types 
export function getAccountTypes() {
  return {
    type: Constants.GET_ALL_ACCOUNT_TYPES,
  }
}

export function getAccountTypesSuccess(data) {
  return {
    type: Constants.GET_ALL_ACCOUNT_TYPES_SUCCESS,
    payload: data,
  }
}

export function getAccountTypesError(data) {
  return {
    type: Constants.GET_ALL_ACCOUNT_TYPES_ERR,
    payload: data,
  }
}

// Create new bank
export function createNewBank(data) {
  return {
    type: Constants.CREATE_NEW_BANK,
    payload: data,
  }
}

export function createNewBankSuccess(data) {
  return {
    type: Constants.CREATE_NEW_BANK_SUCCESS,
    payload: data,
  }
}

export function createNewBankError(data) {
  return {
    type: Constants.CREATE_NEW_BANK_ERR,
    payload: data,
  }
}

// Get bank account 
export function getBankAccounts() {
  return {
    type: Constants.GET_ALL_BANK_ACCOUNT,
  }
}

export function getBankAccountsSuccess(data) {
  return {
    type: Constants.GET_ALL_BANK_ACCOUNT_SUCCESS,
    payload: data,
  }
}

export function getBankAccountsError(data) {
  return {
    type: Constants.GET_ALL_BANK_ACCOUNT_ERR,
    payload: data,
  };
}

// Get bank account by id
export function getBankAccountById(data) {
  return {
    type: Constants.GET_BANK_ACCOUNT_BY_ID,
    payload: { id: data }
  }
}

export function getBankAccountByIdSuccess(data) {
  return {
    type: Constants.GET_BANK_ACCOUNT_BY_ID_SUCCESS,
    payload: data,
  }
}

export function getBankAccountByIdError(data) {
  return {
    type: Constants.GET_BANK_ACCOUNT_BY_ID_ERROR,
    payload: data,
  };
}

// Update a bank account
export function updateBankAccount(data) {
  return {
    type: Constants.UPDATE_BANK_ACCOUNT,
    payload: data,
  }
}

export function updateBankAccountSuccess(data) {
  return {
    type: Constants.UPDATE_BANK_ACCOUNT_SUCCESS,
    payload: data,
  }
}

export function updateBankAccountError(data) {
  return {
    type: Constants.UPDATE_BANK_ACCOUNT_ERR,
    payload: data,
  }
}


// Get all bank transfers made by organisation 
export function getTransfersByOrgId() {
  return {
    type: Constants.GET_ALL_TRANSFER_BY_ORGID,
  }
}

export function getTransfersByOrgIdSuccess(data) {
  return {
    type: Constants.GET_ALL_TRANSFER_BY_ORGID_SUCCESS,
    payload: data,
  }
}

export function getTransfersByOrgIdError(data) {
  return {
    type: Constants.GET_ALL_TRANSFER_BY_ORGID_ERR,
    payload: data,
  }
}

// Transaction transfer dialog
export function openAccountTransferDialog(data) {
  return {
    type: Constants.OPEN_ACCOUNT_TRANSFER_DIALOG,
    payload: data,
  }
}

export function closeAccountTransferDialog() {
  return {
    type: Constants.CLOSE_ACCOUNT_TRANSFER_DIALOG,
  }
}

// Create a bank transfer
export function createBankTransfer(data) {
  return {
    type: Constants.CREATE_BANK_TRANSFER,
    payload: data,
  }
}

export function createBankTransferSuccess(data) {
  return {
    type: Constants.CREATE_BANK_TRANSFER_SUCCESS,
    payload: data,
  }
}

export function createBankTransferError(data) {
  return {
    type: Constants.CREATE_BANK_TRANSFER_ERR,
    payload: data,
  }
}


// Get all bank transfers made account 
export function getTransferByAccountId(data) {
  return {
    type: Constants.GET_TRANSFERS_BY_ACCOUNT_ID,
    payload: data,
  }
}

export function getTransferByAccountIdSuccess(data) {
  return {
    type: Constants.GET_TRANSFERS_BY_ACCOUNT_ID_SUCCESS,
    payload: data,
  }
}

export function getTransferByAccountIdError(data) {
  return {
    type: Constants.GET_TRANSFERS_BY_ACCOUNT_ID_ERR,
    payload: data,
  }
}


// activate or deactivate bank account
export function activateDeactivateBankAccount(data) {
  return {
    type: Constants.ACTIVATE_DEACTIVATE_BANK_ACCOUNT,
    payload: data,
  }
}

export function activateDeactivateBankAccountSuccess(data) {
  return {
    type: Constants.ACTIVATE_DEACTIVATE_BANK_ACCOUNT_SUCCESS,
    payload: data,
  }
}

export function activateDeactivateBankAccountError(data) {
  return {
    type: Constants.ACTIVATE_DEACTIVATE_BANK_ACCOUNT_ERR,
    payload: data,
  }
}

// Delete a bank account
export function deleteBankAccount(data) {
  return {
    type: Constants.DELETE_BANK_ACCOUNT,
    payload: data,
  }
}

export function deleteBankAccountSuccess(data) {
  return {
    type: Constants.DELETE_BANK_ACCOUNT_SUCCESS,
    payload: data,
  }
}

export function deleteBankAccountError(data) {
  return {
    type: Constants.DELETE_BANK_ACCOUNT_ERR,
    payload: data,
  }
}