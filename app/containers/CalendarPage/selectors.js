/**
 * Calendar selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCalendar = state => state.calendar || initialState;

const makeSelectCalendar = () =>
  createSelector(
    selectCalendar,
    calendarState => calendarState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectCalendar,
    calendarState => calendarState.loading,
  );

const makeSelectUsername = () =>
  createSelector(
    selectCalendar,
    calendarState => calendarState.username,
  );

export default makeSelectCalendar
export {
  makeSelectLoading,
  selectCalendar,
  makeSelectUsername
};
