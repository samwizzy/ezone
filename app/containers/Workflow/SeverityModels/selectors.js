import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the severity models state domain
 */

const selectSeverityModelsDomain = state => state.severityModels || initialState;

const makeSelectSeverityModels = () =>
  createSelector(
    selectSeverityModelsDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectSeverityModelsDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectSeverityModelsDomain,
    subState => subState.error,
  );

const makeSelectSeverityModelDialog = () =>
  createSelector(
    selectSeverityModelsDomain,
    subState => subState.severityModelDialog,
  );

const makeSelectAllSeverityModels = () =>
  createSelector(
    selectSeverityModelsDomain,
    subState => subState.severityModels,
  );

const makeSelectEmployees = () =>
  createSelector(
    selectSeverityModelsDomain,
    subState => subState.employees,
  );

export default makeSelectSeverityModels;
export {
  selectSeverityModelsDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectSeverityModelDialog,
  makeSelectAllSeverityModels,
  makeSelectEmployees,
};
