/*
 *
 * Companies actions
 *
 */

import * as Constants from './constants';

export function getEmployees() {
  return {
    type: Constants.GET_EMPLOYEES,
  }
}

export function getEmployeesSuccess(data) {
  return {
    type: Constants.GET_EMPLOYEES_SUCCESS,
    payload: data,
  }
}

export function getEmployeesError(data) {
  return {
    type: Constants.GET_EMPLOYEES_ERROR,
    payload: data,
  }
}

export function openNewCompanyDialog() {
  return {
    type: Constants.OPEN_NEW_COMPANY_DIALOG,
  };
}

export function closeNewCompanyDialog() {
  return {
    type: Constants.CLOSE_NEW_COMPANY_DIALOG,
  };
}

export function openEditCompanyDialog(data) {
  return {
    type: Constants.OPEN_EDIT_COMPANY_DIALOG,
    payload: data,
  };
}

export function closeEditCompanyDialog() {
  return {
    type: Constants.CLOSE_EDIT_COMPANY_DIALOG,
  };
}

export function openCompanyDetailsDialog(data) {
  return {
    type: Constants.OPEN_COMPANY_DETAILS_DIALOG,
    payload: data,
  };
}

export function closeCompanyDetailsDialog() {
  return {
    type: Constants.CLOSE_COMPANY_DETAILS_DIALOG,
  };
}

export function createNewCompany(data) {
  return {
    type: Constants.CREATE_NEW_COMPANY,
    payload: data,
  };
}

export function createNewCompanySuccess(data) {
  return {
    type: Constants.CREATE_NEW_COMPANY_SUCCESS,
    payload: data,
  };
}

export function createNewCompanyError(data) {
  return {
    type: Constants.CREATE_NEW_COMPANY_ERROR,
    payload: data,
  };
}

export function updateCompany(data) {
  return {
    type: Constants.UPDATE_COMPANY,
    payload: data,
  };
}

export function updateCompanySuccess(data) {
  return {
    type: Constants.UPDATE_COMPANY_SUCCESS,
    payload: data,
  };
}

export function updateCompanyError(data) {
  return {
    type: Constants.UPDATE_COMPANY_ERROR,
    payload: data,
  };
}

export function getAllCompanies() {
  return {
    type: Constants.GET_ALL_COMPANIES,
  };
}

export function getAllCompaniesSuccess(data) {
  return {
    type: Constants.GET_ALL_COMPANIES_SUCCESS,
    payload: data,
  };
}

export function getAllCompaniesError(data) {
  return {
    type: Constants.GET_ALL_COMPANIES_ERROR,
    payload: data,
  };
}
