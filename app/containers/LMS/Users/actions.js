/*
 *
 * Companies actions
 *
 */

import * as Constants from './constants';

export function openNewStudentDialog() {
  return {
    type: Constants.OPEN_NEW_STUDENT_DIALOG,
  };
}

export function closeNewStudentDialog() {
  return {
    type: Constants.CLOSE_NEW_STUDENT_DIALOG,
  };
}

export function openEditStudentDialog(data) {
  return {
    type: Constants.OPEN_EDIT_STUDENT_DIALOG,
    payload: data,
  };
}

export function closeEditStudentDialog() {
  return {
    type: Constants.CLOSE_EDIT_STUDENT_DIALOG,
  };
}

export function openStudentDetailsDialog(data) {
  return {
    type: Constants.OPEN_STUDENT_DETAILS_DIALOG,
    payload: data,
  };
}

export function closeStudentDetailsDialog() {
  return {
    type: Constants.CLOSE_STUDENT_DETAILS_DIALOG,
  };
}

export function createStudent(data) {
  return {
    type: Constants.CREATE_STUDENT,
    payload: data,
  };
}

export function createStudentSuccess(data) {
  return {
    type: Constants.CREATE_STUDENT_SUCCESS,
    payload: data,
  };
}

export function createStudentError(data) {
  return {
    type: Constants.CREATE_STUDENT_ERROR,
    payload: data,
  };
}

export function updateStudent(data) {
  return {
    type: Constants.UPDATE_STUDENT,
    payload: data,
  };
}

export function updateStudentSuccess(data) {
  return {
    type: Constants.UPDATE_STUDENT_SUCCESS,
    payload: data,
  };
}

export function updateStudentError(data) {
  return {
    type: Constants.UPDATE_STUDENT_ERROR,
    payload: data,
  };
}

export function getStudents() {
  return {
    type: Constants.GET_STUDENTS,
  };
}

export function getStudentsSuccess(data) {
  return {
    type: Constants.GET_STUDENTS_SUCCESS,
    payload: data,
  };
}

export function getStudentsError(data) {
  return {
    type: Constants.GET_STUDENTS_ERROR,
    payload: data,
  };
}
