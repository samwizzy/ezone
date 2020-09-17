/*
 *
 * ItemPage actions
 *
 */

import * as Constants from './constants';

export function openNewItemDialog() {
  return {
    type: Constants.OPEN_NEW_ITEM_DIALOG,
  };
}

export function closeNewItemDialog() {
  return {
    type: Constants.CLOSE_NEW_ITEM_DIALOG,
  };
}

export function openNewItemGroupDialog() {
  return {
    type: Constants.OPEN_NEW_ITEM_GROUP_DIALOG,
  };
}

export function closeNewItemGroupDialog() {
  return {
    type: Constants.CLOSE_NEW_ITEM_GROUP_DIALOG,
  };
}

export function openEditItemGroupDialog() {
  return {
    type: Constants.OPEN_EDIT_ITEM_GROUP_DIALOG,
  };
}

export function closeEditItemGroupDialog() {
  return {
    type: Constants.CLOSE_EDIT_ITEM_GROUP_DIALOG,
  };
}

export function openViewItemDialog(data) {
  return {
    type: Constants.OPEN_VIEW_ITEM_DIALOG,
    payload: data,
  };
}

export function closeViewItemDialog() {
  return {
    type: Constants.CLOSE_VIEW_ITEM_DIALOG,
  };
}

export function openNewTransferOrderDialog() {
  return {
    type: Constants.OPEN_NEW_TRANSFER_ORDER_DIALOG,
  };
}

export function closeNewTransferOrderDialog() {
  return {
    type: Constants.CLOSE_NEW_TRANSFER_ORDER_DIALOG,
  };
}

export function openViewTransferOrderDialog(data) {
  return {
    type: Constants.OPEN_VIEW_TRANSFER_ORDER_DIALOG,
    payload: data,
  };
}

export function closeViewTransferOrderDialog() {
  return {
    type: Constants.CLOSE_VIEW_TRANSFER_ORDER_DIALOG,
  };
}

export function getAccounts() {
  return {
    type: Constants.GET_ACCOUNTS,
  };
}

export function getAccountsSuccess(data) {
  return {
    type: Constants.GET_ACCOUNTS_SUCCESS,
    payload: data,
  };
}

export function getAccountsError(data) {
  return {
    type: Constants.GET_ACCOUNTS_ERROR,
    payload: data,
  };
}

export function getVendors() {
  return {
    type: Constants.GET_VENDORS,
  };
}

export function getVendorsSuccess(data) {
  return {
    type: Constants.GET_VENDORS_SUCCESS,
    payload: data,
  };
}

export function getVendorsError(data) {
  return {
    type: Constants.GET_VENDORS_ERROR,
    payload: data,
  };
}

export function getAllItems() {
  return {
    type: Constants.GET_ALL_ITEMS,
  };
}

export function getAllItemsSuccess(data) {
  return {
    type: Constants.GET_ALL_ITEMS_SUCCESS,
    payload: data,
  };
}

export function getAllItemsError(data) {
  return {
    type: Constants.GET_ALL_ITEMS_ERROR,
    payload: data,
  };
}

export function getItemsGroups() {
  return {
    type: Constants.GET_ITEMS_GROUPS,
  };
}

export function getItemsGroupsSuccess(data) {
  return {
    type: Constants.GET_ITEMS_GROUPS_SUCCESS,
    payload: data,
  };
}

export function getItemsGroupsError(data) {
  return {
    type: Constants.GET_ITEMS_GROUPS_ERROR,
    payload: data,
  };
}

export function getItemsGroupById(id) {
  return {
    type: Constants.GET_ITEMS_GROUP_BY_ID,
    payload: id
  };
}

export function getItemsGroupByIdSuccess(data) {
  return {
    type: Constants.GET_ITEMS_GROUP_BY_ID_SUCCESS,
    payload: data,
  };
}

export function getItemsGroupByIdError(data) {
  return {
    type: Constants.GET_ITEMS_GROUP_BY_ID_ERROR,
    payload: data,
  };
}

export function createNewItem(data) {
  return {
    type: Constants.CREATE_NEW_ITEM,
    payload: data,
  };
}

export function createNewItemSuccess(data) {
  return {
    type: Constants.CREATE_NEW_ITEM_SUCCESS,
    payload: data,
  };
}

export function createNewItemError(data) {
  return {
    type: Constants.CREATE_NEW_ITEM_ERROR,
    payload: data,
  };
}
export function createItemGroup(data) {
  return {
    type: Constants.CREATE_ITEM_GROUP,
    payload: data,
  };
}

export function createItemGroupSuccess(data) {
  return {
    type: Constants.CREATE_ITEM_GROUP_SUCCESS,
    payload: data,
  };
}

export function createItemGroupError(data) {
  return {
    type: Constants.CREATE_ITEM_GROUP_ERROR,
    payload: data,
  };
}

export function getAllWarehouse() {
  return {
    type: Constants.GET_ALL_WAREHOUSE,
  };
}

export function getAllWarehouseSuccess(data) {
  return {
    type: Constants.GET_ALL_WAREHOUSE_SUCCESS,
    payload: data,
  };
}

export function getAllWarehouseError(data) {
  return {
    type: Constants.GET_ALL_WAREHOUSE_ERROR,
    payload: data,
  };
}

export function createNewTransferOrder(data) {
  return {
    type: Constants.CREATE_NEW_TRANSFER_ORDER,
    payload: data,
  };
}

export function createNewTransferOrderSuccess(data) {
  return {
    type: Constants.CREATE_NEW_TRANSFER_ORDER_SUCCESS,
    payload: data,
  };
}

export function createNewTransferOrderError(data) {
  return {
    type: Constants.CREATE_NEW_TRANSFER_ORDER_ERROR,
    payload: data,
  };
}

export function getAllTransferOrder() {
  return {
    type: Constants.GET_ALL_TRANSFER_ORDER,
  };
}

export function getAllTransferOrderSuccess(data) {
  return {
    type: Constants.GET_ALL_TRANSFER_ORDER_SUCCESS,
    payload: data,
  };
}

export function getAllTransferOrderError(data) {
  return {
    type: Constants.GET_ALL_TRANSFER_ORDER_ERROR,
    payload: data,
  };
}

export function openNewInventoryAdjustDialog() {
  return {
    type: Constants.OPEN_INVENTORY_ADJUST_DIALOG,
  };
}

export function closeNewInventoryAdjustDialog() {
  return {
    type: Constants.CLOSE_INVENTORY_ADJUST_DIALOG,
  };
}

export function createNewInventoryAdjustment(data) {
  return {
    type: Constants.CREATE_NEW_INVENTORY_ADJUSTMENT,
    payload: data,
  };
}

export function createNewInventoryAdjustmentSuccess(data) {
  return {
    type: Constants.CREATE_NEW_INVENTORY_ADJUSTMENT_SUCCESS,
    payload: data,
  };
}

export function createNewInventoryAdjustmentError(data) {
  return {
    type: Constants.CREATE_NEW_INVENTORY_ADJUSTMENT_ERROR,
    payload: data,
  };
}

export function getAllInventoryAdjustments() {
  return {
    type: Constants.GET_ALL_INVENTORY_ADJUSTMENT,
  };
}

export function getAllInventoryAdjustmentsSuccess(data) {
  return {
    type: Constants.GET_ALL_INVENTORY_ADJUSTMENT_SUCCESS,
    payload: data,
  };
}

export function getAllInventoryAdjustmentsError(data) {
  return {
    type: Constants.GET_ALL_INVENTORY_ADJUSTMENT_ERROR,
    payload: data,
  };
}

export function getAllItemsPerWarehouse(data) {
  return {
    type: Constants.GET_ALL_ITEMS_PER_WAREHOUSE,
    payload: data,
  };
}

export function getAllItemsPerWarehouseSuccess(data) {
  return {
    type: Constants.GET_ALL_ITEMS_PER_WAREHOUSE_SUCCESS,
    payload: data,
  };
}

export function getAllItemsPerWarehouseError(data) {
  return {
    type: Constants.GET_ALL_ITEMS_PER_WAREHOUSE_ERROR,
    payload: data,
  };
}

export function getItemById(data) {
  return {
    type: Constants.GET_ITEM_BY_ID,
    payload: data,
  };
}

export function getItemByIdSuccess(data) {
  return {
    type: Constants.GET_ITEM_BY_ID_SUCCESS,
    payload: data,
  };
}

export function getItemByIdError(data) {
  return {
    type: Constants.GET_ITEM_BY_ID_ERROR,
    payload: data,
  };
}

export function getStockLocations(data) {
  return {
    type: Constants.GET_STOCK_LOCATIONS,
    payload: data,
  };
}

export function getStockLocationsSuccess(data) {
  return {
    type: Constants.GET_STOCK_LOCATIONS_SUCCESS,
    payload: data,
  };
}

export function getStockLocationsError(data) {
  return {
    type: Constants.GET_STOCK_LOCATIONS_ERROR,
    payload: data,
  };
}

export function getTransferOrderById(data) {
  return {
    type: Constants.GET_TRANSFER_ORDER_BY_ID,
    payload: data,
  };
}

export function getTransferOrderByIdSuccess(data) {
  return {
    type: Constants.GET_TRANSFER_ORDER_BY_ID_SUCCESS,
    payload: data,
  };
}

export function getTransferOrderByIdError(data) {
  return {
    type: Constants.GET_TRANSFER_ORDER_BY_ID_ERROR,
    payload: data,
  };
}

export function getInventoryAdjustById(data) {
  return {
    type: Constants.GET_INVENTORY_ADJUST_BY_ID,
    payload: data,
  };
}

export function getInventoryAdjustByIdSuccess(data) {
  return {
    type: Constants.GET_INVENTORY_ADJUST_BY_ID_SUCCESS,
    payload: data,
  };
}

export function getInventoryAdjustByIdError(data) {
  return {
    type: Constants.GET_INVENTORY_ADJUST_BY_ID_ERROR,
    payload: data,
  };
}
