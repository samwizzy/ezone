import * as Constants from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

// Get accounting setup data
export function getAccountingSetup() {
  return {
    type: Constants.GET_ACCOUNTING_SETUP,
  }
}

export function getAccountingSetupSuccess(data) {
  return {
    type: Constants.GET_ACCOUNTING_SETUP_SUCCESS,
    payload: data,
  }
}

export function getAccountingSetupError(data) {
  return {
    type: Constants.GET_ACCOUNTING_SETUP_ERROR,
    payload: data,
  }
}

export function getTaxes() {
  return {
    type: Constants.GET_TAXES,
  }
}

export function getTaxesSuccess(data) {
  return {
    type: Constants.GET_TAXES_SUCCESS,
    payload: data,
  }
}

export function getTaxesError(data) {
  return {
    type: Constants.GET_TAXES_ERROR,
    payload: data,
  }
}

// create tax action
export function createTax(data) {
  return {
    type: Constants.CREATE_TAX,
    payload: data,
  };
}

export function createTaxSuccess(data) {
  return {
    type: Constants.CREATE_TAX_SUCCESS,
    payload: data,
  };
}

export function createTaxError(data) {
  return {
    type: Constants.CREATE_TAX_ERROR,
    payload: data,
  };
}

// Open tax dialog
export function openNewTaxDialog() {
  return {
    type: Constants.OPEN_NEW_TAX_DIALOG,
  };
}

export function closeNewTaxDialog() {
  return {
    type: Constants.CLOSE_NEW_TAX_DIALOG,
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
  }
}

export function getJournalById(data) {
  return {
    type: Constants.GET_JOURNAL_BY_ID,
    payload: { id: data }
  }
}

export function getJournalByIdSuccess(data) {
  return {
    type: Constants.GET_JOURNAL_BY_ID_SUCCESS,
    payload: data,
  }
}

export function getJournalByIdError(data) {
  return {
    type: Constants.GET_JOURNAL_BY_ID_ERROR,
    payload: data,
  }
}
