/*
 *
 * WorkOrderPage actions
 *
 */

import * as Constants from './constants';

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
  console.log('action come here');
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

// Save vendor details
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


export function saveWorkOrderAction(data) {
  console.log('saveWorkOrderAction');
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

// Get list of all saved vendors
export function getAllVendorsAction() {
  console.log('getAllVendorsAction');
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


// Get list of all saved workorder
export function getAllWorkOrderAction() {
  console.log('getAllWorkOrderAction');
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