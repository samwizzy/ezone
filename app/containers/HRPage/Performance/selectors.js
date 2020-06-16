/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectPerformance = state => state.performance || initialState;

const makeSelectPerformancePage = () =>
  createSelector(
    selectPerformance,
    subState => subState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectPerformance,
    subState => subState.loading,
  );
const makeSelectPerformances = () =>
  createSelector(
    selectPerformance,
    subState => subState.performances,
  );
const makeSelectLeaveRequestDialog = () =>
  createSelector(
    selectPerformance,
    subState => subState.leaveRequestDialog,
  );
const makeSelectLeaveTypeDialog = () =>
  createSelector(
    selectPerformance,
    subState => subState.leaveTypeDialog,
  );
const makeSelectHolidayDialog = () =>
  createSelector(
    selectPerformance,
    subState => subState.holidayDialog,
  );
const makeSelectGoalsDialog = () =>
  createSelector(
    selectPerformance,
    subState => subState.goalsDialog,
  );
const makeSelectRecognitionDialog = () =>
  createSelector(
    selectPerformance,
    subState => subState.recognitionDialog,
  );
const makeSelectEmployees = () =>
  createSelector(
    selectPerformance,
    subState => subState.employees,
  );
const makeSelectGoals = () =>
  createSelector(
    selectPerformance,
    subState => subState.goals,
  );
const makeSelectRecognitions = () =>
  createSelector(
    selectPerformance,
    subState => subState.recognitions,
  );
const makeSelectFeedbacks = () =>
  createSelector(
    selectPerformance,
    subState => subState.feedbacks,
  );
const makeSelectReviews = () =>
  createSelector(
    selectPerformance,
    subState => subState.reviews,
  );

export default makeSelectPerformancePage;
export {
  selectPerformance,
  makeSelectLoading,
  makeSelectPerformances,
  makeSelectGoals,
  makeSelectRecognitions,
  makeSelectFeedbacks,
  makeSelectReviews,
  makeSelectLeaveRequestDialog,
  makeSelectLeaveTypeDialog,
  makeSelectHolidayDialog,
  makeSelectEmployees,
  makeSelectGoalsDialog,
  makeSelectRecognitionDialog,
};
