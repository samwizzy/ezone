/*
 *
 * AuthorizationPage actions
 *
 */

import * as Constants from './constants';

// Register Actions
export function signupRequest(data) {
  return {
    type: Constants.SIGNUP_REQUEST,
    payload: data,
  };
}

export function signupSuccessRequest(data) {
  return {
    type: Constants.SIGNUP_SUCCESS_REQUEST,
    payload: data,
  };
}

export function signupErrorRequest(data) {
  return {
    type: Constants.SIGNUP_ERROR_REQUEST,
    payload: data,
  };
}

export function forgotPassword(data) {
  return {
    type: Constants.FORGOT_PASSWORD,
    payload: data,
  };
}

export function forgotPasswordSuccess(data) {
  return {
    type: Constants.FORGOT_PASSWORD_SUCCESS,
    payload: data,
  };
}

export function forgotPasswordError(data) {
  return {
    type: Constants.FORGOT_PASSWORD_ERROR,
    payload: data,
  };
}
