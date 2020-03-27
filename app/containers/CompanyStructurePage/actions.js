/*
 *
 * OrgPage actions
 *
 */

import * as Constants from './constants';

export function openNewPartyGroupDialog() {
  return {
    type: Constants.OPEN_NEW_PARTY_GROUP_DIALOG,
  };
}

export function closeNewPartyGroupDialog() {
  return {
    type: Constants.CLOSE_NEW_PARTY_GROUP_DIALOG,
  };
}

export function openNewPartyDialog(data) {
  return {
    type: Constants.OPEN_NEW_PARTY_DIALOG,
    payload: data,
  };
}

export function closeNewPartyDialog() {
  return {
    type: Constants.CLOSE_NEW_PARTY_DIALOG,
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

export function getPartyGroupAction() {
  return {
    type: Constants.GET_PARTY_GROUP,
  };
}

export function getPartyGroupSuccessAction(data) {
  return {
    type: Constants.GET_PARTY_GROUP_SUCCESS,
    payload: data,
  };
}

export function getPartyGroupErrorAction(data) {
  return {
    type: Constants.GET_PARTY_GROUP_ERROR,
    payload: data,
  };
}

export function getSelectedPartyGroupAction(data) {
  return {
    type: Constants.GET_SELECTED_PARTY_GROUP,
    payload: data,
  };
}

export function createNewPartyGroupAction(data) {
  return {
    type: Constants.CREATE_NEW_PARTY_GROUP,
    payload: data,
  };
}

export function createNewPartyGroupSuccessAction(data) {
  return {
    type: Constants.CREATE_NEW_PARTY_GROUP_SUCCESS,
    payload: data,
  };
}

export function createNewPartyGroupErrorAction(data) {
  return {
    type: Constants.CREATE_NEW_PARTY_GROUP_ERROR,
    payload: data,
  };
}

export function getAllUsers() {
  return {
    type: Constants.GET_ALL_USERS,
  };
}

export function getAllUsersSuccess(data) {
  return {
    type: Constants.GET_ALL_USERS_SUCCESS,
    payload: data,
  };
}

export function getAllUsersError(data) {
  return {
    type: Constants.GET_ALL_USERS_ERROR,
    payload: data,
  };
}

export function createNewParty(data) {
  return {
    type: Constants.CREATE_NEW_PARTY,
    payload: data,
  };
}

export function createNewPartySuccess(data) {
  return {
    type: Constants.CREATE_NEW_PARTY_SUCCESS,
    payload: data,
  };
}

export function createNewPartyError(data) {
  return {
    type: Constants.CREATE_NEW_PARTY_ERROR,
    payload: data,
  };
}

export function selectedParty(data) {
  return {
    type: Constants.SELECTED_PARTY,
    payload: data,
  };
}

export function openNewPartiesDialog() {
  return {
    type: Constants.OPEN_NEW_PARTIES_DIALOG,
  };
}

export function closeNewPartiesDialog() {
  return {
    type: Constants.CLOSE_NEW_PARTIES_DIALOG,
  };
}

export function createNewParties(data) {
  return {
    type: Constants.CREATE_NEW_PARTIES,
    payload: data,
  };
}

export function createNewPartiesSuccess(data) {
  return {
    type: Constants.CREATE_NEW_PARTIES_SUCCESS,
    payload: data,
  };
}

export function createNewPartiesError(data) {
  return {
    type: Constants.CREATE_NEW_PARTIES_ERROR,
    payload: data,
  };
}

export function openNewPositionDialog() {
  return {
    type: Constants.OPEN_NEW_POSITION_DIALOG,
  };
}

export function closeNewPositionDialog() {
  return {
    type: Constants.CLOSE_NEW_POSITION_DIALOG,
  };
}

export function createNewPosition(data) {
  return {
    type: Constants.CREATE_NEW_POSITION,
    payload: data,
  };
}

export function createNewPositionSuccess(data) {
  return {
    type: Constants.CREATE_NEW_POSITION_SUCCESS,
    payload: data,
  };
}

export function createNewPositionError(data) {
  return {
    type: Constants.CREATE_NEW_POSITION_ERROR,
    payload: data,
  };
}

export function getAllPositions() {
  return {
    type: Constants.GET_POSITIONS,
  };
}

export function getAllPositionsSuccess(data) {
  return {
    type: Constants.GET_POSITIONS_SUCCESS,
    payload: data,
  };
}

export function getAllPositionsError(data) {
  return {
    type: Constants.GET_POSITIONS_ERROR,
    payload: data,
  };
}

export function openAddEmployeeToPositionDialog() {
  return {
    type: Constants.OPEN_ADD_EMPLOYEE_TO_POSITION_DIALOG,
  };
}

export function closeAddEmployeeToPositionDialog() {
  return {
    type: Constants.CLOSE_ADD_EMPLOYEE_TO_POSITION_DIALOG,
  };
}

export function addEmployeeToPosition(data) {
  return {
    type: Constants.ADD_EMPLOYEE_TO_POSITION,
    payload: data,
  };
}

export function addEmployeeToPositionSuccess(data) {
  return {
    type: Constants.ADD_EMPLOYEE_TO_POSITION_SUCCESS,
    payload: data,
  };
}

export function addEmployeeToPositionError(data) {
  return {
    type: Constants.ADD_EMPLOYEE_TO_POSITION_ERROR,
    payload: data,
  };
}

// export function getAllEmployees() {
//   return {
//     type: Constants.GET_EMPLOYEES,
//   };
// }

// export function getAllEmployeesSuccess(data) {
//   return {
//     type: Constants.GET_EMPLOYEES_SUCCESS,
//     payload: data,
//   };
// }

// export function getAllEmployeesError(data) {
//   return {
//     type: Constants.GET_EMPLOYEES_ERROR,
//     payload: data,
//   };
// }

/** *****************************************************************
 * Organization constants
 ******************************************************************* */

export function openEditColorDialog(data) {
  return {
    type: Constants.OPEN_EDIT_COLOR_DIALOG,
    payload: data,
  };
}

export function closeEditColorDialog() {
  return {
    type: Constants.CLOSE_EDIT_COLOR_DIALOG,
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

export function opeEditBranchDialog(data) {
  return {
    type: Constants.OPEN_EDIT_BRANCH_DIALOG,
    payload: data,
  };
}

export function closeEditBranchDialog() {
  return {
    type: Constants.CLOSE_EDIT_BRANCH_DIALOG,
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

export function opeEditDepartmentDialog(data) {
  return {
    type: Constants.OPEN_EDIT_DEPARTMENT_DIALOG,
    payload: data,
  };
}

export function closeEditDepartmentDialog() {
  return {
    type: Constants.CLOSE_EDIT_DEPARTMENT_DIALOG,
  };
}

export function getCompanyInfo() {
  return {
    type: Constants.GET_COMPANY_INFO,
  };
}

export function getCompanyInfoSuccess(data) {
  return {
    type: Constants.GET_COMPANY_INFO_SUCCESS,
    payload: data,
  };
}

export function getCompanyInfoError(data) {
  return {
    type: Constants.GET_COMPANY_INFO_ERROR,
    payload: data,
  };
}

export function updateCompanyInfo(data) {
  console.log(data, 'UPDATE_COMPANY_INFO')
  return {
    type: Constants.UPDATE_COMPANY_INFO,
    payload: data,
  };
}

export function updateCompanyInfoSuccess(data) {
  return {
    type: Constants.UPDATE_COMPANY_INFO_SUCCESS,
    payload: data,
  };
}

export function updateCompanyInfoError(data) {
  return {
    type: Constants.UPDATE_COMPANY_INFO_ERROR,
    payload: data,
  };
}
