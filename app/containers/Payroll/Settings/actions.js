import * as Constants from './constants';

export function createPayrollSetup(data) {
  return {
    type: Constants.CREATE_PAYROLL_SETUP,
    payload: data,
  };
}

export function createPayrollSetupSuccess(data) {
  return {
    type: Constants.CREATE_PAYROLL_SETUP_SUCCESS,
    payload: data,
  };
}

export function createPayrollSetupError(data) {
  return {
    type: Constants.CREATE_PAYROLL_SETUP_ERROR,
    payload: data,
  };
}

// Get payroll setup data
export function getPayrollSetup() {
  return {
    type: Constants.GET_PAYROLL_SETUP,
  };
}

export function getPayrollSetupSuccess(data) {
  return {
    type: Constants.GET_PAYROLL_SETUP_SUCCESS,
    payload: data,
  };
}

export function getPayrollSetupError(data) {
  return {
    type: Constants.GET_PAYROLL_SETUP_ERROR,
    payload: data,
  };
}
