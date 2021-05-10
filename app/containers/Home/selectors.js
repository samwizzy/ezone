import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the home state domain
 */

const selectHomeDomain = state => state.home || initialState;

const makeSelectHomePage = () =>
  createSelector(
    selectHomeDomain,
    subState => subState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectHomeDomain,
    subState => subState.loading,
  );

const makeSelectApplications = () =>
  createSelector(
    selectHomeDomain,
    subState => subState.applications,
  );

export default makeSelectHomePage;
export { selectHomeDomain, makeSelectLoading, makeSelectApplications };
