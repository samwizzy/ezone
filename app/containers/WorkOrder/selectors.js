import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the workOrderPage state domain
 */

const selectWorkOrderPageDomain = state => state.workOrderPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by WorkOrderPage
 */

const makeSelectWorkOrderPage = () =>
  createSelector(
    selectWorkOrderPageDomain,
    substate => substate,
  );

const makeSelectWorkOrderDialog = () =>
  createSelector(
    selectWorkOrderPageDomain,
    substate => substate.workOrderDialog
  );

const makeSelectVendorDialog = () =>
  createSelector(
    selectWorkOrderPageDomain,
    substate => substate.vendorDialog
  );

export default makeSelectWorkOrderPage;

export { 
  selectWorkOrderPageDomain,
  makeSelectWorkOrderDialog,
  makeSelectVendorDialog
};