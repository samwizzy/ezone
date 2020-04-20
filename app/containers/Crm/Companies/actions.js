/*
 *
 * Crm Company actions
 *
 */

import * as Constants from './constants';

export function openNewCompanyDialog() {
  return {
    type: Constants.OPEN_NEW_COMPANY_DIALOG,
  };
}

export function closeNewCompanyDialog() {
  return {
    type: Constants.CLOSE_NEW_COMPANY_DIALOG,
  };
}
