/*
 * HRPage Actions
 */

import * as Constants from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function getEmployees() {
  return {
    type: Constants.GET_EMPLOYEES,
  };
}

export function getEmployeesSuccess(data) {
  return {
    type: Constants.GET_EMPLOYEES_SUCCESS,
    payload: data
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
    payload: data
  };
}

export function getEnrollmentTypes() {
  return {
    type: Constants.GET_ENROLLMENTTYPES,
  };
}

export function getEnrollmentTypesSuccess(data) {
  return {
    type: Constants.GET_ENROLLMENTTYPES_SUCCESS,
    payload: data
  };
}

export function getLocations() {
  return {
    type: Constants.GET_LOCATIONS,
  };
}
export function getLocationsSuccess(data) {
  return {
    type: Constants.GET_LOCATIONS_SUCCESS,
    payload: data
  };
}

export function getJobOpenings() {
  return {
    type: Constants.GET_JOBOPENINGS,
  };
}

export function getJobOpeningsSuccess(data) {
  return {
    type: Constants.GET_JOBOPENINGS_SUCCESS,
    payload: data
  };
}

export function getRoles() {
  return {
    type: Constants.GET_ROLES,
  };
}

export function getRolesSuccess(data) {
  return {
    type: Constants.GET_ROLES_SUCCESS,
    payload: data
  };
}

export function getEmployee(uuid) {
  return {
    type: Constants.GET_EMPLOYEE,
    payload: uuid
  };
}

export function getEmployeeSuccess(data) {
  return {
    type: Constants.GET_EMPLOYEE_SUCCESS,
    payload: data
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
    payload: data
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
    payload: data
  };
}
export function getPartyTags() {
  return {
    type: Constants.GET_PARTY_TAGS,
  };
}
export function getPartyTagsSuccess(data) {
  return {
    type: Constants.GET_PARTY_TAGS_SUCCESS,
    payload: data
  };
}

export function getDepartmentsByOrgIdApi() {
  console.log("i am trying the department")
  return {
    type: Constants.GET_DEPARTMENTS_BY_ORGID_API,
  };
}
export function getDepartmentsByOrgIdApiSuccess(data) {
  return {
    type: Constants.GET_DEPARTMENTS_BY_ORGID_API_SUCCESS,
    payload: data
  };
}
export function createBranch(data) {
  return {
    type: Constants.CREATE_BRANCH,
    payload: data
  };
}
export function createBranchSuccess(data) {
  return {
    type: Constants.CREATE_BRANCH_SUCCESS,
    payload: data
  };
}
export function createJobOpening(data) {
  return {
    type: Constants.CREATE_JOBOPENING,
    payload: data
  };
}
export function createJobOpeningSuccess(data) {
  return {
    type: Constants.CREATE_JOBOPENING_SUCCESS,
    payload: data
  };
}
export function createRole(data) {
  return {
    type: Constants.CREATE_ROLE,
    payload: data
  };
}
export function createRoleSuccess(data) {
  return {
    type: Constants.CREATE_ROLE_SUCCESS,
    payload: data
  };
}
export function createDepartment(data) {
  return {
    type: Constants.CREATE_DEPARTMENT,
    payload: data
  };
}
export function createDepartmentSuccess(data) {
  return {
    type: Constants.CREATE_DEPARTMENT_SUCCESS,
    payload: data
  };
}
export function editDepartment(data) {
  return {
    type: Constants.EDIT_DEPARTMENT,
    payload: data
  };
}

export function editDepartmentSuccess(data) {
  return {
    type: Constants.EDIT_DEPARTMENT_SUCCESS,
    payload: data
  };
}

export function createEmployee(data) {
  return {
    type: Constants.CREATE_EMPLOYEE,
    payload: data
  };
}
export function createEmployeeSuccess(data) {
  return {
    type: Constants.CREATE_EMPLOYEE_SUCCESS,
    payload: data
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
  };
}
export function closeEditEmployeeDialog(data) {
  return {
    type: Constants.CLOSE_EDIT_EMPLOYEE_DIALOG,
  };
}

export function openNewDepartmentDialog() {
  return {
    type: Constants.OPEN_NEW_DEPARTMENT_DIALOG,
  };
}
export function closeNewDepartmentDialog() {
  return {
    type: Constants.CLOSE_NEW_DEPARTMENT_DIALOG,
  };
}

export function openNewBranchDialog() {
  return {
    type: Constants.OPEN_NEW_BRANCH_DIALOG,
  };
}
export function closeNewBranchDialog() {
  return {
    type: Constants.CLOSE_NEW_BRANCH_DIALOG,
  };
}

export function openNewRoleDialog() {
  return {
    type: Constants.OPEN_NEW_ROLE_DIALOG,
  };
}
export function closeNewRoleDialog() {
  return {
    type: Constants.CLOSE_NEW_ROLE_DIALOG,
  };
}

export function openNewAttendanceDialog() {
  return {
    type: Constants.OPEN_NEW_ATTENDANCE_DIALOG,
  };
}
export function closeNewAttendanceDialog() {
  return {
    type: Constants.CLOSE_NEW_ATTENDANCE_DIALOG,
  };
}
export function openNewPayrollDialog() {
  return {
    type: Constants.OPEN_NEW_PAYROLL_DIALOG,
  };
}
export function closeNewPayrollDialog() {
  return {
    type: Constants.CLOSE_NEW_PAYROLL_DIALOG,
  };
}
