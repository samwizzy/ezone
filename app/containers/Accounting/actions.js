/*
 *
 * Accounting actions
 *
 */

import * as Constants from './constants';

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

// Get account types 
export function getAllAccountTypeAction() {
  return {
    type: Constants.GET_ALL_ACCOUNT_TYPES,
  };
}

export function getAllAccountTypeSuccessAction(data) {
  return {
    type: Constants.GET_ALL_ACCOUNT_TYPES_SUCCESS,
    payload: data,
  };
}

export function getAllAccountTypeErrorAction(data) {
  return {
    type: Constants.GET_ALL_ACCOUNT_TYPES_ERR,
    payload: data,
  };
}

// Get detail type
export function getDetailTypeAction(data) {
  console.log('getDetailTypeAction');
  return {
    type: Constants.GET_DETAIL_TYPES,
    payload: data,
  };
}

export function getDetailTypeSuccessAction(data) {
  console.log('getDetailTypeSuccessAction');
  return {
    type: Constants.GET_DETAIL_TYPES_SUCCESS,
    payload: data,
  };
}

export function getDetailTypeErrorAction(data) {
  return {
    type: Constants.GET_DETAIL_TYPES_ERR,
    payload: data,
  };
}