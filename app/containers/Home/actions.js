import * as Constants from './constants';

export function getApplications() {
  return {
    type: Constants.GET_APPLICATIONS,
  };
}

export function getApplicationsSuccess(payload) {
  return {
    type: Constants.GET_APPLICATIONS_SUCCESS,
    payload,
  };
}

export function getApplicationsError(payload) {
  return {
    type: Constants.GET_APPLICATIONS_ERROR,
    payload,
  };
}
