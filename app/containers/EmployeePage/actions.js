/*
 *
 * EmployeePage actions
 *
 */

import * as Constants from './constants';

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

export function createNewEmployeeSuccess(data) {
  return {
    type: Constants.CREATE_NEW_EMPLOYEE_SUCCESS,
    payload: data,
  };
}

export function createNewEmployeeError(data) {
  return {
    type: Constants.CREATE_NEW_EMPLOYEE_ERROR,
    payload: data,
  };
}
