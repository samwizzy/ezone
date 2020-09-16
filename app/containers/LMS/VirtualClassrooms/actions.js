/*
 *
 * LMS Virtual Classrooms actions
 *
 */

import * as Constants from './constants';

export function openNewClassroomDialog() {
  return {
    type: Constants.OPEN_NEW_CLASSROOM_DIALOG,
  };
}

export function closeNewClassroomDialog() {
  return {
    type: Constants.CLOSE_NEW_CLASSROOM_DIALOG,
  };
}

export function openEditClassroomDialog(data) {
  return {
    type: Constants.OPEN_EDIT_CLASSROOM_DIALOG,
    payload: data,
  };
}

export function closeEditClassroomDialog() {
  return {
    type: Constants.CLOSE_EDIT_CLASSROOM_DIALOG,
  };
}

export function createClassroom(data) {
  return {
    type: Constants.CREATE_CLASSROOM,
    payload: data,
  };
}

export function createClassroomSuccess(data) {
  return {
    type: Constants.CREATE_CLASSROOM_SUCCESS,
    payload: data,
  };
}

export function createClassroomError(data) {
  return {
    type: Constants.CREATE_CLASSROOM_ERROR,
    payload: data,
  };
}

export function updateClassroom(data) {
  return {
    type: Constants.UPDATE_CLASSROOM,
    payload: data,
  };
}

export function updateClassroomSuccess(data) {
  return {
    type: Constants.UPDATE_CLASSROOM_SUCCESS,
    payload: data,
  };
}

export function updateClassroomError(data) {
  return {
    type: Constants.UPDATE_CLASSROOM_ERROR,
    payload: data,
  };
}

export function getClassrooms() {
  return {
    type: Constants.GET_CLASSROOMS,
  };
}

export function getClassroomsSuccess(data) {
  return {
    type: Constants.GET_CLASSROOMS_SUCCESS,
    payload: data,
  };
}

export function getClassroomsError(data) {
  return {
    type: Constants.GET_CLASSROOMS_ERROR,
    payload: data,
  };
}
