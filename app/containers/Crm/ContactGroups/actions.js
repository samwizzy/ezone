/*
 *
 * Crm actions
 *
 */

import * as Constants from './constants';

export function openNewContactGroupsDialog() {
  return {
    type: Constants.OPEN_NEW_CONTACT_GROUPS_DIALOG,
  };
}

export function closeNewContactGroupsDialog() {
  return {
    type: Constants.CLOSE_NEW_CONTACT_GROUPS_DIALOG,
  };
}

export function openEditContactGroupsDialog(data) {
  return {
    type: Constants.OPEN_EDIT_CONTACT_GROUPS_DIALOG,
    payload: data,
  };
}

export function closeEditContactGroupsDialog() {
  return {
    type: Constants.CLOSE_EDIT_CONTACT_GROUPS_DIALOG,
  };
}

export function openNewAssignContactDialog() {
  return {
    type: Constants.OPEN_ASSIGN_CONTACT_DIALOG,
  };
}

export function closeNewAssignContactDialog() {
  return {
    type: Constants.CLOSE_ASSIGN_CONTACT_DIALOG,
  };
}

export function getAllContactsGroup() {
  return {
    type: Constants.GET_ALL_CONTACTS_GROUP,
  };
}

export function getAllContactsGroupSuccess(data) {
  return {
    type: Constants.GET_ALL_CONTACTS_GROUP_SUCCESS,
    payload: data,
  };
}

export function getAllContactsGroupError() {
  return {
    type: Constants.GET_ALL_CONTACTS_GROUP_ERROR,
  };
}

export function createNewContactGroup(data) {
  return {
    type: Constants.CREATE_NEW_CONTACT_GROUP,
    payload: data,
  };
}

export function createNewContactGroupSuccess(data) {
  return {
    type: Constants.CREATE_NEW_CONTACT_GROUP_SUCCESS,
    payload: data,
  };
}

export function createNewContactGroupError(data) {
  return {
    type: Constants.CREATE_NEW_CONTACT_GROUP_ERROR,
    payload: data,
  };
}

export function updateContactGroup(data) {
  return {
    type: Constants.UPDATE_CONTACT_GROUP,
    payload: data,
  };
}

export function updateContactGroupSuccess(data) {
  return {
    type: Constants.UPDATE_CONTACT_GROUP_SUCCESS,
    payload: data,
  };
}

export function updateContactGroupError(data) {
  return {
    type: Constants.UPDATE_CONTACT_GROUP_ERROR,
    payload: data,
  };
}

export function getContactGroupById(data) {
  return {
    type: Constants.GET_CONTACT_GROUP_BY_ID,
    payload: data,
  };
}

export function getContactGroupByIdSuccess(data) {
  return {
    type: Constants.GET_CONTACT_GROUP_BY_ID_SUCCESS,
    payload: data,
  };
}

export function getContactGroupByIdError(data) {
  return {
    type: Constants.GET_CONTACT_GROUP_BY_ID_ERROR,
    payload: data,
  };
}

export function assignContactToGroup(data) {
  return {
    type: Constants.ASSIGN_CONTACT_TO_GROUP,
    payload: data,
  };
}

export function assignContactToGroupSuccess(data) {
  return {
    type: Constants.ASSIGN_CONTACT_TO_GROUP_SUCCESS,
    payload: data,
  };
}

export function assignContactToGroupError(data) {
  return {
    type: Constants.ASSIGN_CONTACT_TO_GROUP_ERROR,
    payload: data,
  };
}

export function getContacts() {
  return {
    type: Constants.GET_ALL_CONTACTS,
  };
}

export function getContactsSuccess(data) {
  return {
    type: Constants.GET_ALL_CONTACTS_SUCCESS,
    payload: data,
  };
}

export function getContactsError(data) {
  return {
    type: Constants.GET_ALL_CONTACTS_ERROR,
    payload: data,
  };
}
