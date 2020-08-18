/*
 *
 * Quizzes actions
 *
 */

import * as Constants from './constants';

export function openNewQuizDialog() {
  return {
    type: Constants.OPEN_NEW_QUIZ_DIALOG,
  };
}

export function closeNewQuizDialog() {
  return {
    type: Constants.CLOSE_NEW_QUIZ_DIALOG,
  };
}

export function openEditQuizDialog(data) {
  return {
    type: Constants.OPEN_EDIT_QUIZ_DIALOG,
    payload: data,
  };
}

export function closeEditQuizDialog() {
  return {
    type: Constants.CLOSE_EDIT_QUIZ_DIALOG,
  };
}

export function createQuiz(data) {
  return {
    type: Constants.CREATE_QUIZ,
    payload: data,
  };
}

export function createQuizSuccess(data) {
  return {
    type: Constants.CREATE_QUIZ_SUCCESS,
    payload: data,
  };
}

export function createQuizError(data) {
  return {
    type: Constants.CREATE_QUIZ_ERROR,
    payload: data,
  };
}

export function updateQuiz(data) {
  return {
    type: Constants.UPDATE_QUIZ,
    payload: data,
  }
}

export function updateQuizSuccess(data) {
  return {
    type: Constants.UPDATE_QUIZ_SUCCESS,
    payload: data,
  }
}

export function updateQuizError(data) {
  return {
    type: Constants.UPDATE_QUIZ_ERROR,
    payload: data,
  }
}

export function getQuizzes() {
  return {
    type: Constants.GET_QUIZZES,
  };
}

export function getQuizzesSuccess(data) {
  return {
    type: Constants.GET_QUIZZES_SUCCESS,
    payload: data,
  };
}

export function getQuizzesError(data) {
  return {
    type: Constants.GET_QUIZZES_ERROR,
    payload: data,
  };
}
