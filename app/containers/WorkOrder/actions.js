/*
 *
 * WorkOrderPage actions
 *
 */

import * as Constants from './constants';

// Open new workorder dialog
export function openCreateWorkOrderDialog() {
  return {
    type: Constants.OPEN_NEW_WORKORDER_DIALOG,
  };
}

export function closeCreateWorkOrderDialog() {
  return {
    type: Constants.CLOSE_NEW_WORKORDER_DIALOG,
  };
}

// Edit workorder dialog
export function editOpenWorkOrderDialog(data) {
  return {
    type: Constants.EDIT_OPEN_WORKORDER_DIALOG,
    payload: data,
  };
}

export function editCloseWorkOrderDialog() {
  return {
    type: Constants.EDIT_CLOSE_WORKORDER_DIALOG,
  };
}

export function openVendorDialog() {
  return {
    type: Constants.OPEN_VENDOR_DIALOG,
  };
}

export function closeVendorDialog() {
  return {
    type: Constants.CLOSE_VENDOR_DIALOG,
  };
}

export function openAddItemDialog() {
  return {
    type: Constants.OPEN_ADDITEM_DIALOG,
  };
}

export function closeAddItemDialog() {
  return {
    type: Constants.CLOSE_ADDITEM_DIALOG,
  };
}


export function saveAddItemContents(data) {
  return {
    type: Constants.SAVE_ADDITEM_DIALOG_CONTENTS,
    payload: data,
  };
}

// Save vendor details actions
export function saveVendorConfigAction(data) {
  return {
    type: Constants.SAVE_VENDOR_CONFIG,
    payload: data,
  };
}
export function saveVendorConfigSuccessAction(data) {
  return {
    type: Constants.SAVE_VENDOR_CONFIG_SUCCESS,
    payload: data,
  };
}
export function saveVendorConfigErrorAction(data) {
  return {
    type: Constants.SAVE_VENDOR_CONFIG_ERR,
    payload: data,
  };
}

// Save worker actions
export function saveWorkOrderAction(data) {
  return {
    type: Constants.SAVE_WORKORDER,
    payload: data,
  };
}
export function saveWorkOrderSuccessAction(data) {
  return {
    type: Constants.SAVE_WORKORDER_SUCCESS,
    payload: data,
  };
}
export function saveWorkOrderErrAction(data) {
  return {
    type: Constants.SAVE_WORKORDER_ERR,
    payload: data,
  };
}

// Update/Edit work order actions
export function updateWorkOrderAction(data) {
  return {
    type: Constants.UPDATE_WORKORDER,
    payload: data,
  };
}
export function updateWorkOrderSuccessAction(data) {
  return {
    type: Constants.UPDATE_WORKORDER_SUCCESS,
    payload: data,
  };
}
export function updateWorkOrderErrAction(data) {
  return {
    type: Constants.UPDATE_WORKORDER_ERR,
    payload: data,
  };
}

// Delete chart of account
export function deleteWorkOrderAction(data) {
  console.log('deleteWorkOrderAction triggered');
  return {
    type: Constants.DELETE_WORKORDER,
    payload: data,
  };
}

export function deleteWorkOrderSuccessAction(data) {
  return {
    type: Constants.DELETE_WORKORDER_SUCCESS,
    payload: data,
  };
}

export function deleteWorkOrderErrorAction(data) {
  return {
    type: Constants.DELETE_WORKORDER_ERR,
    payload: data,
  };
}

// Get list of all saved vendors actions
export function getAllVendorsAction() {
  return {
    type: Constants.GET_ALL_VENDORS,
  };
}
export function getAllVendorsSuccessAction(data) {
  return {
    type: Constants.GET_ALL_VENDORS_SUCCESS,
    payload: data,
  };
}
export function getAllVendorsErrorAction(data) {
  return {
    type: Constants.GET_ALL_VENDORS_ERR,
    payload: data,
  };
}


// Get list of all saved workorder actions
export function getAllWorkOrderAction() {
  return {
    type: Constants.GET_ALL_WORKORDER,
  };
}
export function getAllWorkOrderSuccessAction(data) {
  return {
    type: Constants.GET_ALL_WORKORDER_SUCCESS,
    payload: data,
  };
}
export function getAllWorkOrderErrorAction(data) {
  return {
    type: Constants.GET_ALL_WORKORDER_ERR,
    payload: data,
  };
}