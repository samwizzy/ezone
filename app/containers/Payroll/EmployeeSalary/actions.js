import * as Constants from './constants';

export function openNewEmployeeSalaryDialog() {
  return {
    type: Constants.OPEN_NEW_EMPLOYEE_SALARY_DIALOG,
  };
}

export function closeNewEmployeeSalaryDialog() {
  return {
    type: Constants.CLOSE_NEW_EMPLOYEE_SALARY_DIALOG,
  };
}

// Employee Salary dialog operations (Edit)
export function openEditEmployeeSalaryDialog(data) {
  return {
    type: Constants.OPEN_EDIT_EMPLOYEE_SALARY_DIALOG,
    payload: data,
  };
}

export function closeEditEmployeeSalaryDialog() {
  return {
    type: Constants.CLOSE_EDIT_EMPLOYEE_SALARY_DIALOG,
  };
}

// Create new employee salary
export function createEmployeeSalary(data) {
  return {
    type: Constants.CREATE_EMPLOYEE_SALARY,
    payload: data,
  };
}

export function createEmployeeSalarySuccess(data) {
  return {
    type: Constants.CREATE_EMPLOYEE_SALARY_SUCCESS,
    payload: data,
  };
}

export function createEmployeeSalaryError(data) {
  return {
    type: Constants.CREATE_EMPLOYEE_SALARY_ERROR,
    payload: data,
  };
}

// Get all employee salaries
export function getEmployeeSalaries() {
  return {
    type: Constants.GET_EMPLOYEE_SALARIES,
  };
}

export function getEmployeeSalariesSuccess(data) {
  return {
    type: Constants.GET_EMPLOYEE_SALARIES_SUCCESS,
    payload: data,
  };
}

export function getEmployeeSalariesError(data) {
  return {
    type: Constants.GET_EMPLOYEE_SALARIES_ERROR,
    payload: data,
  };
}
// Get all employee salary by id
export function getEmployeeSalaryById(data) {
  return {
    type: Constants.GET_EMPLOYEE_SALARY_BY_ID,
    payload: { id: data },
  };
}

export function getEmployeeSalaryByIdSuccess(data) {
  return {
    type: Constants.GET_EMPLOYEE_SALARY_BY_ID_SUCCESS,
    payload: data,
  };
}

export function getEmployeeSalaryByIdError(data) {
  return {
    type: Constants.GET_EMPLOYEE_SALARY_BY_ID_ERROR,
    payload: data,
  };
}

// Delete a chart of account
export function deleteEmployeeSalary(data) {
  return {
    type: Constants.DELETE_EMPLOYEE_SALARY,
    payload: data,
  };
}

export function deleteEmployeeSalarySuccess(data) {
  return {
    type: Constants.DELETE_EMPLOYEE_SALARY_SUCCESS,
    payload: data,
  };
}

export function deleteEmployeeSalaryError(data) {
  return {
    type: Constants.DELETE_EMPLOYEE_SALARY_ERROR,
    payload: data,
  };
}

// Update a employee salary
export function updateEmployeeSalary(data) {
  return {
    type: Constants.UPDATE_EMPLOYEE_SALARY,
    payload: data,
  };
}

export function updateEmployeeSalarySuccess(data) {
  return {
    type: Constants.UPDATE_EMPLOYEE_SALARY_SUCCESS,
    payload: data,
  };
}

export function updateEmployeeSalaryError(data) {
  return {
    type: Constants.UPDATE_EMPLOYEE_SALARY_ERROR,
    payload: data,
  };
}

// Confirm delete dialog
export function openDeleteEmployeeSalaryDialog(data) {
  return {
    type: Constants.OPEN_DELETE_EMPLOYEE_SALARY_DIALOG,
    payload: data,
  };
}

export function closeDeleteEmployeeSalaryDialog() {
  return {
    type: Constants.CLOSE_DELETE_EMPLOYEE_SALARY_DIALOG,
  };
}
