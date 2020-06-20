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

export function getLeaveRequest() {
  return {
    type: Constants.GET_LEAVE_REQUEST,
  };
}

export function getLeaveRequestSuccess(data) {
  return {
    type: Constants.GET_LEAVE_REQUEST_SUCCESS,
    payload: data
  };
}

export function getLeaveRequestById() {
  return {
    type: Constants.GET_LEAVE_REQUEST_BY_ID,
  };
}

export function getLeaveRequestByIdSuccess(data) {
  return {
    type: Constants.GET_LEAVE_REQUEST_BY_ID_SUCCESS,
    payload: data
  };
}

export function createLeaveRequest(data) {
  return {
    type: Constants.CREATE_LEAVE_REQUEST,
    payload: data
  };
}
export function createLeaveRequestSuccess(data) {
  return {
    type: Constants.CREATE_LEAVE_REQUEST_SUCCESS,
    payload: data
  };
}

export function openNewLeaveRequestDialog() {
  return {
    type: Constants.OPEN_NEW_LEAVE_REQUEST_DIALOG,
  };
}
export function closeNewLeaveRequestDialog() {
  return {
    type: Constants.CLOSE_NEW_LEAVE_REQUEST_DIALOG,
  };
}

export function openEditLeaveRequestDialog(data) {
  return {
    type: Constants.OPEN_EDIT_LEAVE_REQUEST_DIALOG,
  };
}
export function closeEditLeaveRequestDialog(data) {
  return {
    type: Constants.CLOSE_EDIT_LEAVE_REQUEST_DIALOG,
  };
}

export function openNewLeaveTypeDialog() {
  return {
    type: Constants.OPEN_NEW_LEAVE_TYPE_DIALOG,
  };
}
export function closeNewLeaveTypeDialog() {
  return {
    type: Constants.CLOSE_NEW_LEAVE_TYPE_DIALOG,
  };
}

export function openEditLeaveTypeDialog(data) {
  return {
    type: Constants.OPEN_EDIT_LEAVE_TYPE_DIALOG,
  };
}
export function closeEditLeaveTypeDialog(data) {
  return {
    type: Constants.CLOSE_EDIT_LEAVE_TYPE_DIALOG,
  };
}

export function openNewHolidayDialog() {
  return {
    type: Constants.OPEN_NEW_HOLIDAY_DIALOG,
  };
}
export function closeNewHolidayDialog() {
  return {
    type: Constants.CLOSE_NEW_HOLIDAY_DIALOG,
  };
}

export function openEditHolidayDialog(data) {
  return {
    type: Constants.OPEN_EDIT_HOLIDAY_DIALOG,
  };
}
export function closeEditHolidayDialog(data) {
  return {
    type: Constants.CLOSE_EDIT_HOLIDAY_DIALOG,
  };
}