import * as Constants from './constants';

export function loginAction(data) {
  return {
    type: Constants.LOGIN,
    payload: data,
  };
}

export function loginSuccessAction(data) {
  return {
    type: Constants.LOGIN_SUCCESS,
    payload: data,
  };
}

export function loginErrorAction(data) {
  return {
    type: Constants.LOGIN_ERROR,
    payload: data,
  };
}

export function getUserProfileAction(data) {
  return {
    type: Constants.GET_USER_PROFILE,
    payload: data,
  };
}

export function getUserProfileSuccessAction(data) {
  return {
    type: Constants.GET_USER_PROFILE_SUCCESS,
    payload: data,
  };
}

export function getUserProfileErrorAction(data) {
  return {
    type: Constants.GET_USER_PROFILE_ERROR,
    payload: data,
  };
}

export function openSnackBar(data) {
  return {
    type: Constants.OPEN_SNACKBAR,
    payload: data,
  };
}

export function closeSnackBar() {
  return {
    type: Constants.CLOSE_SNACKBAR,
  };
}

export function logout() {
  return {
    type: Constants.LOG_OUT,
  };
}
