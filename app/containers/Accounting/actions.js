/*
 *
 * Accounting actions
 *
 */

import * as Constants from './constants';

export function openNewAccountDialog() {
  return {
    type: Constants.OPEN_NEW_ACCOUNT_DIALOG,
  };
}

export function closeNewAccountDialog() {
  return {
    type: Constants.CLOSE_NEW_ACCOUNT_DIALOG,
  };
}