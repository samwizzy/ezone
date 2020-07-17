/*
 *
 * Crm actions
 *
 */

import * as Constants from './constants';

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

export function getContactsError() {
  return {
    type: Constants.GET_CONTACTS_ERROR,
  }
}

export function getCompanies() {
  return {
    type: Constants.GET_COMPANIES,
  }
}

export function getCompaniesSuccess(payload) {
  return {
    type: Constants.GET_COMPANIES_SUCCESS,
    payload
  }
}

export function getCompaniesError() {
  return {
    type: Constants.GET_COMPANIES_ERROR,
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

export function getTasks() {
  return {
    type: Constants.GET_TASKS,
  }
}

export function getTasksSuccess(payload) {
  return {
    type: Constants.GET_TASKS_SUCCESS,
    payload
  }
}

export function getTasksError(payload) {
  return {
    type: Constants.GET_TASKS_ERROR,
    payload
  }
}

export function openNewContactDialog() {
  return {
    type: Constants.OPEN_NEW_CONTACT_DIALOG,
  };
}

export function closeNewContactDialog() {
  return {
    type: Constants.CLOSE_NEW_CONTACT_DIALOG,
  };
}
