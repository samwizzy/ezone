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

const makeSelectGetCourses = () =>
  createSelector(
    selectCoursesDomain,
    subState => subState.courses,
  );

export default makeSelectLmsCourseMgt;
export {
  selectCoursesDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectLectureDialog,
  makeSelectAssignmentDialog,
};
