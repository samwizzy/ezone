import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the applications state domain
 */

const selectApplicationsDomain = state => state.applications || initialState;

const makeSelectApplicationsPage = () =>
  createSelector(
    selectApplicationsDomain,
    subState => subState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectApplicationsDomain,
    subState => subState.loading,
  );

const makeSelectModules = () =>
  createSelector(
    selectApplicationsDomain,
    subState => subState.applications,
  );

export default makeSelectApplicationsPage;
export { selectApplicationsDomain, makeSelectLoading, makeSelectModules };
