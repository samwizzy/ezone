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
    substate => substate.workOrderDialog,
  );

const makeSelectVendorDialog = () =>
  createSelector(
    selectWorkOrderPageDomain,
    substate => substate.vendorDialog,
  );

const makeSelectItemDialog = () =>
  createSelector(
    selectWorkOrderPageDomain,
    substate => substate.itemDialog,
  );

const makeSelectVendorPostData = () =>
  createSelector(
    selectWorkOrderPageDomain,
    substate => substate.vendorPostData,
  );

const makeSelectGetListOfVendorsData = () =>
  createSelector(
    selectWorkOrderPageDomain,
    substate => substate.getListOfVendorsData,
  );

const makeSelectGetListOfWorkOrderData = () =>
  createSelector(
    selectWorkOrderPageDomain,
    substate => substate.getListOfWorkOrderData,
  );

const makeSelectSavedItemData = () =>
  createSelector(
    selectWorkOrderPageDomain,
    substate => substate.savedItemData,
  );

const makeSelectSavedItemStore = () =>
  createSelector(
    selectWorkOrderPageDomain,
    substate => substate.savedItemStore,
  );

const makeSelectWorkOrderPostData = () =>
  createSelector(
    selectWorkOrderPageDomain,
    substate => substate.workOrderPostData,
  );

const makeSelectLoading = () =>
  createSelector(
    selectWorkOrderPageDomain,
    subState => subState.loading,
  );

export default makeSelectWorkOrderPage;

export {
  makeSelectLoading,
  selectWorkOrderPageDomain,
  makeSelectWorkOrderDialog,
  makeSelectVendorDialog,
  makeSelectItemDialog,
  makeSelectVendorPostData,
  makeSelectGetListOfVendorsData,
  makeSelectSavedItemData,
  makeSelectSavedItemStore,
  makeSelectWorkOrderPostData,
  makeSelectGetListOfWorkOrderData,
};
