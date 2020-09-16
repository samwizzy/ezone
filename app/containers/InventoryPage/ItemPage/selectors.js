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
    subState => subState.getAllItems,
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

const makeSelectGetAllItemsPerWarehouse = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.itemsPerWarehouse,
  );

const makeSelectGetAllItemsPerWarehouseUuid = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.getAllItemsPerWarehouseUuid,
  );

const makeSelectGetItemById = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.getItemById,
  );

const makeSelectGetInventoryAdjustById = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.getInventoryAdjustById,
  );

const makeSelectGetItemByIdResponse = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.getItemByIdResponse,
  );

const makeSelectGetInventoryAdjustByIdResponse = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.getInventoryAdjustByIdResponse,
  );

const makeSelectGetStockLocationBySku = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.getStockLocationBySku,
  );

const makeSelectGetStockLocationBySkuResponse = () =>
  createSelector(
    selectItemPageDomain,
    subState => subState.getStockLocationBySkuResponse,
  );

export default makeSelectItemPage;
export {
  selectItemPageDomain,
  makeSelectGetAccounts,
  makeSelectGetVendors,
  makeSelectGetAllItems,
  makeSelectGetAllItemsGroups,
  makeSelectGetAllItemsGroupById,
  makeSelectItemDetails,
  makeSelectItemDialog,
  makeSelectItemGroupDialog,
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
  makeSelectMessage,
  makeSelectGetAllItemsPerWarehouse,
  makeSelectGetAllItemsPerWarehouseUuid,
  makeSelectGetItemById,
  makeSelectGetItemByIdResponse,
  makeSelectGetStockLocationBySku,
  makeSelectGetStockLocationBySkuResponse,
  makeSelectGetInventoryAdjustByIdResponse,
  makeSelectGetInventoryAdjustById,
};
