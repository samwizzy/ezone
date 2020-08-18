/*
 *
 * Course Management actions
 *
 */

import * as Constants from './constants';

export function openNewAssignmentDialog() {
  return {
    type: Constants.OPEN_NEW_ASSIGNMENT_DIALOG,
  };
}

export function closeNewAssignmentDialog() {
  return {
    type: Constants.CLOSE_NEW_ASSIGNMENT_DIALOG,
  };
}

export function openNewLectureDialog() {
  return {
    type: Constants.OPEN_NEW_LECTURE_DIALOG,
  };
}

export function closeNewLectureDialog() {
  return {
    type: Constants.CLOSE_NEW_LECTURE_DIALOG,
  };
}

export function createAssignment(data) {
  return {
    type: Constants.CREATE_ASSIGNMENT,
    payload: data,
  };
}

export function createAssignmentSuccess(data) {
  return {
    type: Constants.CREATE_ASSIGNMENT_SUCCESS,
    payload: data,
  };
}

export function createAssignmentError(data) {
  return {
    type: Constants.CREATE_ASSIGNMENT_ERROR,
    payload: data,
  };
}

export function updateAssignment(data) {
  return {
    type: Constants.UPDATE_ASSIGNMENT,
    payload: data,
  };
}

export function updateAssignmentSuccess(data) {
  return {
    type: Constants.UPDATE_ASSIGNMENT_SUCCESS,
    payload: data,
  };
}

export function updateAssignmentError(data) {
  return {
    type: Constants.UPDATE_ASSIGNMENT_ERROR,
    payload: data,
  };
}

export function getAssignments() {
  return {
    type: Constants.GET_ASSIGNMENTS,
  };
}

export function getAssignmentsSuccess(data) {
  return {
    type: Constants.GET_ASSIGNMENTS_SUCCESS,
    payload: data,
  };
}

export function getAssignmentsError(data) {
  return {
    type: Constants.GET_ASSIGNMENTS_ERROR,
    payload: data,
  };
}

export function createLecture(data) {
  return {
    type: Constants.CREATE_LECTURE,
    payload: data,
  };
}

export function createLectureSuccess(data) {
  return {
    type: Constants.CREATE_LECTURE_SUCCESS,
    payload: data,
  };
}

export function createLectureError(data) {
  return {
    type: Constants.CREATE_LECTURE_ERROR,
    payload: data,
  };
}

export function updateLecture(data) {
  return {
    type: Constants.UPDATE_LECTURE,
    payload: data,
  };
}

export function updateLectureSuccess(data) {
  return {
    type: Constants.UPDATE_LECTURE_SUCCESS,
    payload: data,
  };
}

export function updateLectureError(data) {
  return {
    type: Constants.UPDATE_LECTURE_ERROR,
    payload: data,
  };
}

export function getLectures() {
  return {
    type: Constants.GET_LECTURES,
  };
}

export function getLecturesSuccess(data) {
  return {
    type: Constants.GET_LECTURES_SUCCESS,
    payload: data,
  };
}

export function getLecturesError(data) {
  return {
    type: Constants.GET_LECTURES_ERROR,
    payload: data,
  };
}

export function getCourses() {
  return {
    type: Constants.GET_COURSES,
  };
}

export function getCoursesSuccess(data) {
  return {
    type: Constants.GET_COURSES_SUCCESS,
    payload: data,
  };
}

export function getCoursesError(data) {
  return {
    type: Constants.GET_COURSES_ERROR,
    payload: data,
  };
}
