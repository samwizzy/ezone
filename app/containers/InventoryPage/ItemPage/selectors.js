import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the itemPage state domain
 */

const selectItemPageDomain = state => state.itemPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ItemPage
 */

const makeSelectItemPage = () =>
  createSelector(
    selectItemPageDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.error,
  );

const makeSelectItemDialog = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.itemDialog,
  );

const makeSelectViewItemDialog = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.viewItemDialog,
  );

const makeSelectTransferOrderDialog = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.transferOrderDialog,
  );

const makeSelectTransferOrderDetails = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.newTransferOrderDetails,
  );

const makeSelectGetAllTransferOrder = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.getAllTransferOrder,
  );

const makeSelectGetAllItems = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.getAllItems,
  );

const makeSelectItemDetails = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.newItemDetails,
  );

const makeSelectGetAllWarehouses = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.getAllWarehouses,
  );

const makeSelectInventoryAdjustDialog = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.inventoryAdjustDialog,
  );

const makeSelectInventoryAdjustmentDetails = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.newInventoryAdjustmentDetails,
  );

const makeSelectGetAllInventoryAdjustments = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.getAllInventoryAdjustments,
  );

export default makeSelectItemPage;
export {
  selectItemPageDomain,
  makeSelectGetAllItems,
  makeSelectItemDetails,
  makeSelectItemDialog,
  makeSelectLoading,
  makeSelectError,
  makeSelectGetAllWarehouses,
  makeSelectTransferOrderDialog,
  makeSelectTransferOrderDetails,
  makeSelectViewItemDialog,
  makeSelectGetAllTransferOrder,
  makeSelectInventoryAdjustDialog,
  makeSelectInventoryAdjustmentDetails,
  makeSelectGetAllInventoryAdjustments,
};
