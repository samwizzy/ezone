/*
 *
 * RoleRight actions
 *
 */

import * as Constants from './constants';

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

export function openEditRoleDialog(data) {
  return {
    type: Constants.OPEN_EDIT_ROLE_DIALOG,
    payload: data,
  };
}

export function closeEditRoleDialog() {
  return {
    type: Constants.CLOSE_EDIT_ROLE_DIALOG,
  };
}

export function openNewRightDialog() {
  return {
    type: Constants.OPEN_NEW_RIGHT_DIALOG,
  };
}

export function closeNewRightDialog() {
  return {
    type: Constants.CLOSE_NEW_RIGHT_DIALOG,
  };
}

export function openEditRightDialog(data) {
  return {
    type: Constants.OPEN_EDIT_RIGHT_DIALOG,
    payload: data,
  };
}

export function closeEditRightDialog() {
  return {
    type: Constants.CLOSE_EDIT_RIGHT_DIALOG,
  };
}

export function openRoleDetailsDialog(data) {
  return {
    type: Constants.OPEN_ROLE_DETAILS_DIALOG,
    payload: data,
  };
}

export function closeRoleDetailsDialog() {
  return {
    type: Constants.CLOSE_ROLE_DETAILS_DIALOG,
  };
}

export function createRole(data) {
  return {
    type: Constants.CREATE_ROLE,
    payload: data,
  };
}

export function createRoleSuccess(data) {
  return {
    type: Constants.CREATE_ROLE_SUCCESS,
    payload: data,
  };
}

export function createRoleError(data) {
  return {
    type: Constants.CREATE_ROLE_ERROR,
    payload: data,
  };
}

export function updateRole(data) {
  return {
    type: Constants.UPDATE_ROLE,
    payload: data,
  };
}

export function updateRoleSuccess(data) {
  return {
    type: Constants.UPDATE_ROLE_SUCCESS,
    payload: data,
  };
}

export function updateRoleError(data) {
  return {
    type: Constants.UPDATE_ROLE_ERROR,
    payload: data,
  };
}

export function createRight(data) {
  return {
    type: Constants.CREATE_RIGHT,
    payload: data,
  };
}

export function createRightSuccess(data) {
  return {
    type: Constants.CREATE_RIGHT_SUCCESS,
    payload: data,
  };
}

export function createRightError(data) {
  return {
    type: Constants.CREATE_RIGHT_ERROR,
    payload: data,
  };
}

export function updateRight(data) {
  return {
    type: Constants.UPDATE_RIGHT,
    payload: data,
  };
}

export function updateRightSuccess(data) {
  return {
    type: Constants.UPDATE_RIGHT_SUCCESS,
    payload: data,
  };
}

export function updateRightError(data) {
  return {
    type: Constants.UPDATE_RIGHT_ERROR,
    payload: data,
  };
}

export function createRoleRight(data) {
  return {
    type: Constants.CREATE_ROLE_RIGHT,
    payload: data,
  };
}

export function createRoleRightSuccess(data) {
  return {
    type: Constants.CREATE_ROLE_RIGHT_SUCCESS,
    payload: data,
  };
}

export function createRoleRightError(data) {
  return {
    type: Constants.CREATE_ROLE_RIGHT_ERROR,
    payload: data,
  };
}

export function updateRoleRight(data) {
  return {
    type: Constants.UPDATE_ROLE_RIGHT,
    payload: data,
  };
}

export function updateRoleRightSuccess(data) {
  return {
    type: Constants.UPDATE_ROLE_RIGHT_SUCCESS,
    payload: data,
  };
}

export function updateRoleRightError(data) {
  return {
    type: Constants.UPDATE_ROLE_RIGHT_ERROR,
    payload: data,
  };
}

export function getEmployees() {
  return {
    type: Constants.GET_EMPLOYEES,
  };
}

export function getEmployeesSuccess(data) {
  return {
    type: Constants.GET_EMPLOYEES_SUCCESS,
    payload: data,
  };
}

export function getEmployeesError(data) {
  return {
    type: Constants.GET_EMPLOYEES_ERROR,
    payload: data,
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
    payload: data,
  };
}

export function getRolesError(data) {
  return {
    type: Constants.GET_ROLES_ERROR,
    payload: data,
  };
}

export function getRoleById(payload) {
  return {
    type: Constants.GET_ROLE_BY_ID,
    payload
  };
}

export function getRoleByIdSuccess(data) {
  return {
    type: Constants.GET_ROLE_BY_ID_SUCCESS,
    payload: data,
  };
}

export function getRoleByIdError(data) {
  return {
    type: Constants.GET_ROLE_BY_ID_ERROR,
    payload: data,
  };
}

export function getRights() {
  return {
    type: Constants.GET_RIGHTS,
  };
}

export function getRightsSuccess(data) {
  return {
    type: Constants.GET_RIGHTS_SUCCESS,
    payload: data,
  };
}

export function getRightsError(data) {
  return {
    type: Constants.GET_RIGHTS_ERROR,
    payload: data,
  };
}

export function getRightById(payload) {
  return {
    type: Constants.GET_RIGHT_BY_ID,
    payload
  };
}

export function getRightByIdSuccess(data) {
  return {
    type: Constants.GET_RIGHT_BY_ID_SUCCESS,
    payload: data,
  };
}

export function getRightByIdError(data) {
  return {
    type: Constants.GET_RIGHT_BY_ID_ERROR,
    payload: data,
  };
}

export function getRightsByRoleId(payload) {
  return {
    type: Constants.GET_RIGHTS_BY_ROLE_ID,
    payload
  };
}

export function getRightsByRoleIdSuccess(data) {
  return {
    type: Constants.GET_RIGHTS_BY_ROLE_ID_SUCCESS,
    payload: data,
  };
}

export function getRightsByRoleIdError(data) {
  return {
    type: Constants.GET_RIGHTS_BY_ROLE_ID_ERROR,
    payload: data,
  };
}

export function getRoleRights() {
  return {
    type: Constants.GET_ROLE_RIGHTS,
  };
}

export function getRoleRightsSuccess(data) {
  return {
    type: Constants.GET_ROLE_RIGHTS_SUCCESS,
    payload: data,
  };
}

export function getRoleRightsError(data) {
  return {
    type: Constants.GET_ROLE_RIGHTS_ERROR,
    payload: data,
  };
}

export function getRoleRightById(payload) {
  return {
    type: Constants.GET_ROLE_RIGHT_BY_ID,
    payload
  };
}

export function getRoleRightByIdSuccess(data) {
  return {
    type: Constants.GET_ROLE_RIGHT_BY_ID_SUCCESS,
    payload: data,
  };
}

export function getRoleRightByIdError(data) {
  return {
    type: Constants.GET_ROLE_RIGHT_BY_ID_ERROR,
    payload: data,
  };
}
