import * as Constants from './constants';

export function openNewSalaryAdvanceDialog() {
  return {
    type: Constants.OPEN_NEW_SALARY_ADVANCE_DIALOG,
  };
}

export function closeNewSalaryAdvanceDialog() {
  return {
    type: Constants.CLOSE_NEW_SALARY_ADVANCE_DIALOG,
  };
}

export function openEditSalaryAdvanceDialog(data) {
  return {
    type: Constants.OPEN_EDIT_SALARY_ADVANCE_DIALOG,
    payload: data,
  };
}

export function closeEditSalaryAdvanceDialog() {
  return {
    type: Constants.CLOSE_EDIT_SALARY_ADVANCE_DIALOG,
  };
}

// Delete salary advance
export function openDeleteSalaryAdvanceDialog(data) {
  return {
    type: Constants.OPEN_DELETE_SALARY_ADVANCE_DIALOG,
    payload: data,
  };
}

export function closeDeleteSalaryAdvanceDialog() {
  return {
    type: Constants.CLOSE_DELETE_SALARY_ADVANCE_DIALOG,
  };
}

// Create new salary advance
export function createSalaryAdvance(data) {
  return {
    type: Constants.CREATE_SALARY_ADVANCE,
    payload: data,
  };
}

export function createSalaryAdvanceSuccess(data) {
  return {
    type: Constants.CREATE_SALARY_ADVANCE_SUCCESS,
    payload: data,
  };
}

export function createSalaryAdvanceError(data) {
  return {
    type: Constants.CREATE_SALARY_ADVANCE_ERROR,
    payload: data,
  };
}

// Get salary advance
export function getSalaryAdvances() {
  return {
    type: Constants.GET_SALARY_ADVANCES,
  };
}

export function getSalaryAdvancesSuccess(data) {
  return {
    type: Constants.GET_SALARY_ADVANCES_SUCCESS,
    payload: data,
  };
}

export function getSalaryAdvancesError(data) {
  return {
    type: Constants.GET_SALARY_ADVANCES_ERROR,
    payload: data,
  };
}

// Get salary advance by id
export function getSalaryAdvanceById(data) {
  return {
    type: Constants.GET_SALARY_ADVANCE_BY_ID,
    payload: { id: data },
  };
}

export function getSalaryAdvanceByIdSuccess(data) {
  return {
    type: Constants.GET_SALARY_ADVANCE_BY_ID_SUCCESS,
    payload: data,
  };
}

export function getSalaryAdvanceByIdError(data) {
  return {
    type: Constants.GET_SALARY_ADVANCE_BY_ID_ERROR,
    payload: data,
  };
}

// Update a salary advance
export function updateSalaryAdvance(data) {
  return {
    type: Constants.UPDATE_SALARY_ADVANCE,
    payload: data,
  };
}

export function updateSalaryAdvanceSuccess(data) {
  return {
    type: Constants.UPDATE_SALARY_ADVANCE_SUCCESS,
    payload: data,
  };
}

export function updateSalaryAdvanceError(data) {
  return {
    type: Constants.UPDATE_SALARY_ADVANCE_ERROR,
    payload: data,
  };
}

// Delete a salary advance
export function deleteSalaryAdvance(data) {
  return {
    type: Constants.DELETE_SALARY_ADVANCE,
    payload: data,
  };
}

export function deleteSalaryAdvanceSuccess(data) {
  return {
    type: Constants.DELETE_SALARY_ADVANCE_SUCCESS,
    payload: data,
  };
}

export function deleteSalaryAdvanceError(data) {
  return {
    type: Constants.DELETE_SALARY_ADVANCE_ERROR,
    payload: data,
  };
}
