/*
 *
 * UsersPage actions
 *
 */

import * as Constants from './constants';

export function getAllEmployees() {
  return {
    type: Constants.GET_ALL_EMPLOYEES,
  };
}

export function getAllEmployeesSuccess(data) {
  return {
    type: Constants.GET_ALL_EMPLOYEES_SUCCESS,
    payload: data,
  };
}

export function getAllEmployeesError(data) {
  return {
    type: Constants.GET_ALL_EMPLOYEES_ERROR,
    payload: data,
  };
}

export function openNewEmployeeDialog() {
  return {
    type: Constants.OPEN_NEW_EMPLOYEE_DIALOG,
  };
}

export function closeNewEmployeeDialog() {
  return {
    type: Constants.CLOSE_NEW_EMPLOYEE_DIALOG,
  };
}

export function openEditEmployeeDialog(data) {
  return {
    type: Constants.OPEN_EDIT_EMPLOYEE_DIALOG,
    payload: data,
  };
}

export function closeEditEmployeeDialog() {
  return {
    type: Constants.CLOSE_EDIT_EMPLOYEE_DIALOG,
  };
}

export function openViewEmployeeDialog(data) {
  return {
    type: Constants.OPEN_VIEW_EMPLOYEE_DIALOG,
    payload: data,
  };
}

export function closeViewEmployeeDialog() {
  return {
    type: Constants.CLOSE_VIEW_EMPLOYEE_DIALOG,
  };
}

export function createNewEmployee(data) {
  return {
    type: Constants.CREATE_NEW_EMPLOYEE,
    payload: data,
  };
}

export function createNewEmployeeSuccess() {
  return {
    type: Constants.CREATE_NEW_EMPLOYEE_SUCCESS,
    // payload: data,
  };
}

export function createNewEmployeeError(data) {
  return {
    type: Constants.CREATE_NEW_EMPLOYEE_ERROR,
    payload: data,
  };
}

export function openSignatureDialog() {
  return {
    type: Constants.OPEN_SIGNATURE_DIALOG,
  };
}

export function closeSignatureDialog() {
  return {
    type: Constants.CLOSE_SIGNATURE_DIALOG,
  };
}

export function openEditUserProfileDialog(data) {
  return {
    type: Constants.OPEN_EDIT_USER_PROFILE_DIALOG,
    payload: data,
  };
}

export function closeEditUserProfileDialog() {
  return {
    type: Constants.CLOSE_EDIT_USER_PROFILE_DIALOG,
  };
}

export function updateUserProfile(data) {
  return {
    type: Constants.UPDATE_USER_PROFILE,
    payload: data,
  };
}

export function updateUserProfileSuccess() {
  return {
    type: Constants.UPDATE_USER_PROFILE_SUCCESS,
  };
}

export function updateUserProfileError(data) {
  return {
    type: Constants.UPDATE_USER_PROFILE_ERROR,
    payload: data,
  };
}
