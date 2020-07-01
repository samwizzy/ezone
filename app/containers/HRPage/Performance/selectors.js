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
const makeSelectGoals = () =>
  createSelector(
    selectPerformance,
    subState => subState.goals,
  );
const makeSelectGoal = () =>
  createSelector(
    selectPerformance,
    subState => subState.goal,
  );
const makeSelectRecognitions = () =>
  createSelector(
    selectPerformance,
    subState => subState.recognitions,
  );
const makeSelectRecognition = () =>
  createSelector(
    selectPerformance,
    subState => subState.recognition,
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
const makeSelectEmployees = () =>
  createSelector(
    selectPerformance,
    subState => subState.employees,
  );
const makeSelectDepartments = () =>
  createSelector(
    selectPerformance,
    subState => subState.departments,
  );
const makeSelectBranches = () =>
  createSelector(
    selectPerformance,
    subState => subState.branches,
  );
const makeSelectRoles = () =>
  createSelector(
    selectPerformance,
    subState => subState.roles,
  );

export default makeSelectPerformancePage;
export {
  selectPerformance,
  makeSelectLoading,
  makeSelectEmployees,
  makeSelectDepartments,
  makeSelectBranches,
  makeSelectRoles,
  makeSelectGoals,
  makeSelectGoal,
  makeSelectRecognitions,
  makeSelectRecognition,
  makeSelectFeedbacks,
  makeSelectReviews,
  makeSelectLeaveRequestDialog,
  makeSelectLeaveTypeDialog,
  makeSelectHolidayDialog,
  makeSelectGoalsDialog,
  makeSelectRecognitionDialog,
};
