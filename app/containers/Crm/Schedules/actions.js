/*
 *
 * Crm Schedules actions
 *
 */

import * as Constants from './constants';

export function getEmployees() {
  return {
    type: Constants.GET_EMPLOYEES,
  }
}

export function getEmployeesSuccess(payload) {
  return {
    type: Constants.GET_EMPLOYEES_SUCCESS,
    payload
  }
}

export function getEmployeesError(payload) {
  return {
    type: Constants.GET_EMPLOYEES_ERROR,
    payload
  }
}

export function getContacts() {
  return {
    type: Constants.GET_CONTACTS,
  }
}

export function getContactsSuccess(payload) {
  return {
    type: Constants.GET_CONTACTS_SUCCESS,
    payload
  }
}

export function getContactsError(payload) {
  return {
    type: Constants.GET_CONTACTS_ERROR,
    payload
  }
}

export function getSchedules() {
  return {
    type: Constants.GET_SCHEDULES,
  }
}

export function getSchedulesSuccess(payload) {
  return {
    type: Constants.GET_SCHEDULES_SUCCESS,
    payload
  }
}

export function getSchedulesError(payload) {
  return {
    type: Constants.GET_SCHEDULES_ERROR,
    payload
  }
}

export function createSchedule(payload) {
  return {
    type: Constants.CREATE_SCHEDULE,
    payload
  }
}

export function createScheduleSuccess(payload) {
  return {
    type: Constants.CREATE_SCHEDULE_SUCCESS,
    payload
  }
}

export function createScheduleError(payload) {
  return {
    type: Constants.CREATE_SCHEDULE_ERROR,
    payload
  }
}

export function updateSchedule(payload) {
  return {
    type: Constants.UPDATE_SCHEDULE,
    payload
  }
}

export function updateScheduleSuccess(payload) {
  return {
    type: Constants.UPDATE_SCHEDULE_SUCCESS,
    payload
  }
}

export function updateScheduleError(payload) {
  return {
    type: Constants.UPDATE_SCHEDULE_ERROR,
    payload
  }
}

export function openNewScheduleDialog() {
  return {
    type: Constants.OPEN_NEW_SCHEDULE_DIALOG,
  }
}

export function closeNewScheduleDialog() {
  return {
    type: Constants.CLOSE_NEW_SCHEDULE_DIALOG,
  }
}

export function openEditScheduleDialog() {
  return {
    type: Constants.OPEN_EDIT_SCHEDULE_DIALOG,
  }
}

export function closeEditScheduleDialog() {
  return {
    type: Constants.CLOSE_EDIT_SCHEDULE_DIALOG,
  }
}

export function openScheduleDetailsDialog(payload) {
  return {
    type: Constants.OPEN_SCHEDULE_DETAILS_DIALOG,
    payload
  }
}

export function closeScheduleDetailsDialog() {
  return {
    type: Constants.CLOSE_SCHEDULE_DETAILS_DIALOG,
  }
}

export function openNewParticipantDialog() {
  return {
    type: Constants.OPEN_NEW_PARTICIPANT_DIALOG,
  }
}

export function closeNewParticipantDialog() {
  return {
    type: Constants.CLOSE_NEW_PARTICIPANT_DIALOG,
  }
}
