/*
 *
 * SocialMedia actions
 *
 */

import * as Constants from './constants';

export function openNewSocialMediaDialog() {
  return {
    type: Constants.OPEN_NEW_SOCIAL_MEDIA_DIALOG,
  };
}

export function closeNewSocialMediaDialog() {
  return {
    type: Constants.CLOSE_NEW_SOCIAL_MEDIA_DIALOG,
  };
}

export function openEditSocialMediaDialog(data) {
  return {
    type: Constants.OPEN_EDIT_SOCIAL_MEDIA_DIALOG,
    payload: data,
  };
}

export function closeEditSocialMediaDialog() {
  return {
    type: Constants.CLOSE_EDIT_SOCIAL_MEDIA_DIALOG,
  };
}

export function openSocialMediaDetailsDialog(data) {
  return {
    type: Constants.OPEN_SOCIAL_MEDIA_DETAILS_DIALOG,
    payload: data,
  };
}

export function closeSocialMediaDetailsDialog() {
  return {
    type: Constants.CLOSE_SOCIAL_MEDIA_DETAILS_DIALOG,
  };
}

export function createSocialMedia(data) {
  return {
    type: Constants.CREATE_SOCIAL_MEDIA,
    payload: data,
  };
}

export function createSocialMediaSuccess(data) {
  return {
    type: Constants.CREATE_SOCIAL_MEDIA_SUCCESS,
    payload: data,
  };
}

export function createSocialMediaError(data) {
  return {
    type: Constants.CREATE_SOCIAL_MEDIA_ERROR,
    payload: data,
  };
}

export function updateSocialMedia(data) {
  return {
    type: Constants.UPDATE_SOCIAL_MEDIA,
    payload: data,
  };
}

export function updateSocialMediaSuccess(data) {
  return {
    type: Constants.UPDATE_SOCIAL_MEDIA_SUCCESS,
    payload: data,
  };
}

export function updateSocialMediaError(data) {
  return {
    type: Constants.UPDATE_SOCIAL_MEDIA_ERROR,
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

export function getEmployeesError(data) {
  return {
    type: Constants.GET_EMPLOYEES_ERROR,
    payload: data,
  };
}

export function getSocialMedias() {
  return {
    type: Constants.GET_SOCIAL_MEDIAS,
  };
}

export function getSocialMediasSuccess(data) {
  return {
    type: Constants.GET_SOCIAL_MEDIAS_SUCCESS,
    payload: data,
  };
}

export function getSocialMediasError(data) {
  return {
    type: Constants.GET_SOCIAL_MEDIAS_ERROR,
    payload: data,
  };
}
