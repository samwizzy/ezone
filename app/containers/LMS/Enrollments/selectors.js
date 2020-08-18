import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the lms enrollments state domain
 */

const selectLmsEnrollmentsDomain = state => state.lmsEnrollments || initialState;

const makeSelectLmsEnrollments = () =>
  createSelector(
    selectLmsEnrollmentsDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectLmsEnrollmentsDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectLmsEnrollmentsDomain,
    subState => subState.error,
  );

const makeSelectEnrollmentDialog = () =>
  createSelector(
    selectLmsEnrollmentsDomain,
    subState => subState.enrollmentDialog,
  );

const makeSelectGetEnrollments = () =>
  createSelector(
    selectLmsEnrollmentsDomain,
    subState => subState.enrollments,
  );

export default makeSelectLmsEnrollments;
export {
  selectLmsEnrollmentsDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectEnrollmentDialog,
  makeSelectGetEnrollments,
};
