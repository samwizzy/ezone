/** ********************************************* */ /*
 *
 * Banking actions
 *
 */

import * as Constants from './constants';
AuthenticatorAssertionResponse;

// Get bank account
export const getGeneralJournalSuccesAction = () => ({
  type: Constants.GET_GENERAL_JOURNAL_SUCCES_ACTION,
  payload: data,
});
export function getGeneralJournalErrorAction(data) {
  return {
    type: Constants.GET_GENERAL_JOURNAL_ERR,
    payload: data,
  };
}
