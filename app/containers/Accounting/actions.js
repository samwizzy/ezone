/*
 *
 * Accounting actions
 *
 */

import * as Constants from './constants';


// Account dialog operations (Edit)
// export function editOpenAccountDialog(data) {
//   return {
//     type: Constants.EDIT_OPEN_ACCOUNT_DIALOG,
//     payload: data,
//   };
// }

// export function editCloseAccountDialog() {
//   return {
//     type: Constants.EDIT_CLOSE_ACCOUNT_DIALOG,
//   };
// }

// Get account types 
// export function getAllAccountTypeAction() {
//   return {
//     type: Constants.GET_ALL_ACCOUNT_TYPES,
//   };
// }

// export function getAllAccountTypeSuccessAction(data) {
//   return {
//     type: Constants.GET_ALL_ACCOUNT_TYPES_SUCCESS,
//     payload: data,
//   };
// }

// export function getAllAccountTypeErrorAction(data) {
//   return {
//     type: Constants.GET_ALL_ACCOUNT_TYPES_ERR,
//     payload: data,
//   };
// }

// Get detail type
// export function getDetailTypeAction(data) {
//   return {
//     type: Constants.GET_DETAIL_TYPES,
//     payload: data,
//   };
// }

// export function getDetailTypeSuccessAction(data) {
//   return {
//     type: Constants.GET_DETAIL_TYPES_SUCCESS,
//     payload: data,
//   };
// }

// export function getDetailTypeErrorAction(data) {
//   return {
//     type: Constants.GET_DETAIL_TYPES_ERR,
//     payload: data,
//   };
// }

// Create new chart of account
// export function createNewChartOfAccountAction(data) {
//   return {
//     type: Constants.CREATE_NEW_CHART_OF_ACCOUNT,
//     payload: data,
//   };
// }

// export function createNewChartOfAccountSuccessAction(data) {
//   return {
//     type: Constants.CREATE_NEW_CHART_OF_ACCOUNT_SUCCESS,
//     payload: data,
//   };
// }

// export function createNewChartOfAccountErrorAction(data) {
//   return {
//     type: Constants.CREATE_NEW_CHART_OF_ACCOUNT_ERR,
//     payload: data,
//   };
// }

// Update chart of account
export function updateChartOfAccountAction(data) {
  console.log('updateChartOfAccountAction triggered');
  return {
    type: Constants.UPDATE_CHART_OF_ACCOUNT,
    payload: data,
  };
}

export function updateChartOfAccountSuccessAction(data) {
  return {
    type: Constants.UPDATE_CHART_OF_ACCOUNT_SUCCESS,
    payload: data,
  };
}

export function updateChartOfAccountErrorAction(data) {
  return {
    type: Constants.UPDATE_CHART_OF_ACCOUNT_ERR,
    payload: data,
  };
}

// Delete chart of account
// export function deleteChartOfAccountAction(data) {
//   return {
//     type: Constants.DELETE_CHART_OF_ACCOUNT,
//     payload: data,
//   };
// }

// export function deleteChartOfAccountSuccessAction(data) {
//   return {
//     type: Constants.DELETE_CHART_OF_ACCOUNT_SUCCESS,
//     payload: data,
//   };
// }

// export function deleteChartOfAccountErrorAction(data) {
//   return {
//     type: Constants.DELETE_CHART_OF_ACCOUNT_ERR,
//     payload: data,
//   };
// }


// Get all chart of account 
// export function getAllChartOfAccountTypeAction() {
//   console.log('getAllChartOfAccountTypeAction');
//   return {
//     type: Constants.GET_ALL_CHART_OF_ACCOUNT,
//   };
// }

// export function getAllChartOfAccountTypeSuccessAction(data) {
//   return {
//     type: Constants.GET_ALL_CHART_OF_ACCOUNT_SUCCESS,
//     payload: data,
//   };
// }

// export function getAllChartOfAccountTypeErrorAction(data) {
//   return {
//     type: Constants.GET_ALL_CHART_OF_ACCOUNT_ERR,
//     payload: data,
//   };
// }


// Get accounting setup
export function getAccountingSetupAction() {
  return {
    type: Constants.GET_ACCOUNTING_SETUP,
  };
}

export function getAccountingSetupSuccessAction(data) {
  return {
    type: Constants.GET_ACCOUNTING_SETUP_SUCCESS,
    payload: data,
  };
}

export function getAccountingSetupErrorAction(data) {
  return {
    type: Constants.GET_ACCOUNTING_SETUP_ERR,
    payload: data,
  };
}

// Create accounting setup
export function createAccountingSetupAction(data) {
  return {
    type: Constants.CREATE_ACCOUNTING_SETUP,
    payload: data,
  };
}

export function createAccountingSetupSuccessAction(data) {
  return {
    type: Constants.CREATE_ACCOUNTING_SETUP_SUCCESS,
    payload: data,
  };
}

export function createAccountingSetupErrorAction(data) {
  return {
    type: Constants.CREATE_ACCOUNTING_SETUP_ERR,
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
  console.log('createNewAccountJournalAction ', data);
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