/*
 *
 * Content Management actions
 *
 */

import * as Constants from './constants';

export function openNewContentDialog() {
  return {
    type: Constants.OPEN_NEW_CONTENT_DIALOG,
  };
}

export function closeNewContentDialog() {
  return {
    type: Constants.CLOSE_NEW_CONTENT_DIALOG,
  };
}

export function createContent(data) {
  return {
    type: Constants.CREATE_CONTENT,
    payload: data,
  };
}

export function createContentSuccess(data) {
  return {
    type: Constants.CREATE_CONTENT_SUCCESS,
    payload: data,
  };
}

export function createContentError(data) {
  return {
    type: Constants.CREATE_CONTENT_ERROR,
    payload: data,
  };
}

export function updateContent(data) {
  return {
    type: Constants.UPDATE_CONTENT,
    payload: data,
  };
}

export function updateContentSuccess(data) {
  return {
    type: Constants.UPDATE_CONTENT_SUCCESS,
    payload: data,
  };
}

export function updateContentError(data) {
  return {
    type: Constants.UPDATE_CONTENT_ERROR,
    payload: data,
  };
}

export function getContents() {
  return {
    type: Constants.GET_CONTENTS,
  };
}

export function getContentsSuccess(data) {
  return {
    type: Constants.GET_CONTENTS_SUCCESS,
    payload: data,
  };
}

export function getContentsError(data) {
  return {
    type: Constants.GET_CONTENTS_ERROR,
    payload: data,
  };
}
