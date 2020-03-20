/*
 *
 * WarehousePage actions
 *
 */

import * as Constants from './constants';

export function openNewWarehouseDialog() {
  return {
    type: Constants.OPEN_NEW_WAREHOUSE_DIALOG,
  };
}

export function closeNewWarehouseDialog() {
  return {
    type: Constants.CLOSE_NEW_WAREHOUSE_DIALOG,
  };
}

export function getAllEmployees() {
  return {
    type: Constants.GET_ALL_EMPLOYEES,
  };
}

export function getAllEmployeesSuccess(data) {
  return {
    type: Constants.GET_ALL_EMPLOYEES_SUCCESS,
    payload: data,
  };
}

export function getAllEmployeesError(data) {
  return {
    type: Constants.GET_ALL_EMPLOYEES_ERROR,
    payload: data,
  };
}

export function getAllWarehouse() {
  return {
    type: Constants.GET_ALL_WAREHOUSE,
  };
}

export function getAllWarehouseSuccess(data) {
  return {
    type: Constants.GET_ALL_WAREHOUSE_SUCCESS,
    payload: data,
  };
}

export function getAllWarehouseError(data) {
  return {
    type: Constants.GET_ALL_WAREHOUSE_ERROR,
    payload: data,
  };
}

export function createNewWarehouse(data) {
  return {
    type: Constants.CREATE_NEW_WAREHOUSE,
    payload: data,
  };
}

export function createNewWarehouseSuccess() {
  return {
    type: Constants.CREATE_NEW_WAREHOUSE_SUCCESS,
  };
}

export function createNewWarehouseError(data) {
  return {
    type: Constants.CREATE_NEW_WAREHOUSE_ERROR,
    payload: data,
  };
}
