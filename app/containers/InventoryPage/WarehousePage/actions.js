/*
 *
 * WarehousePage actions
 *
 */

import * as Constants from './constants';

export function openNewWarehouseDialog() {
  console.log('yes come to action');
  return {
    type: Constants.OPEN_NEW_WAREHOUSE_DIALOG,
  };
}

export function closeNewWarehouseDialog() {
  return {
    type: Constants.CLOSE_NEW_WAREHOUSE_DIALOG,
  };
}
