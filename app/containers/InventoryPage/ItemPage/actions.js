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