import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the schedules state domain
 */

const selectSchedulesDomain = state => state.schedules || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Schedules
 */

const makeSelectSchedules = () =>
  createSelector(
    selectSchedulesDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectSchedulesDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectSchedulesDomain,
    subState => subState.error,
  );

const makeSelectEmployees = () =>
  createSelector(
    selectSchedulesDomain,
    subState => subState.employees,
  );

const makeSelectSchedules = () =>
  createSelector(
    selectSchedulesDomain,
    subState => subState.schedules,
  );

const makeSelectScheduleDialog = () =>
  createSelector(
    selectSchedulesDomain,
    subState => subState.scheduleDialog,
  );


export default makeSelectSchedules;
export {
  selectSchedulesDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectEmployees,
  makeSelectSchedules,
  makeSelectScheduleDialog,
};
