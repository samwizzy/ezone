/*
 *
 * Utility actions
 *
 */

import {
  CREATE_UTILITY_TASKS_SUCCESS,
  GET_UTILITY_TASKS,
  CREATE_UTILITY_TASKS,
  GET_UTILITY_TASKS_ERROR,
  GET_UTILITY_FILES,
  CREATE_UTILITY_FILES,
  CREATE_UTILITY_FILES_SUCCESS,
  GET_UTILITY_FILES_ERROR,
  OPEN_FILE_UPLOAD_DIALOG,
  CLOSE_FILE_UPLOAD_DIALOG,
  OPEN_SHARE_FILE_DIALOG,
  CLOSE_SHARE_FILE_DIALOG,
  OPEN_NEW_TASK_DIALOG,
  CLOSE_NEW_TASK_DIALOG,
  OPEN_NEW_FILE_DIALOG,
  CLOSE_NEW_FILE_DIALOG,
  OPEN_TASK_PREVIEW_DIALOG,
  CLOSE_TASK_PREVIEW_DIALOG,
  OPEN_NEW_BRANCH_DIALOG,
  CLOSE_NEW_BRANCH_DIALOG,
  OPEN_EDIT_BRANCH_DIALOG,
  CLOSE_EDIT_BRANCH_DIALOG,
  OPEN_NEW_DEPARTMENT_DIALOG,
  CLOSE_NEW_DEPARTMENT_DIALOG,
  OPEN_EDIT_DEPARTMENT_DIALOG,
  CLOSE_EDIT_DEPARTMENT_DIALOG
} from './constants';

export function getUtilityFiles(data) {
  return {
    type: GET_UTILITY_FILES,
    payload: data
  };
}

export function getUtilityFilesError(err) {
  return {
    type: GET_UTILITY_FILES_ERROR,
    payload: err
  };
}

export function createUtilityFile(data) {
  return {
    type: CREATE_UTILITY_FILES,
    payload: data
  };
}

export function createUtilityFileSuccess(data) {
  return {
    type: CREATE_UTILITY_FILES_SUCCESS,
    payload: data
  };
}

export function createUtilityTask(data) {
  return {
    type: CREATE_UTILITY_TASKS,
    payload: data
  };
}

export function createUtilityTaskSuccess(data) {
  return {
    type: CREATE_UTILITY_TASKS_SUCCESS,
    payload: data
  };
}

export function getUtilityTasks(data) {
  return {
    type: GET_UTILITY_TASKS,
    payload: data
  };
}

export function getUtilityTasksError(err) {
  return {
    type: GET_UTILITY_TASKS_ERROR,
    payload: err
  };
}

export function openFileUploadDialog(data) {
  return {
    type: OPEN_FILE_UPLOAD_DIALOG,
    payload: data
  };
}

export function closeFileUploadDialog() {
  return {
    type: CLOSE_FILE_UPLOAD_DIALOG
  };
}

export function openShareFileDialog(data) {
  return {
    type: OPEN_SHARE_FILE_DIALOG,
    payload: data
  };
}

export function closeShareFileDialog() {
  return {
    type: CLOSE_SHARE_FILE_DIALOG,
  };
}

export function openNewTaskDialog(data) {
  return {
    type: OPEN_NEW_TASK_DIALOG,
    payload: data,
  };
}

export function closeNewTaskDialog() {
  return {
    type: CLOSE_NEW_TASK_DIALOG,
  };
}

export function openNewFileDialog(data) {
  return {
    type: OPEN_NEW_FILE_DIALOG,
    payload: data,
  };
}

export function closeNewFileDialog() {
  return {
    type: CLOSE_NEW_FILE_DIALOG,
  };
}

export function openTaskPreviewDialog(data) {
  return {
    type: OPEN_TASK_PREVIEW_DIALOG,
    payload: data,
  };
}

export function closeTaskPreviewDialog() {
  return {
    type: CLOSE_TASK_PREVIEW_DIALOG,
  };
}

export function openNewBranchDialog() {
  return {
    type: OPEN_NEW_BRANCH_DIALOG,
  };
}

export function closeNewBranchDialog() {
  return {
    type: CLOSE_NEW_BRANCH_DIALOG,
  };
}

export function opeEditBranchDialog(data) {
  return {
    type: OPEN_EDIT_BRANCH_DIALOG,
    payload: data,
  };
}

export function closeEditBranchDialog() {
  return {
    type: CLOSE_EDIT_BRANCH_DIALOG,
  };
}

export function openNewDepartmentDialog() {
  return {
    type: OPEN_NEW_DEPARTMENT_DIALOG,
  };
}

export function closeNewDepartmentDialog() {
  return {
    type: CLOSE_NEW_DEPARTMENT_DIALOG,
  };
}

export function opeEditDepartmentDialog(data) {
  return {
    type: OPEN_EDIT_DEPARTMENT_DIALOG,
    payload: data,
  };
}

export function closeEditDepartmentDialog() {
  return {
    type: CLOSE_EDIT_DEPARTMENT_DIALOG,
  };
}
