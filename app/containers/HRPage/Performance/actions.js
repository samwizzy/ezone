/*
 * HRPage Performance Actions
 */

import * as Constants from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function getEmployees() {
  return {
    type: Constants.GET_EMPLOYEES,
  };
}
export function getEmployeesSuccess(data) {
  return {
    type: Constants.GET_EMPLOYEES_SUCCESS,
    payload: data
  };
}

export function getDepartments() {
  return {
    type: Constants.GET_DEPARTMENTS,
  };
}
export function getDepartmentsSuccess(data) {
  return {
    type: Constants.GET_DEPARTMENTS_SUCCESS,
    payload: data
  };
}

export function getBranches() {
  return {
    type: Constants.GET_BRANCHES,
  };
}
export function getBranchesSuccess(data) {
  return {
    type: Constants.GET_BRANCHES_SUCCESS,
    payload: data
  };
}

export function getRoles() {
  return {
    type: Constants.GET_ROLES,
  };
}
export function getRolesSuccess(data) {
  return {
    type: Constants.GET_ROLES_SUCCESS,
    payload: data
  };
}

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

export function getGoalsById(payload) {
  return {
    type: Constants.GET_GOALS_BY_ID,
    payload
  };
}

export function getGoalsByIdSuccess(data) {
  return {
    type: Constants.GET_GOALS_BY_ID_SUCCESS,
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
export function commentGoals(data) {
  return {
    type: Constants.COMMENT_GOALS,
    payload: data
  };
}
export function commentGoalsSuccess(data) {
  return {
    type: Constants.COMMENT_GOALS_SUCCESS,
    payload: data
  };
}
export function commentGoalsError(data) {
  return {
    type: Constants.COMMENT_GOALS_ERROR,
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

export function getRecognitionById(payload) {
  return {
    type: Constants.GET_RECOGNITION_BY_ID,
    payload
  };
}

export function getRecognitionByIdSuccess(data) {
  return {
    type: Constants.GET_RECOGNITION_BY_ID_SUCCESS,
    payload: data
  };
}

export function createRecognition(payload) {
  return {
    type: Constants.CREATE_RECOGNITION,
    payload
  };
}

export function createRecognitionSuccess(data) {
  return {
    type: Constants.CREATE_RECOGNITION_SUCCESS,
    payload: data
  };
}

export function commentRecognition(payload) {
  return {
    type: Constants.COMMENT_RECOGNITION,
    payload
  };
}

export function commentRecognitionSuccess(data) {
  return {
    type: Constants.COMMENT_RECOGNITION_SUCCESS,
    payload: data
  };
}

export function commentRecognitionError(data) {
  return {
    type: Constants.COMMENT_RECOGNITION_ERROR,
    payload: data
  };
}

export function getReviews() {
  return {
    type: Constants.GET_REVIEWS,
  };
}

export function getReviewsSuccess(data) {
  return {
    type: Constants.GET_REVIEWS_SUCCESS,
    payload: data
  };
}

export function getReviewsError(data) {
  return {
    type: Constants.GET_REVIEWS_ERROR,
    payload: data
  };
}

export function getReviewById(payload) {
  return {
    type: Constants.GET_REVIEW_BY_ID,
    payload
  };
}

export function getReviewByIdSuccess(data) {
  return {
    type: Constants.GET_REVIEW_BY_ID_SUCCESS,
    payload: data
  };
}

export function getReviewByIdError(data) {
  return {
    type: Constants.GET_REVIEW_BY_ID_ERROR,
    payload: data
  };
}

export function createReview(payload) {
  return {
    type: Constants.CREATE_REVIEW,
    payload
  };
}

export function createReviewSuccess(data) {
  return {
    type: Constants.CREATE_REVIEW_SUCCESS,
    payload: data
  };
}

export function createReviewError(data) {
  return {
    type: Constants.CREATE_REVIEW_ERROR,
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

export function openNewReviewDialog() {
  return {
    type: Constants.OPEN_NEW_REVIEW_DIALOG,
  };
}
export function closeNewReviewDialog() {
  return {
    type: Constants.CLOSE_NEW_REVIEW_DIALOG,
  };
}

export function openEditReviewDialog(data) {
  return {
    type: Constants.OPEN_EDIT_REVIEW_DIALOG,
  };
}
export function closeEditReviewDialog(data) {
  return {
    type: Constants.CLOSE_EDIT_REVIEW_DIALOG,
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
