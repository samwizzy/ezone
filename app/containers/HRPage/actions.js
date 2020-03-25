/*
 * HRPage Actions
 */

import * as Constants from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function getEmployees() {
  return {
    type: Constants.GET_EMPLOYEES,
  };
}

export function getEmployeesSuccess(data) {
  return {
    type: Constants.GET_EMPLOYEES_SUCCESS,
    payload: data
  };
}

export function getEmployee(uuid) {
  console.log(uuid, "I am the employee action")
  return {
    type: Constants.GET_EMPLOYEE,
    payload: uuid
  };
}

export function getEmployeeSuccess(data) {
  return {
    type: Constants.GET_EMPLOYEE_SUCCESS,
    payload: data
  };
}

export function openNewEmployeeDialog() {
  console.log("This is the open dialog here")
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
  };
}

export function closeEditEmployeeDialog(data) {
  return {
    type: Constants.CLOSE_EDIT_EMPLOYEE_DIALOG,
  };
}
