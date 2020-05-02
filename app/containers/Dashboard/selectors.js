import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboard state domain
 */

const selectDashboardDomain = state => state.dashboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by dashboard
 */

const makeSelectDashboardPage = () =>
  createSelector(
    selectDashboardDomain,
    subState => subState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectDashboardDomain,
    subState => subState.loading,
  );

export default makeSelectDashboardPage;
export {
  selectDashboardDomain,
  makeSelectLoading,
};
