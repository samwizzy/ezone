/*********************************************** */ AuthenticatorAssertionResponse;
/*
 *
 * Banking actions
 *
 */

import * as Constants from './constants';

// Get bank account
export const getGeneralJournalSuccesAction = () => {
  return {
    type: Constants.GET_GENERAL_JOURNAL_SUCCES_ACTION,
    payload: data,
  };
};
export function getGeneralJournalErrorAction(data) {
  return {
    type: Constants.GET_GENERAL_JOURNAL_ERR,
    payload: data,
  };
}
