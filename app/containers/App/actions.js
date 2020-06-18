import * as Constants from './constants';

export function loginAction(data) {
  console.log("i am logging out")
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
  console.log("the user profile action got fired")
  return {
    type: Constants.GET_USER_PROFILE,
    payload: data,
  };
}

export function getUserProfileSuccessAction(data) {
  console.log(data, 'user profile data');
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

export function refreshToken() {
  return {
    type: Constants.REFRESH_TOKEN,
  };
}

export function refreshTokenSuccess(data) {
  return {
    type: Constants.REFRESH_TOKEN_SUCCESS,
    payload: data,
  };
}

export function refreshTokenError(data) {
  return {
    type: Constants.REFRESH_TOKEN_ERROR,
    payload: data,
  };
}
