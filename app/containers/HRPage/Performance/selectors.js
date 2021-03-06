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

const makeSelectReviewDialog = () =>
  createSelector(
    selectPerformance,
    subState => subState.reviewDialog,
  );

const makeSelectFeedbackDialog = () =>
  createSelector(
    selectPerformance,
    subState => subState.feedbackDialog,
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
  makeSelectGoalsDialog,
  makeSelectRecognitionDialog,
  makeSelectReviewDialog,
  makeSelectFeedbackDialog,
};
