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
