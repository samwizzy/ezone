import * as Constants from './constants';

// Chart dialog operations (Open new)
export function openNewAccountDialog() {
  return {
    type: Constants.OPEN_NEW_ACCOUNT_DIALOG,
  };
}

export function closeNewAccountDialog() {
  return {
    type: Constants.CLOSE_NEW_ACCOUNT_DIALOG,
  };
}

// Chart dialog operations (Edit)
export function editOpenAccountDialog(data) {
  return {
    type: Constants.EDIT_OPEN_ACCOUNT_DIALOG,
    payload: data,
  };
}

export function editCloseAccountDialog() {
  return {
    type: Constants.EDIT_CLOSE_ACCOUNT_DIALOG,
  };
}

// Get account types 
export function getAccountTypes() {
  return {
    type: Constants.GET_ALL_ACCOUNT_TYPES,
  };
}

export function getAccountTypesSuccess(data) {
  return {
    type: Constants.GET_ALL_ACCOUNT_TYPES_SUCCESS,
    payload: data,
  };
}

export function getAccountTypesError(data) {
  return {
    type: Constants.GET_ALL_ACCOUNT_TYPES_ERR,
    payload: data,
  };
}
// Get accounting periods 
export function getAccountingPeriods() {
  return {
    type: Constants.GET_ACCOUNTING_PERIODS,
  }
}

export function getAccountingPeriodsSuccess(data) {
  return {
    type: Constants.GET_ACCOUNTING_PERIODS_SUCCESS,
    payload: data,
  }
}

export function getAccountingPeriodsError(data) {
  return {
    type: Constants.GET_ACCOUNTING_PERIODS_ERROR,
    payload: data,
  }
}

// Get parent account types 
export function getParentAccountType(data) {
  return {
    type: Constants.GET_PARENT_ACCOUNT_TYPES,
    payload: data,
  }
}

export function getParentAccountTypeSuccess(data) {
  return {
    type: Constants.GET_PARENT_ACCOUNT_TYPES_SUCCESS,
    payload: data,
  }
}

export function getParentAccountTypeError(data) {
  return {
    type: Constants.GET_PARENT_ACCOUNT_TYPES_ERR,
    payload: data,
  }
}


// Create new chart of account
export function createChartOfAccount(data) {
  return {
    type: Constants.CREATE_NEW_CHART_OF_ACCOUNT,
    payload: data,
  };
}

export function createChartOfAccountSuccess(data) {
  return {
    type: Constants.CREATE_NEW_CHART_OF_ACCOUNT_SUCCESS,
    payload: data,
  };
}

export function createChartOfAccountError(data) {
  return {
    type: Constants.CREATE_NEW_CHART_OF_ACCOUNT_ERR,
    payload: data,
  };
}

// Get all chart of accounts types
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
// Get all chart of account by id
export function getChartOfAccountById(data) {
  return {
    type: Constants.GET_CHART_OF_ACCOUNT_BY_ID,
    payload: { id: data }
  }
}

export function getChartOfAccountByIdSuccess(data) {
  return {
    type: Constants.GET_CHART_OF_ACCOUNT_BY_ID_SUCCESS,
    payload: data,
  }
}

export function getChartOfAccountByIdError(data) {
  return {
    type: Constants.GET_CHART_OF_ACCOUNT_BY_ID_ERROR,
    payload: data,
  }
}


// Delete a chart of account
export function deleteChartOfAccount(data) {
  return {
    type: Constants.DELETE_CHART_OF_ACCOUNT,
    payload: data,
  };
}

export function deleteChartOfAccountSuccess(data) {
  return {
    type: Constants.DELETE_CHART_OF_ACCOUNT_SUCCESS,
    payload: data,
  };
}

export function deleteChartOfAccountError(data) {
  return {
    type: Constants.DELETE_CHART_OF_ACCOUNT_ERR,
    payload: data,
  };
}


// Update a chart of account
export function updateChartOfAccount(data) {
  return {
    type: Constants.UPDATE_CHART_OF_ACCOUNT,
    payload: data,
  };
}

export function updateChartOfAccountSuccess(data) {
  return {
    type: Constants.UPDATE_CHART_OF_ACCOUNT_SUCCESS,
    payload: data,
  };
}

export function updateChartOfAccountError(data) {
  return {
    type: Constants.UPDATE_CHART_OF_ACCOUNT_ERR,
    payload: data,
  };
}


// Confirm delete dialog
export function openDeleteAccountDialog(data) {
  return {
    type: Constants.OPEN_DELETE_ACCOUNT_DIALOG,
    payload: data,
  };
}

export function closeDeleteAccountDialog() {
  return {
    type: Constants.CLOSE_DELETE_ACCOUNT_DIALOG,
  };
}