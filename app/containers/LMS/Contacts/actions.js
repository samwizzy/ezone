/*
 *
 * Crm actions
 *
 */

import * as Constants from './constants';

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

export function openEditContactDialog(data) {
  return {
    type: Constants.OPEN_EDIT_CONTACT_DIALOG,
    payload: data,
  };
}

export function closeEditContactDialog() {
  return {
    type: Constants.CLOSE_EDIT_CONTACT_DIALOG,
  };
}

export function openContactDetailsDialog(data) {
  return {
    type: Constants.OPEN_NEW_CONTACT_DETAILS_DIALOG,
    payload: data,
  };
}

export function closeContactDetailsDialog() {
  return {
    type: Constants.CLOSE_NEW_CONTACT_DETAILS_DIALOG,
  };
}

export function getAllContacts() {
  return {
    type: Constants.GET_ALL_CONTACTS,
  };
}

export function getAllContactsSuccess(data) {
  return {
    type: Constants.GET_ALL_CONTACTS_SUCCESS,
    payload: data,
  };
}

export function getContactsGroups() {
  return {
    type: Constants.GET_CONTACTS_GROUPS,
  };
}

export function getContactsGroupsSuccess(data) {
  return {
    type: Constants.GET_CONTACTS_GROUPS_SUCCESS,
    payload: data,
  };
}

export function getAllContactsError() {
  return {
    type: Constants.GET_ALL_CONTACTS_ERROR,
  };
}

export function createNewContact(data) {
  return {
    type: Constants.CREATE_NEW_CONTACT,
    payload: data,
  };
}

export function createNewContactSuccess(data) {
  return {
    type: Constants.CREATE_NEW_CONTACT_SUCCESS,
    payload: data,
  };
}

export function createNewContactError(data) {
  return {
    type: Constants.CREATE_NEW_CONTACT_ERROR,
    payload: data,
  };
}

export function updateContact(data) {
  return {
    type: Constants.UPDATE_CONTACT,
    payload: data,
  };
}

export function updateContactSuccess(data) {
  return {
    type: Constants.UPDATE_CONTACT_SUCCESS,
    payload: data,
  };
}

export function updateContactError(data) {
  return {
    type: Constants.UPDATE_CONTACT_ERROR,
    payload: data,
  };
}
