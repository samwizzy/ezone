import * as Constants from './constants';

export function getAccountingSetupAction() {
  return {
    type: Constants.GET_ACCOUNTING_SETUP,
  }
}

export function getAccountingSetupSuccessAction(data) {
  return {
    type: Constants.GET_ACCOUNTING_SETUP_SUCCESS,
    payload: data,
  }
}

export function getAccountingSetupErrorAction(data) {
  return {
    type: Constants.GET_ACCOUNTING_SETUP_ERR,
    payload: data,
  }
}


