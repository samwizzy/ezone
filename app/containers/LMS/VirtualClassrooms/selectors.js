import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the companies state domain
 */

const selectClassroomsDomain = state => state.lmsClassrooms || initialState;

const makeSelectClassrooms = () =>
  createSelector(
    selectClassroomsDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectClassroomsDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectClassroomsDomain,
    subState => subState.error,
  );

const makeSelectClassroomDialog = () =>
  createSelector(
    selectClassroomsDomain,
    subState => subState.classroomDialog,
  );

const makeSelectGetClassrooms = () =>
  createSelector(
    selectClassroomsDomain,
    subState => subState.classrooms,
  );

export default makeSelectClassrooms;
export {
  selectClassroomsDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectClassroomDialog,
  makeSelectGetClassrooms,
};
