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

export function getFacebookAccessToken() {
  return {
    type: Constants.GET_FACEBOOK_ACCESS_TOKEN,
  };
}

export function getFacebookAccessTokenSuccess(data) {
  return {
    type: Constants.GET_FACEBOOK_ACCESS_TOKEN_SUCCESS,
    payload: data,
  };
}

export function getFacebookAccessTokenError(data) {
  return {
    type: Constants.GET_FACEBOOK_ACCESS_TOKEN_ERROR,
    payload: data,
  };
}

export function generateFacebookTokenUrl() {
  return {
    type: Constants.GENERATE_FACEBOOK_AUTHORISE_URL,
  };
}

export function generateFacebookTokenUrlSuccess(data) {
  return {
    type: Constants.GENERATE_FACEBOOK_AUTHORISE_URL_SUCCESS,
    payload: data,
  };
}

export function generateFacebookTokenUrlError(data) {
  return {
    type: Constants.GENERATE_FACEBOOK_AUTHORISE_URL_ERROR,
    payload: data,
  };
}

export function getUserData() {
  return {
    type: Constants.GET_USER_DATA,
  };
}

export function getUserDataSuccess(data) {
  return {
    type: Constants.GET_USER_DATA_SUCCESS,
    payload: data,
  };
}

export function getUserDataError(data) {
  return {
    type: Constants.GET_USER_DATA_ERROR,
    payload: data,
  };
}
