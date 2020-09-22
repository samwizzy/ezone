import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the itemPage state domain
 */

const selectItemPageDomain = state => state.itemPage || initialState;

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

const makeSelectMessage = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.message,
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

const makeSelectItemGroupDialog = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.itemGroupDialog,
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

const makeSelectGetAllTransferOrder = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.transferOrders,
  );

const makeSelectGetTransferOrderById = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.transferOrderById,
  );

const makeSelectGetAccounts = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.accounts,
  );

const makeSelectGetVendors = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.vendors,
  );

const makeSelectGetAllItems = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.items,
  );

const makeSelectGetAllItemsGroups = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.itemsGroups,
  );

const makeSelectGetAllItemsGroupById = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.itemsGroup,
  );

const makeSelectGetAllWarehouses = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.warehouses,
  );

const makeSelectInventoryAdjustDialog = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.inventoryAdjustDialog,
  );

const makeSelectGetAllInventoryAdjustments = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.inventoryAdjustments,
  );

const makeSelectGetAllItemsPerWarehouse = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.itemsPerWarehouse,
  );

const makeSelectGetItemById = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.itemById,
  );

const makeSelectGetInventoryAdjustedById = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.inventoryAdjustedById,
  );

const makeSelectGetStockLocationBySku = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.stockLocationBySku,
  );


export default makeSelectItemPage;
export {
  selectItemPageDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectMessage,
  makeSelectGetAccounts,
  makeSelectGetVendors,
  makeSelectGetAllItems,
  makeSelectGetItemById,
  makeSelectItemDialog,
  makeSelectGetAllItemsGroups,
  makeSelectGetAllItemsGroupById,
  makeSelectItemGroupDialog,
  makeSelectGetAllWarehouses,
  makeSelectTransferOrderDialog,
  makeSelectViewItemDialog,
  makeSelectGetAllTransferOrder,
  makeSelectGetTransferOrderById,
  makeSelectInventoryAdjustDialog,
  makeSelectGetAllInventoryAdjustments,
  makeSelectGetAllItemsPerWarehouse,
  makeSelectGetStockLocationBySku,
  makeSelectGetInventoryAdjustedById,
};
