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

export function openNewDepartmentDialog() {
  return {
    type: Constants.OPEN_NEW_DEPARTMENT_DIALOG,
  };
}
export function closeNewDepartmentDialog() {
  return {
    type: Constants.CLOSE_NEW_DEPARTMENT_DIALOG,
  };
}

export function openNewBranchDialog() {
  console.log('we opening the dialog in action')

  return {
    type: Constants.OPEN_NEW_BRANCH_DIALOG,
  };
}
export function closeNewBranchDialog() {
  return {
    type: Constants.CLOSE_NEW_BRANCH_DIALOG,
  };
}

export function openNewRoleDialog() {
  return {
    type: Constants.OPEN_NEW_ROLE_DIALOG,
  };
}
export function closeNewRoleDialog() {
  return {
    type: Constants.CLOSE_NEW_ROLE_DIALOG,
  };
}

export function openNewAttendanceDialog() {
  return {
    type: Constants.OPEN_NEW_ATTENDANCE_DIALOG,
  };
}
export function closeNewAttendanceDialog() {
  return {
    type: Constants.CLOSE_NEW_ATTENDANCE_DIALOG,
  };
}
export function openNewPayrollDialog() {
  return {
    type: Constants.OPEN_NEW_PAYROLL_DIALOG,
  };
}
export function closeNewPayrollDialog() {
  return {
    type: Constants.CLOSE_NEW_PAYROLL_DIALOG,
  };
}
