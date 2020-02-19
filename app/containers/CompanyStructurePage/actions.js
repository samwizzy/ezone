/*
 *
 * OrgPage actions
 *
 */

import * as Constants from './constants';
import { func } from 'prop-types';

export function openNewPartyDialog() {
  return {
    type: Constants.OPEN_NEW_PARTY_DIALOG,
  };
}

export function closeNewPartyDialog() {
  return {
    type: Constants.CLOSE_NEW_PARTY_DIALOG,
  };
}

export function openNewSubGroupDialog() {
  return {
    type: Constants.OPEN_NEW_SUB_PARTY_DIALOG,
  };
}

export function closeNewSubGroupDialog() {
  return {
    type: Constants.CLOSE_NEW_SUB_PARTY_DIALOG,
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
