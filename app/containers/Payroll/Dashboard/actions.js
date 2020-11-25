/*
 *
 * Accounting actions
 *
 */

import * as Constants from './constants';

export function getAccountsRange(data) {
  return {
    type: Constants.GET_CHART_OF_ACCOUNTS_RANGE,
    payload: data
  }
}

export function getAccountsRangeSuccess(data) {
  return {
    type: Constants.GET_CHART_OF_ACCOUNTS_RANGE_SUCCESS,
    payload: data,
  }
}

export function getAccountsRangeError(data) {
  return {
    type: Constants.GET_CHART_OF_ACCOUNTS_RANGE_ERROR,
    payload: data,
  }
}
