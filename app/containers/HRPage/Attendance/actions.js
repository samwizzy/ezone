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