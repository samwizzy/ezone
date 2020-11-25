import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the process owners state domain
 */

const selectProcessOwnersDomain = state => state.processOwners || initialState;

const makeSelectProcessOwners = () =>
  createSelector(
    selectProcessOwnersDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectProcessOwnersDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectProcessOwnersDomain,
    subState => subState.error,
  );

const makeSelectProcessOwnerDialog = () =>
  createSelector(
    selectProcessOwnersDomain,
    subState => subState.processOwnerDialog,
  );

const makeSelectAllProcessOwners = () =>
  createSelector(
    selectProcessOwnersDomain,
    subState => subState.processOwners,
  );

const makeSelectEmployees = () =>
  createSelector(
    selectProcessOwnersDomain,
    subState => subState.employees,
  );

export default makeSelectProcessOwners;
export {
  selectProcessOwnersDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectProcessOwnerDialog,
  makeSelectAllProcessOwners,
  makeSelectEmployees,
};
