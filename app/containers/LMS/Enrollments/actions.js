/*
 *
 * LMS Enrollments actions
 *
 */

import * as Constants from './constants';

export function openNewEnrollmentDialog() {
  return {
    type: Constants.OPEN_NEW_ENROLLMENT_DIALOG,
  };
}

export function closeNewEnrollmentDialog() {
  return {
    type: Constants.CLOSE_NEW_ENROLLMENT_DIALOG,
  };
}

export function openEditEnrollmentDialog(data) {
  return {
    type: Constants.OPEN_EDIT_ENROLLMENT_DIALOG,
    payload: data,
  };
}

export function closeEditEnrollmentDialog() {
  return {
    type: Constants.CLOSE_EDIT_ENROLLMENT_DIALOG,
  };
}

export function createEnrollment(data) {
  return {
    type: Constants.CREATE_ENROLLMENT,
    payload: data,
  };
}

export function createEnrollmentSuccess(data) {
  return {
    type: Constants.CREATE_ENROLLMENT_SUCCESS,
    payload: data,
  };
}

export function createEnrollmentError(data) {
  return {
    type: Constants.CREATE_ENROLLMENT_ERROR,
    payload: data,
  };
}

export function updateEnrollment(data) {
  return {
    type: Constants.UPDATE_ENROLLMENT,
    payload: data,
  };
}

export function updateEnrollmentSuccess(data) {
  return {
    type: Constants.UPDATE_ENROLLMENT_SUCCESS,
    payload: data,
  };
}

export function updateEnrollmentError(data) {
  return {
    type: Constants.UPDATE_ENROLLMENT_ERROR,
    payload: data,
  };
}

export function getEnrollments() {
  return {
    type: Constants.GET_ENROLLMENTS,
  };
}

export function getEnrollmentsSuccess(data) {
  return {
    type: Constants.GET_ENROLLMENTS_SUCCESS,
    payload: data,
  };
}

export function getEnrollmentsError(data) {
  return {
    type: Constants.GET_ENROLLMENTS_ERROR,
    payload: data,
  };
}
