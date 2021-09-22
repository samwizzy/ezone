import * as Constants from './constants';

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

export function getPagedEmployees(payload = { offset: 0, limit: 10 }) {
  return {
    type: Constants.GET_PAGED_EMPLOYEES,
    payload,
  };
}
export function getPagedEmployeesSuccess(data) {
  return {
    type: Constants.GET_PAGED_EMPLOYEES_SUCCESS,
    payload: data,
  };
}
export function getPagedEmployeesError(data) {
  return {
    type: Constants.GET_PAGED_EMPLOYEES_ERROR,
    payload: data,
  };
}

export function openNewEmployeeDialog() {
  return {
    type: Constants.OPEN_NEW_EMPLOYEE_DIALOG,
  };
}

export function closeNewEmployeeDialog() {
  return {
    type: Constants.CLOSE_NEW_EMPLOYEE_DIALOG,
  };
}

export function openEditEmployeeDialog(data) {
  return {
    type: Constants.OPEN_EDIT_EMPLOYEE_DIALOG,
    payload: data,
  };
}

export function closeEditEmployeeDialog() {
  return {
    type: Constants.CLOSE_EDIT_EMPLOYEE_DIALOG,
  };
}

export function openViewEmployeeDialog(data) {
  return {
    type: Constants.OPEN_VIEW_EMPLOYEE_DIALOG,
    payload: data,
  };
}

export function closeViewEmployeeDialog() {
  return {
    type: Constants.CLOSE_VIEW_EMPLOYEE_DIALOG,
  };
}

export function createNewEmployee(data) {
  return {
    type: Constants.CREATE_NEW_EMPLOYEE,
    payload: data,
  };
}

export function createNewEmployeeSuccess() {
  return {
    type: Constants.CREATE_NEW_EMPLOYEE_SUCCESS,
  };
}

export function createNewEmployeeError(data) {
  return {
    type: Constants.CREATE_NEW_EMPLOYEE_ERROR,
    payload: data,
  };
}

export function updateEmployee(data) {
  return {
    type: Constants.UPDATE_EMPLOYEE,
    payload: data,
  };
}

export function updateEmployeeSuccess() {
  return {
    type: Constants.UPDATE_EMPLOYEE_SUCCESS,
  };
}

export function updateEmployeeError(data) {
  return {
    type: Constants.UPDATE_EMPLOYEE_ERROR,
    payload: data,
  };
}

export function deleteEmployee(data) {
  return {
    type: Constants.DELETE_EMPLOYEE,
    payload: data,
  };
}
export function deleteEmployeeSuccess(data) {
  return {
    type: Constants.DELETE_EMPLOYEE_SUCCESS,
    payload: data,
  };
}
export function deleteEmployeeError(data) {
  return {
    type: Constants.DELETE_EMPLOYEE_ERROR,
    payload: data,
  };
}

export function openConfirmDeleteEmployeeDialog(data) {
  return {
    type: Constants.OPEN_CONFIRM_DELETE_EMPLOYEE_DIALOG,
    payload: data,
  };
}
export function closeConfirmDeleteEmployeeDialog() {
  return {
    type: Constants.CLOSE_CONFIRM_DELETE_EMPLOYEE_DIALOG,
  };
}

export function getBranches() {
  return {
    type: Constants.GET_BRANCHES,
  };
}

export function getBranchesSuccess(data) {
  return {
    type: Constants.GET_BRANCHES_SUCCESS,
    payload: data,
  };
}

export function getPositions() {
  return {
    type: Constants.GET_POSITIONS,
  };
}

export function getPositionsSuccess(data) {
  return {
    type: Constants.GET_POSITIONS_SUCCESS,
    payload: data,
  };
}

export function getPositionsError(data) {
  return {
    type: Constants.GET_POSITIONS_ERROR,
    payload: data,
  };
}

export function getDepartments() {
  return {
    type: Constants.GET_DEPARTMENTS,
  };
}
export function getDepartmentsSuccess(data) {
  return {
    type: Constants.GET_DEPARTMENTS_SUCCESS,
    payload: data,
  };
}

export function getEmployeeTypes() {
  return {
    type: Constants.GET_EMPLOYEETYPES,
  };
}

export function getEmployeeTypesSuccess(data) {
  return {
    type: Constants.GET_EMPLOYEETYPES_SUCCESS,
    payload: data,
  };
}

export function getSourceOfHire() {
  return {
    type: Constants.GET_SOURCE_OF_HIRE,
  };
}

export function getSourceOfHireSuccess(data) {
  return {
    type: Constants.GET_SOURCE_OF_HIRE_SUCCESS,
    payload: data,
  };
}

export function getPayRates() {
  return {
    type: Constants.GET_PAY_RATES,
  };
}

export function getPayRatesSuccess(data) {
  return {
    type: Constants.GET_PAY_RATES_SUCCESS,
    payload: data,
  };
}

export function getPayTypes() {
  return {
    type: Constants.GET_PAY_TYPES,
  };
}

export function getPayTypesSuccess(data) {
  return {
    type: Constants.GET_PAY_TYPES_SUCCESS,
    payload: data,
  };
}

export function openSignatureDialog(data) {
  return {
    type: Constants.OPEN_SIGNATURE_DIALOG,
    payload: data,
  };
}

export function closeSignatureDialog() {
  return {
    type: Constants.CLOSE_SIGNATURE_DIALOG,
  };
}

export function openEditUserProfileDialog(data) {
  return {
    type: Constants.OPEN_EDIT_USER_PROFILE_DIALOG,
    payload: data,
  };
}

export function closeEditUserProfileDialog() {
  return {
    type: Constants.CLOSE_EDIT_USER_PROFILE_DIALOG,
  };
}

export function updateUserProfile(data) {
  return {
    type: Constants.UPDATE_USER_PROFILE,
    payload: data,
  };
}

export function updateUserProfileSuccess() {
  return {
    type: Constants.UPDATE_USER_PROFILE_SUCCESS,
  };
}

export function updateUserProfileError(data) {
  return {
    type: Constants.UPDATE_USER_PROFILE_ERROR,
    payload: data,
  };
}
