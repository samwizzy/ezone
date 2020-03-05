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
  console.log('openVendorDialog action');
  return {
    type: Constants.OPEN_VENDOR_DIALOG,
  };
}

export function closeVendorDialog() {
  return {
    type: Constants.CLOSE_VENDOR_DIALOG,
  };
}
