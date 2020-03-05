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


// Get list of all saved vendors
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