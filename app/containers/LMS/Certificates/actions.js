/*
 *
 * Crm actions
 *
 */

import * as Constants from './constants';

export function openNewCategoryDialog() {
  return {
    type: Constants.OPEN_NEW_CATEGORY_DIALOG,
  };
}

export function closeNewCategoryDialog() {
  return {
    type: Constants.CLOSE_NEW_CATEGORY_DIALOG,
  };
}

export function openEditCategoryDialog(data) {
  return {
    type: Constants.OPEN_EDIT_CATEGORY_DIALOG,
    payload: data,
  };
}

export function closeEditCategoryDialog() {
  return {
    type: Constants.CLOSE_EDIT_CATEGORY_DIALOG,
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

export function createCategory(data) {
  return {
    type: Constants.CREATE_CATEGORY_GROUP,
    payload: data,
  };
}

export function createCategorySuccess(data) {
  return {
    type: Constants.CREATE_CATEGORY_SUCCESS,
    payload: data,
  };
}

export function createCategoryError(data) {
  return {
    type: Constants.CREATE_CATEGORY_ERROR,
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
