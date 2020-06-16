/*
 * HRPage Actions
 */

import * as Constants from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function getGoals() {
  return {
    type: Constants.GET_GOALS,
  };
}

export function getGoalsSuccess(data) {
  return {
    type: Constants.GET_GOALS_SUCCESS,
    payload: data
  };
}

export function getGoalById() {
  return {
    type: Constants.GET_GOALS_BY_ID,
  };
}

export function getGoalByIdSuccess(data) {
  return {
    type: Constants.GET_GOALS_BY_ID_SUCCESS,
    payload: data
  };
}
export function getRecognitions() {
  return {
    type: Constants.GET_RECOGNITIONS,
  };
}

export function getRecognitionsSuccess(data) {
  return {
    type: Constants.GET_RECOGNITIONS_SUCCESS,
    payload: data
  };
}

export function getRecognitionById() {
  return {
    type: Constants.GET_RECOGNITION_BY_ID,
  };
}

export function getRecognitionByIdSuccess(data) {
  return {
    type: Constants.GET_RECOGNITION_BY_ID_SUCCESS,
    payload: data
  };
}

export function createGoals(data) {
  return {
    type: Constants.CREATE_GOALS,
    payload: data
  };
}
export function createGoalsSuccess(data) {
  return {
    type: Constants.CREATE_GOALS_SUCCESS,
    payload: data
  };
}

export function openNewGoalsDialog() {
  return {
    type: Constants.OPEN_NEW_GOALS_DIALOG,
  };
}
export function closeNewGoalsDialog() {
  return {
    type: Constants.CLOSE_NEW_GOALS_DIALOG,
  };
}

export function openEditGoalsDialog(data) {
  return {
    type: Constants.OPEN_EDIT_GOALS_DIALOG,
  };
}
export function closeEditGoalsDialog(data) {
  return {
    type: Constants.CLOSE_EDIT_GOALS_DIALOG,
  };
}

export function openNewRecognitionDialog() {
  return {
    type: Constants.OPEN_NEW_RECOGNITION_DIALOG,
  };
}
export function closeNewRecognitionDialog() {
  return {
    type: Constants.CLOSE_NEW_RECOGNITION_DIALOG,
  };
}

export function openEditRecognitionDialog(data) {
  return {
    type: Constants.OPEN_EDIT_RECOGNITION_DIALOG,
  };
}
export function closeEditRecognitionDialog(data) {
  return {
    type: Constants.CLOSE_EDIT_RECOGNITION_DIALOG,
  };
}

export function openNewFeedbackDialog() {
  return {
    type: Constants.OPEN_NEW_FEEDBACK_DIALOG,
  };
}
export function closeNewFeedbackDialog() {
  return {
    type: Constants.CLOSE_NEW_FEEDBACK_DIALOG,
  };
}

export function openEditFeedbackDialog(data) {
  return {
    type: Constants.OPEN_EDIT_FEEDBACK_DIALOG,
  };
}
export function closeEditFeedbackDialog(data) {
  return {
    type: Constants.CLOSE_EDIT_FEEDBACK_DIALOG,
  };
}