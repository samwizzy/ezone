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

export function openNewCourseDialog() {
  return {
    type: Constants.OPEN_NEW_COURSE_DIALOG,
  };
}

export function closeNewCourseDialog() {
  return {
    type: Constants.CLOSE_NEW_COURSE_DIALOG,
  };
}

export function openEditCourseDialog() {
  return {
    type: Constants.OPEN_EDIT_COURSE_DIALOG,
  };
}

export function closeEditCourseDialog() {
  return {
    type: Constants.CLOSE_EDIT_COURSE_DIALOG,
  };
}

export function openNewCourseVideoDialog(data) {
  return {
    type: Constants.OPEN_NEW_COURSE_VIDEO_DIALOG,
    payload: data
  };
}

export function closeNewCourseVideoDialog() {
  return {
    type: Constants.CLOSE_NEW_COURSE_VIDEO_DIALOG
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

export function getCategories() {
  return {
    type: Constants.GET_CATEGORIES,
  }
}

export function getCategoriesSuccess(data) {
  return {
    type: Constants.GET_CATEGORIES_SUCCESS,
    payload: data,
  }
}

export function getCategoriesError(data) {
  return {
    type: Constants.GET_CATEGORIES_ERROR,
    payload: data,
  }
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

// CREATE COURSE
export function createCourse(data) {
  return {
    type: Constants.CREATE_COURSE,
    payload: data,
  };
}

export function createCourseSuccess(data) {
  return {
    type: Constants.CREATE_COURSE_SUCCESS,
    payload: data,
  };
}

export function createCourseError(data) {
  return {
    type: Constants.CREATE_COURSE_ERROR,
    payload: data,
  };
}

// UPDATE COURSE
export function updateCourse(data) {
  return {
    type: Constants.UPDATE_COURSE,
    payload: data,
  };
}

export function updateCourseSuccess(data) {
  return {
    type: Constants.UPDATE_COURSE_SUCCESS,
    payload: data,
  };
}

export function updateCourseError(data) {
  return {
    type: Constants.UPDATE_COURSE_ERROR,
    payload: data,
  };
}

// UPLOAD COURSE PREVIEW
export function uploadCoursePreview(data) {
  return {
    type: Constants.UPLOAD_COURSE_PREVIEW,
    payload: data,
  };
}

export function uploadCoursePreviewSuccess(data) {
  return {
    type: Constants.UPLOAD_COURSE_PREVIEW_SUCCESS,
    payload: data,
  };
}

export function uploadCoursePreviewError(data) {
  return {
    type: Constants.UPLOAD_COURSE_PREVIEW_ERROR,
    payload: data,
  };
}

// DELETE COURSE
export function deleteCourse(data) {
  return {
    type: Constants.DELETE_COURSE,
    payload: data,
  };
}

export function deleteCourseSuccess(data) {
  return {
    type: Constants.DELETE_COURSE_SUCCESS,
    payload: data,
  };
}

export function deleteCourseError(data) {
  return {
    type: Constants.DELETE_COURSE_ERROR,
    payload: data,
  };
}

// GET COURSES
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

// GET COURSE BY ID
export function getCourseById(id) {
  console.log(id, "getCourseById from action")
  return {
    type: Constants.GET_COURSE_BY_ID,
    payload: id
  };
}

export function getCourseByIdSuccess(data) {
  return {
    type: Constants.GET_COURSE_BY_ID_SUCCESS,
    payload: data,
  };
}

export function getCourseByIdError(data) {
  return {
    type: Constants.GET_COURSE_BY_ID_ERROR,
    payload: data,
  };
}

// ADD COURSE VIDEO
export function addCourseVideo(data) {
  return {
    type: Constants.ADD_COURSE_VIDEO,
    payload: data,
  };
}

export function addCourseVideoSuccess(data) {
  return {
    type: Constants.ADD_COURSE_VIDEO_SUCCESS,
    payload: data,
  };
}

export function addCourseVideoError(data) {
  return {
    type: Constants.ADD_COURSE_VIDEO_ERROR,
    payload: data,
  };
}