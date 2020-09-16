import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the course management state domain
 */

const selectCoursesDomain = state => state.lmsCourses || initialState;

const makeSelectLmsCourseMgt = () =>
  createSelector(
    selectCoursesDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectCoursesDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectCoursesDomain,
    subState => subState.error,
  );

const makeSelectAssignmentDialog = () =>
  createSelector(
    selectCoursesDomain,
    subState => subState.assignmentDialog,
  );

const makeSelectLectureDialog = () =>
  createSelector(
    selectCoursesDomain,
    subState => subState.lectureDialog,
  );

const makeSelectCourseVideoDialog = () =>
  createSelector(
    selectCoursesDomain,
    subState => subState.courseVideoDialog,
  );

const makeSelectGetCategories = () =>
  createSelector(
    selectCoursesDomain,
    subState => subState.categories,
  );

const makeSelectGetCourses = () =>
  createSelector(
    selectCoursesDomain,
    subState => subState.courses,
  );

const makeSelectGetCourseById = () =>
  createSelector(
    selectCoursesDomain,
    subState => subState.course,
  );

export default makeSelectLmsCourseMgt;
export {
  selectCoursesDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectGetCategories,
  makeSelectGetCourses,
  makeSelectGetCourseById,
  makeSelectLectureDialog,
  makeSelectAssignmentDialog,
  makeSelectCourseVideoDialog,
};
