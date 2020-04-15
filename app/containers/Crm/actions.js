/*
 *
 * Crm actions
 *
 */

import * as Constants from './constants';

export function openNewContactDialog() {
  return {
    type: Constants.OPEN_NEW_CONTACT_DIALOG,
  };
}

export function closeNewContactDialog() {
  return {
    type: Constants.CLOSE_NEW_CONTACT_DIALOG,
  };
}
