/*
 *
 * Utility actions
 *
 */

import * as Constants from './constants';

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

export function getUtilityTask(taskId) {
  return {
    type: Constants.GET_UTILITY_TASK,
    payload: taskId,
  };
}

export function getUtilityTaskSuccess(data) {
  return {
    type: Constants.GET_UTILITY_TASK_SUCCESS,
    payload: data,
  };
}
export function getUtilityTaskError(data) {
  return {
    type: Constants.GET_UTILITY_TASK_ERROR,
    payload: data,
  };
}

export function updateUtilityTask(data) {
  return {
    type: Constants.UPDATE_UTILITY_TASK,
    payload: data,
  };
}

export function updateUtilityTaskSuccess(data) {
  return {
    type: Constants.UPDATE_UTILITY_TASK_SUCCESS,
    payload: data,
  };
}

export function addTaskAttachment(data) {
  return {
    type: Constants.ADD_TASK_ATTACHMENT,
    payload: data,
  };
}

export function addTaskAttachmentSuccess(data) {
  return {
    type: Constants.ADD_TASK_ATTACHMENT_SUCCESS,
    payload: data,
  };
}

export function removeTaskAttachment(data) {
  return {
    type: Constants.REMOVE_TASK_ATTACHMENT,
    payload: data,
  };
}

export function removeTaskAttachmentSuccess(data) {
  return {
    type: Constants.REMOVE_TASK_ATTACHMENT_SUCCESS,
    payload: data,
  };
}

export function deleteTask(taskId) {
  return {
    type: Constants.DELETE_TASK,
    payload: taskId,
  };
}

export function deleteTaskSuccess(data) {
  return {
    type: Constants.DELETE_TASK_SUCCESS,
    payload: data,
  };
}

export function commentTask(data) {
  return {
    type: Constants.ADD_TASK_COMMENT,
    payload: data,
  };
}

export function commentTaskSuccess(data) {
  return {
    type: Constants.ADD_TASK_COMMENT_SUCCESS,
    payload: data,
  };
}

export function commentTaskError(data) {
  return {
    type: Constants.ADD_TASK_COMMENT_ERROR,
    payload: data,
  };
}

export function getTaskComments(taskId) {
  return {
    type: Constants.GET_TASK_COMMENTS,
    payload: taskId,
  };
}

export function getTaskCommentsSuccess(data) {
  return {
    type: Constants.GET_TASK_COMMENTS_SUCCESS,
    payload: data,
  };
}

export function getUtilityTasks() {
  return {
    type: Constants.GET_UTILITY_TASKS,
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

export function getUtilityTasksByStatus(status) {
  return {
    type: Constants.GET_UTILITY_TASKS_BY_STATUS,
    payload: status
  };
}

export function getUtilityTasksByStatusSuccess(data) {
  return {
    type: Constants.GET_UTILITY_TASKS_BY_STATUS_SUCCESS,
    payload: data,
  };
}

export function openShareFileDialog(fileId) {
  return {
    type: Constants.OPEN_SHARE_FILE_DIALOG,
    payload: fileId,
  };
}

export function closeShareFileDialog() {
  return {
    type: Constants.CLOSE_SHARE_FILE_DIALOG,
  };
}

export function openAssignToDialog() {
  return {
    type: Constants.OPEN_ASSIGN_TO_DIALOG,
  };
}

export function closeAssignToDialog() {
  return {
    type: Constants.CLOSE_ASSIGN_TO_DIALOG,
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

export function openConfirmTaskDeleteDialog(id) {
  return {
    type: Constants.OPEN_CONFIRM_TASK_DELETE_DIALOG,
    payload: id,
  };
}

export function closeConfirmTaskDeleteDialog() {
  return {
    type: Constants.CLOSE_CONFIRM_TASK_DELETE_DIALOG,
  };
}

export function openEditTaskDialog(data) {
  return {
    type: Constants.OPEN_EDIT_TASK_DIALOG,
    payload: data,
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
