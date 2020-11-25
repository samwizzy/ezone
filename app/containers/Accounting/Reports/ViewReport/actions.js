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

/**Get FIxed Asset Register */
export function getAllFixedAssetRegisterAction() {
  return {
    type: Constants.GET_ALL_FIXED_ASSET_REGISTER_TYPES,
  };
}
export function getFixedAssetRegisterSuccesAction(data) {
  return {
    type: Constants.GET_FIXED_ASSET_REGISTER_SUCCES_ACTION,
    payload: data,
  };
}

export function getFixedAssetRegisterErrorAction(data) {
  return {
    type: Constants.GET_FIXED_ASSET_REGISTER_ERR,
    payload: data,
  };
}

export function getFixedAssetRegisterRangeAction(data) {
  return {
    type: Constants.GET_FIXED_ASSET_REGISTER_RANGE,
    payload: data,
  };
}

/**Get FIxed Asset Shedules */
export function getAllFixedAssetScheduleAction() {
  return {
    type: Constants.GET_ALL_FIXED_ASSET_SCHEDULE_TYPES,
  };
}
export function getFixedAssetScheduleSuccesAction(data) {
  return {
    type: Constants.GET_FIXED_ASSET_SCHEDULE_SUCCES_ACTION,
    payload: data,
  };
}

export function getFixedAssetScheduleErrorAction(data) {
  return {
    type: Constants.GET_FIXED_ASSET_SCHEDULE_ERR,
    payload: data,
  };
}

export function getFixedAssetScheduleRangeAction(data) {
  return {
    type: Constants.GET_FIXED_ASSET_SCHEDULE_RANGE,
    payload: data,
  };
}

/**Get Income Statement */
export function getAllIncomeStatementAction() {
  return {
    type: Constants.GET_ALL_INCOME_STATEMENT_TYPES,
  };
}
export function getIncomeStatementSuccesAction(data) {
  return {
    type: Constants.GET_INCOME_STATEMENT_SUCCES_ACTION,
    payload: data,
  };
}

export function getIncomeStatementErrorAction(data) {
  return {
    type: Constants.GET_INCOME_STATEMENT_ERR,
    payload: data,
  };
}

export function getIncomeStatementRangeAction(data) {
  return {
    type: Constants.GET_INCOME_STATEMENT_RANGE,
    payload: data,
  };
}
