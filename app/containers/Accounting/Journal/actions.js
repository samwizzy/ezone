import * as Constants from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function openNewJournalDialog() {
  return {
    type: Constants.OPEN_NEW_JOURNAL_DIALOG,
  };
}

export function closeNewJournalDialog() {
  return {
    type: Constants.CLOSE_NEW_JOURNAL_DIALOG,
  };
}

// Edit Journal dialog
export function openEditJournalDialog(data) {
  return {
    type: Constants.OPEN_EDIT_JOURNAL_DIALOG,
    payload: data,
  };
}

export function closeEditJournalDialog() {
  return {
    type: Constants.CLOSE_EDIT_JOURNAL_DIALOG,
  };
}

// Get all chart of accounts
export function getChartOfAccounts() {
  return {
    type: Constants.GET_ALL_CHART_OF_ACCOUNT,
  };
}

export function getChartOfAccountsSuccess(data) {
  return {
    type: Constants.GET_ALL_CHART_OF_ACCOUNT_SUCCESS,
    payload: data,
  };
}

export function getChartOfAccountsError(data) {
  return {
    type: Constants.GET_ALL_CHART_OF_ACCOUNT_ERR,
    payload: data,
  };
}

// Get accounting periods
export function getAccountingPeriods() {
  return {
    type: Constants.GET_ACCOUNT_PERIOD,
  };
}

export function getAccountingPeriodsSuccess(data) {
  return {
    type: Constants.GET_ACCOUNT_PERIOD_SUCCESS,
    payload: data,
  };
}

export function getAccountingPeriodsError(data) {
  return {
    type: Constants.GET_ACCOUNT_PERIOD_ERR,
    payload: data,
  };
}

// Get currencies
export function getCurrencies() {
  return {
    type: Constants.GET_CURRENCIES,
  };
}

export function getCurrenciesSuccess(data) {
  return {
    type: Constants.GET_CURRENCIES_SUCCESS,
    payload: data,
  };
}

export function getCurrenciesError(data) {
  return {
    type: Constants.GET_CURRENCIES_ERROR,
    payload: data,
  };
}

// Create new account journal
export function createJournal(data) {
  return {
    type: Constants.CREATE_NEW_ACCOUNT_JOURNAL,
    payload: data,
  };
}

export function createJournalSuccess(data) {
  return {
    type: Constants.CREATE_NEW_ACCOUNT_JOURNAL_SUCCESS,
    payload: data,
  };
}

export function createJournalError(data) {
  return {
    type: Constants.CREATE_NEW_ACCOUNT_JOURNAL_ERR,
    payload: data,
  };
}

export function getJournalList() {
  return {
    type: Constants.GET_JOURNAL_LIST,
  };
}

export function getJournalListSuccess(data) {
  return {
    type: Constants.GET_JOURNAL_LIST_SUCCESS,
    payload: data,
  };
}

export function getJournalListError(data) {
  return {
    type: Constants.GET_JOURNAL_LIST_ERR,
    payload: data,
  };
}
