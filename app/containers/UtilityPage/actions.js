/*
 *
 * Utility actions
 *
 */

import * as Constants from './constants';

export function getUtilityFiles() {
  return {
    type: Constants.GET_UTILITY_FILES,
  };
}

export function getUtilityFilesSuccess(data) {
  return {
    type: Constants.GET_UTILITY_FILES_SUCCESS,
    payload: data,
  };
}

export function getUtilityFile(fileId) {
  return {
    type: Constants.GET_UTILITY_FILE,
    payload: fileId
  };
}

export function getUtilityFileSuccess(data) {
  return {
    type: Constants.GET_UTILITY_FILE_SUCCESS,
    payload: data,
  };
}

export function getUtilityFilesError(err) {
  return {
    type: Constants.GET_UTILITY_FILES_ERROR,
    payload: err,
  };
}

export function createUtilityFile(data) {
  return {
    type: Constants.CREATE_UTILITY_FILES,
    payload: data,
  };
}

export function createUtilityFileSuccess(data) {
  return {
    type: Constants.CREATE_UTILITY_FILES_SUCCESS,
    payload: data,
  };
}

export function createUtilityTask(data) {
  return {
    type: Constants.CREATE_UTILITY_TASKS,
    payload: data,
  };
}

export function createUtilityTaskSuccess(data) {
  return {
    type: Constants.CREATE_UTILITY_TASKS_SUCCESS,
    payload: data,
  };
}

export function getUtilityTask(taskId) {
  return {
    type: Constants.GET_UTILITY_TASK,
    payload: taskId,
  };
}

export function getUtilityTasks() {
  return {
    type: Constants.GET_UTILITY_TASKS,
  };
}

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

export function getAssignedToByUUID(uuid) {
  return {
    type: Constants.GET_ASSIGNEDTO_BY_UUID,
    payload: uuid,
  };
}

export function getAssignedToByUUIDSuccess(data) {
  return {
    type: Constants.GET_ASSIGNEDTO_BY_UUID_SUCCESS,
    payload: data,
  };
}

export function getCreatedByUUID(uuid) {
  return {
    type: Constants.GET_CREATEDBY_BY_UUID,
    payload: uuid
  };
}

export function getCreatedByUUIDSuccess(data) {
  return {
    type: Constants.GET_CREATEDBY_BY_UUID_SUCCESS,
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

export function getUtilityTaskSuccess(data) {
  return {
    type: Constants.GET_UTILITY_TASK_SUCCESS,
    payload: data,
  };
}

export function getUtilityTasksSuccess(data) {
  return {
    type: Constants.GET_UTILITY_TASKS_SUCCESS,
    payload: data,
  };
}

export function getUtilityTasksError(err) {
  return {
    type: Constants.GET_UTILITY_TASKS_ERROR,
    payload: err,
  };
}

export function openFilePreviewDialog(data) {
  return {
    type: Constants.OPEN_PREVIEW_FILE_DIALOG,
    payload: data,
  };
}

export function closeFilePreviewDialog() {
  return {
    type: Constants.CLOSE_PREVIEW_FILE_DIALOG,
  };
}

export function openFileUploadDialog(data) {
  return {
    type: Constants.OPEN_FILE_UPLOAD_DIALOG,
    payload: data,
  };
}

export function closeFileUploadDialog() {
  return {
    type: Constants.CLOSE_FILE_UPLOAD_DIALOG,
  };
}

export function openShareFileDialog(data) {
  return {
    type: Constants.OPEN_SHARE_FILE_DIALOG,
    payload: data,
  };
}

export function closeShareFileDialog() {
  return {
    type: Constants.CLOSE_SHARE_FILE_DIALOG,
  };
}

export function openNewTaskDialog(data) {
  return {
    type: Constants.OPEN_NEW_TASK_DIALOG,
    payload: data,
  };
}

export function closeNewTaskDialog() {
  return {
    type: Constants.CLOSE_NEW_TASK_DIALOG,
  };
}

export function openNewFileDialog(data) {
  return {
    type: Constants.OPEN_NEW_FILE_DIALOG,
    payload: data,
  };
}

export function closeNewFileDialog() {
  return {
    type: Constants.CLOSE_NEW_FILE_DIALOG,
  };
}

export function openTaskPreviewDialog(data) {
  return {
    type: Constants.OPEN_TASK_PREVIEW_DIALOG,
    payload: data,
  };
}

export function closeTaskPreviewDialog() {
  return {
    type: Constants.CLOSE_TASK_PREVIEW_DIALOG,
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

// get all users
export function getAllUsers() {
  return {
    type: Constants.GET_ALL_USERS,
  };
}

export function getAllUsersSuccess(data) {
  return {
    type: Constants.GET_ALL_USERS_SUCCESS,
    payload: data,
  };
}

export function getAllUsersError(data) {
  return {
    type: Constants.GET_ALL_USERS_ERROR,
    payload: data,
  };
}

export function getAllUsersChat() {
  return {
    type: Constants.GET_ALL_USERS_CHAT,
    // payload: data,
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
