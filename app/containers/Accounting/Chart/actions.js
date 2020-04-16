/*
 *
 * Chart actions
 *
 */

import * as Constants from './constants';

// Account dialog operations (Open new)
export function openNewAccountDialog() {
  console.log('openNewAccountDialog from chart module');
  return {
    type: Constants.OPEN_NEW_ACCOUNT_DIALOG,
  };
}

export function closeNewAccountDialog() {
  return {
    type: Constants.CLOSE_NEW_ACCOUNT_DIALOG,
  };
}
