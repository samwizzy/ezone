/*
 *
 * Utility actions
 *
 */

import * as Constants from './constants';

export function getEmployees() {
  return {
    type: Constants.GET_EMPLOYEES,
  };
}

export function getEmployeesSuccess(data) {
  return {
    type: Constants.GET_EMPLOYEES_SUCCESS,
    payload: data,
  };
}

export function getEmployeesError(data) {
  return {
    type: Constants.GET_EMPLOYEES_ERROR,
    payload: data,
  };
}

export function getUserByUUID(uuid) {
  return {
    type: Constants.GET_USER_BY_UUID,
    payload: uuid,
  };
}

export function getUserByUUIDSuccess(data) {
  return {
    type: Constants.GET_USER_BY_UUID_SUCCESS,
    payload: data,
  };
}

export function openNewBranchDialog() {
  return {
    type: Constants.OPEN_NEW_BRANCH_DIALOG,
  };
}

export function closeNewBranchDialog() {
  return {
    type: Constants.CLOSE_NEW_BRANCH_DIALOG,
  };
}

export function opeEditBranchDialog(data) {
  return {
    type: Constants.OPEN_EDIT_BRANCH_DIALOG,
    payload: data,
  };
}

export function closeEditBranchDialog() {
  return {
    type: Constants.CLOSE_EDIT_BRANCH_DIALOG,
  };
}

export function openNewDepartmentDialog() {
  return {
    type: Constants.OPEN_NEW_DEPARTMENT_DIALOG,
  };
}

export function closeNewDepartmentDialog() {
  return {
    type: Constants.CLOSE_NEW_DEPARTMENT_DIALOG,
  };
}

export function opeEditDepartmentDialog(data) {
  return {
    type: Constants.OPEN_EDIT_DEPARTMENT_DIALOG,
    payload: data,
  };
}

export function closeEditDepartmentDialog() {
  return {
    type: Constants.CLOSE_EDIT_DEPARTMENT_DIALOG,
  };
}

export function getAllUsersChat() {
  return {
    type: Constants.GET_ALL_USERS_CHAT,
  };
}

export function getAllUsersChatSuccess(data) {
  return {
    type: Constants.GET_ALL_USERS_CHAT_SUCCESS,
    payload: data,
  };
}

export function getAllUsersChatError(data) {
  return {
    type: Constants.GET_ALL_USERS_CHAT_ERROR,
    payload: data,
  };
}

export function getUserChatData(data) {
  return {
    type: Constants.GET_USER_CHAT_DATA,
    payload: data,
  };
}

export function getUserChatDataSuccess(data) {
  return {
    type: Constants.GET_USER_CHAT_DATA_SUCCESS,
    payload: data,
  };
}

export function getUserChatDataError(data) {
  return {
    type: Constants.GET_USER_CHAT_DATA_ERROR,
    payload: data,
  };
}

export function postMsg(data) {
  return {
    type: Constants.POST_MSG,
    payload: data,
  };
}

export function postMsgSuccess(data) {
  return {
    type: Constants.POST_MSG_SUCCESS,
    payload: data,
  };
}

export function postMsgError(data) {
  return {
    type: Constants.POST_MSG_ERROR,
    payload: data,
  };
}

export function resetPostMsg() {
  return {
    type: Constants.RESET_POST_MSG,
  };
}

export function postFcmToken(data) {
  return {
    type: Constants.POST_FCM_TOKEN,
    payload: data,
  };
}

export function postFcmTokenSuccess(data) {
  return {
    type: Constants.POST_FCM_TOKEN_SUCCESS,
    payload: data,
  };
}

export function postFcmTokenError(data) {
  return {
    type: Constants.POST_FCM_TOKEN_ERROR,
    payload: data,
  };
}
