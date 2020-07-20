/*
 *
 * Utility file actions
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

export function getAllFoldersAndDocs(payload) {
  return {
    type: Constants.GET_FOLDERS_AND_DOC,
    payload
  };
}

export function getAllFoldersAndDocsSuccess(data) {
  return {
    type: Constants.GET_FOLDERS_AND_DOC_SUCCESS,
    payload: data,
  };
}

export function getNestedFoldersAndDocs(payload) {
  return {
    type: Constants.GET_NESTED_FOLDERS_AND_DOC,
    payload
  };
}

export function getNestedFoldersAndDocsSuccess(data) {
  return {
    type: Constants.GET_NESTED_FOLDERS_AND_DOC_SUCCESS,
    payload: data,
  };
}

export function addPrevIds(folderId) {
  return {
    type: Constants.ADD_PREV_ID,
    payload: folderId
  };
}
export function removePrevIds() {
  return {
    type: Constants.REMOVE_PREV_ID,
  };
}

export function getFolderById(payload) {
  return {
    type: Constants.GET_FOLDER_BY_ID,
    payload
  };
}

export function getFolderByIdSuccess(data) {
  return {
    type: Constants.GET_FOLDER_BY_ID_SUCCESS,
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

export function addDocToFolder(data) {
  return {
    type: Constants.ADD_DOC_TO_FOLDER,
    payload: data,
  };
}

export function addDocToFolderSuccess(data) {
  return {
    type: Constants.ADD_DOC_TO_FOLDER_SUCCESS,
    payload: data,
  };
}

export function addFolderToFolder(data) {
  return {
    type: Constants.ADD_FOLDER_TO_FOLDER,
    payload: data,
  };
}

export function addFolderToFolderSuccess(data) {
  return {
    type: Constants.ADD_FOLDER_TO_FOLDER_SUCCESS,
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

export function getFavoriteDocuments(uuid) {
  return {
    type: Constants.GET_FAVORITE_DOCS_BY_UUID,
    payload: uuid
  };
}

export function getFavoriteDocumentsSuccess(data) {
  return {
    type: Constants.GET_FAVORITE_DOCS_BY_UUID_SUCCESS,
    payload: data
  };
}

export function favoriteDocument(docId) {
  return {
    type: Constants.FAVORITE_FILE_BY_DOC_ID,
    payload: { docId }
  };
}

export function favoriteDocumentSuccess(data) {
  return {
    type: Constants.FAVORITE_FILE_BY_DOC_ID_SUCCESS,
    payload: data,
  };
}

export function deleteDocument(payload) {
  return {
    type: Constants.DELETE_DOCUMENT,
    payload
  };
}

export function deleteDocumentSuccess(data) {
  return {
    type: Constants.DELETE_DOCUMENT_SUCCESS,
    payload: data,
  };
}

export function shareDocument(data) {
  return {
    type: Constants.SHARE_DOCUMENT,
    payload: data
  };
}

export function shareDocumentSuccess(data) {
  return {
    type: Constants.SHARE_DOCUMENT_SUCCESS,
    payload: data,
  };
}

export function getSharedDocuments(data) {
  return {
    type: Constants.GET_SHARED_DOCS_BY_UUID,
    payload: data
  };
}

export function getSharedDocumentsSuccess(data) {
  return {
    type: Constants.GET_SHARED_DOCS_BY_UUID_SUCCESS,
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

export function openFilePreviewDialog(selectedFile) {
  return {
    type: Constants.OPEN_PREVIEW_FILE_DIALOG,
    payload: selectedFile
  };
}

export function closeFilePreviewDialog() {
  return {
    type: Constants.CLOSE_PREVIEW_FILE_DIALOG,
  };
}

export function openFileUploadDialog() {
  return {
    type: Constants.OPEN_FILE_UPLOAD_DIALOG,
  };
}

export function closeFileUploadDialog() {
  return {
    type: Constants.CLOSE_FILE_UPLOAD_DIALOG,
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

export function openNewFolderDialog() {
  return {
    type: Constants.OPEN_NEW_FOLDER_DIALOG,
  };
}

export function closeNewFolderDialog() {
  return {
    type: Constants.CLOSE_NEW_FOLDER_DIALOG,
  };
}
