import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboard state domain
 */

const selectDashboardDomain = state => state.dashboard || initialState;

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

const makeSelectStats = () =>
  createSelector(
    selectDashboardDomain,
    subState => subState.stats,
  );

export default makeSelectDashboardPage;
export {
  selectDashboardDomain,
  makeSelectLoading,
  makeSelectStats
};
