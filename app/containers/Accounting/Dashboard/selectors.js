import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the accounting state domain
 */

const selectDashboardDomain = state => state.dashboard || initialState;

const makeSelectDashboard = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectDashboardDomain,
    subState => subState.loading,
  );

const makeSelectChartofAccountsRange = () =>
  createSelector(
    selectDashboardDomain,
    subState => subState.accountsRange,
  );

export default makeSelectDashboard;

export {
  selectDashboardDomain,
  makeSelectLoading,
  makeSelectChartofAccountsRange,
};
