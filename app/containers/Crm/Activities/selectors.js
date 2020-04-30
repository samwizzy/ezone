import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the crm state domain
 */

const selectCrmDomain = state => state.crmActivities || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Crm
 */

const makeSelectCrm = () =>
  createSelector(
    selectCrmDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.error,
  );

const makeSelectActivitiesDialog = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.activitiesDialog,
  );

const makeSelectGetAllCrmActivities = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.getAllCrmActivites,
  );

export default makeSelectCrm;
export {
  selectCrmDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectActivitiesDialog,
  makeSelectGetAllCrmActivities,
};
