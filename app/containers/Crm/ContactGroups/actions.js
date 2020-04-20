/*
 *
 * Crm actions
 *
 */

import * as Constants from './constants';

export function openNewContactGroupsDialog() {
  console.log("new contact groups")
  return {
    type: Constants.OPEN_NEW_CONTACT_GROUPS_DIALOG,
  };
}

export function closeNewContactGroupsDialog() {
  return {
    type: Constants.CLOSE_NEW_CONTACT_GROUPS_DIALOG,
  };
}

export function openNewAssignContactDialog() {
  return {
    type: Constants.OPEN_NEW_ASSIGN_CONTACT_DIALOG,
  };
}

export function closeNewAssignContactDialog() {
  return {
    type: Constants.CLOSE_NEW_ASSIGN_CONTACT_DIALOG,
  };
}
