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
export function getAttendance() {
  return {
    type: Constants.GET_ATTENDANCES,
  };
}

export function getAttendanceSuccess(data) {
  return {
    type: Constants.GET_ATTENDANCES_SUCCESS,
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
  console.log("open shift dialog")
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