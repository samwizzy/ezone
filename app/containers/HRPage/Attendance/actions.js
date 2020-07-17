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
export function getAttendances() {
  return {
    type: Constants.GET_ATTENDANCES,
  };
}

export function getAttendancesSuccess(data) {
  return {
    type: Constants.GET_ATTENDANCES_SUCCESS,
    payload: data
  };
}
export function getAttendanceById() {
  return {
    type: Constants.GET_ATTENDANCE_,
  };
}

export function getAttendanceByIdSuccess(data) {
  return {
    type: Constants.GET_ATTENDANCES_SUCCESS,
    payload: data
  };
}

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
export function getDepartments() {
  return {
    type: Constants.GET_DEPARTMENTS,
  };
}

export function getDepartmentsSuccess(data) {
  return {
    type: Constants.GET_DEPARTMENTS_SUCCESS,
    payload: data
  };
}
export function getBranches() {
  return {
    type: Constants.GET_BRANCHES,
  };
}

export function getBranchesSuccess(data) {
  return {
    type: Constants.GET_BRANCHES_SUCCESS,
    payload: data
  };
}
export function getRoles() {
  return {
    type: Constants.GET_ROLES,
  };
}

export function getRolesSuccess(data) {
  return {
    type: Constants.GET_ROLES_SUCCESS,
    payload: data
  };
}

export function getDays() {
  return {
    type: Constants.GET_DAYS,
  };
}

export function getDaysSuccess(data) {
  return {
    type: Constants.GET_DAYS_SUCCESS,
    payload: data
  };
}

export function getShifts() {
  return {
    type: Constants.GET_SHIFTS,
  };
}

export function getShiftsSuccess(data) {
  return {
    type: Constants.GET_SHIFTS_SUCCESS,
    payload: data
  };
}

export function getUsersByShift(payload) {
  return {
    type: Constants.GET_USERS_BY_SHIFT,
    payload
  };
}

export function getUsersByShiftSuccess(data) {
  return {
    type: Constants.GET_USERS_BY_SHIFT_SUCCESS,
    payload: data
  };
}

export function createAttendance(data) {
  return {
    type: Constants.CREATE_ATTENDANCE,
    payload: data
  };
}
export function createAttendanceSuccess(data) {
  return {
    type: Constants.CREATE_ATTENDANCE_SUCCESS,
    payload: data
  };
}
export function createAttendanceError(data) {
  return {
    type: Constants.CREATE_ATTENDANCE_ERROR,
    payload: data
  };
}

export function createShift(data) {
  return {
    type: Constants.CREATE_SHIFT,
    payload: data
  };
}
export function createShiftSuccess(data) {
  return {
    type: Constants.CREATE_SHIFT_SUCCESS,
    payload: data
  };
}

export function assignShift(data) {
  return {
    type: Constants.ASSIGN_SHIFT,
    payload: data
  };
}
export function assignShiftSuccess(data) {
  return {
    type: Constants.ASSIGN_SHIFT_SUCCESS,
    payload: data
  };
}
export function assignShiftToParty(data) {
  return {
    type: Constants.ASSIGN_SHIFT_TO_PARTY,
    payload: data
  };
}
export function assignShiftToPartySuccess(data) {
  return {
    type: Constants.ASSIGN_SHIFT_TO_PARTY_SUCCESS,
    payload: data
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

export function openEditAttendanceDialog(data) {
  return {
    type: Constants.OPEN_EDIT_ATTENDANCE_DIALOG,
  };
}
export function closeEditAttendanceDialog(data) {
  return {
    type: Constants.CLOSE_EDIT_ATTENDANCE_DIALOG,
  };
}

export function openNewShiftDialog() {
  return {
    type: Constants.OPEN_NEW_SHIFT_DIALOG,
  };
}
export function closeNewShiftDialog() {
  return {
    type: Constants.CLOSE_NEW_SHIFT_DIALOG,
  };
}

export function openEditShiftDialog(data) {
  return {
    type: Constants.OPEN_EDIT_SHIFT_DIALOG,
  };
}
export function closeEditShiftDialog(data) {
  return {
    type: Constants.CLOSE_EDIT_SHIFT_DIALOG,
  };
}

export function openNewEmployeeShiftDialog() {
  return {
    type: Constants.OPEN_NEW_EMPLOYEE_SHIFT_DIALOG,
  };
}
export function closeNewEmployeeShiftDialog() {
  return {
    type: Constants.CLOSE_NEW_EMPLOYEE_SHIFT_DIALOG,
  };
}

export function openEditEmployeeShiftDialog(data) {
  return {
    type: Constants.OPEN_EDIT_EMPLOYEE_SHIFT_DIALOG,
  };
}
export function closeEditEmployeeShiftDialog(data) {
  return {
    type: Constants.CLOSE_EDIT_EMPLOYEE_SHIFT_DIALOG,
  };
}
