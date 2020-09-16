import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the companies state domain
 */

const selectLMSStudentsDomain = state => state.lmsStudents || initialState;

const makeSelectLMSStudents = () =>
  createSelector(
    selectLMSStudentsDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectLMSStudentsDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectLMSStudentsDomain,
    subState => subState.error,
  );

const makeSelectStudentDialog = () =>
  createSelector(
    selectLMSStudentsDomain,
    subState => subState.studentDialog,
  );

const makeSelectGetStudents = () =>
  createSelector(
    selectLMSStudentsDomain,
    subState => subState.students,
  );

export default makeSelectLMSStudents;
export {
  selectLMSStudentsDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectStudentDialog,
  makeSelectGetStudents,
};
