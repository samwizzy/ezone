import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the project mgt state domain
 */

const selectProjectMgtDomain = state => state.projectMgt || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Project Mgt
 */

const makeSelectProjectMgt = () =>
  createSelector(
    selectProjectMgtDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectProjectMgtDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectProjectMgtDomain,
    subState => subState.error,
  );

const makeSelectJobsDialog = () =>
  createSelector(
    selectProjectMgtDomain,
    subState => subState.jobsDialog,
  );

export default makeSelectProjectMgt;
export {
  selectProjectMgtDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectJobsDialog,
};
