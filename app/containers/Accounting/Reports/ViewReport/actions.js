/*********************************************** */ AuthenticatorAssertionResponse;
/*
 *
 * Reports actions
 *
 */

import * as Constants from './constants';

// Get bank account
export function getGeneralJournalSuccesAction(data) {
  return {
    type: Constants.GET_GENERAL_JOURNAL_SUCCES_ACTION,
    payload: data,
  };
}
export function getGeneralJournalErrorAction(data) {
  return {
    type: Constants.GET_GENERAL_JOURNAL_ERR,
    payload: data,
  };
}
// Get account types
export function getAllGeneralJournalTypeAction() {
  return {
    type: Constants.GET_ALL_GENERAL_JOURNAL_TYPES,
  };
}

export function cleanUpGeneralJournalAction() {
  return {
    type: Constants.CLEAN_UP_GENERAL_JOURNAL_TYPES,
  };
}

export function getGeneralJournalTimeAction(data) {
  return {
    type: Constants.GET_GENERAL_JOURNAL_TIME,
    payload: data,
  };
}
// Get all chats of account types
export function getAllChatsOfAccountTypeAction() {
  return {
    type: Constants.GET_ALL_CHATS_OF_ACCOUNT_TYPES,
  };
}

export function getChatsOfAccountSuccesAction(data) {
  return {
    type: Constants.GET_CHATS_OF_ACCOUNTS_SUCCES_ACTION,
    payload: data,
  };
}

export function getChatsOfAccountErrorAction(data) {
  return {
    type: Constants.GET_CHATS_OF_ACCOUNTS_ERR,
    payload: data,
  };
}

// Get all general ledger actions
export function getAllGeneralLedgerAction() {
  return {
    type: Constants.GET_ALL_GENERAL_LEDGER_TYPES,
  };
}
export function getGeneralLedgerSuccesAction(data) {
  return {
    type: Constants.GET_GENERAL_LEDGER_SUCCES_ACTION,
    payload: data,
  };
}

export function getGeneralLedgerErrorAction(data) {
  return {
    type: Constants.GET_GENERAL_LEDGER_ERR,
    payload: data,
  };
}

/**Get Trial balance */

export function getAllTrialBalanceAction() {
  return {
    type: Constants.GET_ALL_TRIAL_BALANCE_TYPES,
  };
}
export function getTrialBalanceSuccesAction(data) {
  return {
    type: Constants.GET_TRIAL_BALANCE_SUCCES_ACTION,
    payload: data,
  };
}

export function getTrialBalanceErrorAction(data) {
  return {
    type: Constants.GET_TRIAL_BALANCE_ERR,
    payload: data,
  };
}
