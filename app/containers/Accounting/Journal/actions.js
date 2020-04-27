/*
 *
 * Journal actions
 *
 */

import * as Constants from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

// Get all chart of accounts
export function getAllChartOfAccountTypeAction() {
  return {
    type: Constants.GET_ALL_CHART_OF_ACCOUNT,
  };
}

export function getAllChartOfAccountTypeSuccessAction(data) {
  return {
    type: Constants.GET_ALL_CHART_OF_ACCOUNT_SUCCESS,
    payload: data,
  };
}

export function getAllChartOfAccountTypeErrorAction(data) {
  return {
    type: Constants.GET_ALL_CHART_OF_ACCOUNT_ERR,
    payload: data,
  };
}

// Get accounting period
export function getAccountPeriodAction() {
  return {
    type: Constants.GET_ACCOUNT_PERIOD,
  };
}

export function getAccountPeriodSuccessAction(data) {
  return {
    type: Constants.GET_ACCOUNT_PERIOD_SUCCESS,
    payload: data,
  };
}

export function getAccountPeriodErrorAction(data) {
  return {
    type: Constants.GET_ACCOUNT_PERIOD_ERR,
    payload: data,
  };
}


// Create new account journal
export function createNewAccountJournalAction(data) {
  console.log('createNewAccountJournalAction triggered');
  return {
    type: Constants.CREATE_NEW_ACCOUNT_JOURNAL,
    payload: data,
  };
}

export function createNewAccountJournalSuccessAction(data) {
  return {
    type: Constants.CREATE_NEW_ACCOUNT_JOURNAL_SUCCESS,
    payload: data,
  };
}

export function createNewAccountJournalErrorAction(data) {
  return {
    type: Constants.CREATE_NEW_ACCOUNT_JOURNAL_ERR,
    payload: data,
  };
}

// Get accounting period
export function getJournalListAction() {
  console.log('getJournalListAction triggered');
  return {
    type: Constants.GET_JOURNAL_LIST,
  };
}

export function getJournalListSuccessAction(data) {
  return {
    type: Constants.GET_JOURNAL_LIST_SUCCESS,
    payload: data,
  };
}

export function getJournalListErrorAction(data) {
  return {
    type: Constants.GET_JOURNAL_LIST_ERR,
    payload: data,
  };
}