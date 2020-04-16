import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the chart state domain
 */

const selectChartDomain = state => state.chart || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Chart
 */

const makeSelectAccounting = () =>
  createSelector(
    selectChartDomain,
    substate => substate,
  );

const makeSelectNewAccountDialog = () =>
  createSelector(
    selectChartDomain,
    substate => substate.accountDialog,
  );

const makeSelectLoading = () =>
  createSelector(
    selectChartDomain,
    subState => subState.loading,
  );


export default makeSelectAccounting;


export { 
  selectChartDomain,
  makeSelectLoading,
  makeSelectNewAccountDialog,
};
