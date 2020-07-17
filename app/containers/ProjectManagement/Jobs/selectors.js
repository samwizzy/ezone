import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the jobs state domain
 */

const selectJobsDomain = state => state.projectMgtJobs || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Companies
 */

const makeSelectProjectMgtJobs = () =>
  createSelector(
    selectJobsDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectJobsDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectJobsDomain,
    subState => subState.error,
  );

const makeSelectJobsDialog = () =>
  createSelector(
    selectJobsDomain,
    subState => subState.jobsDialog,
  );

const makeSelectAllJobs = () =>
  createSelector(
    selectJobsDomain,
    subState => subState.jobs,
  );

const makeSelectEmployees = () =>
  createSelector(
    selectJobsDomain,
    subState => subState.employees,
  );

export default makeSelectProjectMgtJobs;
export {
  selectJobsDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectJobsDialog,
  makeSelectAllJobs,
  makeSelectEmployees,
};
