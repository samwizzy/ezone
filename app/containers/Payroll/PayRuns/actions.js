import * as Constants from './constants';

export function openNewPayrunDialog() {
  return {
    type: Constants.OPEN_NEW_PAYRUN_DIALOG,
  };
}

export function closeNewPayrunDialog() {
  return {
    type: Constants.CLOSE_NEW_PAYRUN_DIALOG,
  };
}

export function openEditPayrunDialog(data) {
  return {
    type: Constants.OPEN_EDIT_ACCOUNT_DIALOG,
    payload: data,
  };
}

export function closeEditPayrunDialog() {
  return {
    type: Constants.CLOSE_EDIT_ACCOUNT_DIALOG,
  };
}

// Delete payrun account action
export function openDeletePayrunDialog(data) {
  return {
    type: Constants.OPEN_DELETE_PAYRUN_DIALOG,
    payload: data,
  };
}

export function closeDeletePayrunDialog() {
  return {
    type: Constants.CLOSE_DELETE_PAYRUN_DIALOG,
  };
}

// Activate payrun account action
export function openActivatePayrunDialog(data) {
  return {
    type: Constants.OPEN_ACTIVATE_PAYRUN_DIALOG,
    payload: data,
  };
}

export function closeActivatePayrunDialog() {
  return {
    type: Constants.CLOSE_ACTIVATE_PAYRUN_DIALOG,
  };
}

// Deactivate payrun account action
export function openDeactivatePayrunDialog(data) {
  return {
    type: Constants.OPEN_DEACTIVATE_PAYRUN_DIALOG,
    payload: data,
  };
}

export function closeDeactivatePayrunDialog() {
  return {
    type: Constants.CLOSE_DEACTIVATE_PAYRUN_DIALOG,
  };
}

// Create new payrun
export function createPayrun(data) {
  return {
    type: Constants.CREATE_PAYRUN,
    payload: data,
  };
}

export function createPayrunSuccess(data) {
  return {
    type: Constants.CREATE_PAYRUN_SUCCESS,
    payload: data,
  };
}

export function createPayrunError(data) {
  return {
    type: Constants.CREATE_PAYRUN_ERROR,
    payload: data,
  };
}

// Get payruns
export function getPayruns() {
  return {
    type: Constants.GET_PAYRUNS,
  };
}

export function getPayrunsSuccess(data) {
  return {
    type: Constants.GET_PAYRUNS_SUCCESS,
    payload: data,
  };
}

export function getPayrunsError(data) {
  return {
    type: Constants.GET_PAYRUNS_ERROR,
    payload: data,
  };
}

// Get payrun by id
export function getPayrunById(data) {
  return {
    type: Constants.GET_PAYRUN_BY_ID,
    payload: { id: data },
  };
}

export function getPayrunByIdSuccess(data) {
  return {
    type: Constants.GET_PAYRUN_BY_ID_SUCCESS,
    payload: data,
  };
}

export function getPayrunByIdError(data) {
  return {
    type: Constants.GET_PAYRUN_BY_ID_ERROR,
    payload: data,
  };
}

// Update a payrun
export function updatePayrun(data) {
  return {
    type: Constants.UPDATE_PAYRUN,
    payload: data,
  };
}

export function updatePayrunSuccess(data) {
  return {
    type: Constants.UPDATE_PAYRUN_SUCCESS,
    payload: data,
  };
}

export function updatePayrunError(data) {
  return {
    type: Constants.UPDATE_PAYRUN_ERROR,
    payload: data,
  };
}

// activate or deactivate payrun
export function activateDeactivatePayrun(data) {
  return {
    type: Constants.ACTIVATE_DEACTIVATE_PAYRUN,
    payload: data,
  };
}

export function activateDeactivatePayrunSuccess(data) {
  return {
    type: Constants.ACTIVATE_DEACTIVATE_PAYRUN_SUCCESS,
    payload: data,
  };
}

export function activateDeactivatePayrunError(data) {
  return {
    type: Constants.ACTIVATE_DEACTIVATE_PAYRUN_ERROR,
    payload: data,
  };
}

// Delete a payrun
export function deletePayrun(data) {
  return {
    type: Constants.DELETE_PAYRUN,
    payload: data,
  };
}

export function deletePayrunSuccess(data) {
  return {
    type: Constants.DELETE_PAYRUN_SUCCESS,
    payload: data,
  };
}

export function deletePayrunError(data) {
  return {
    type: Constants.DELETE_PAYRUN_ERROR,
    payload: data,
  };
}
