import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the accounting state domain
 */

const selectAccountingDomain = state => state.accounting || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Accounting
 */

const makeSelectAccounting = () =>
  createSelector(
    selectAccountingDomain,
    substate => substate,
  );

const makeSelectNewAccountDialog = () =>
  createSelector(
    selectWorkOrderPageDomain,
    substate => substate.accountDialog,
  );

const makeSelectLoading = () =>
  createSelector(
    selectWorkOrderPageDomain,
    subState => subState.loading,
  );

export default makeSelectAccounting;

export { 
  selectAccountingDomain,
  makeSelectLoading,
  makeSelectNewAccountDialog 
};
