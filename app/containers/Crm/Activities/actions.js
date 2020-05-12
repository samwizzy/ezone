/*
 *
 * Crm actions
 *
 */

import * as Constants from './constants';

export function openNewActivitiesDialog() {
  return {
    type: Constants.OPEN_NEW_ACTIVITIES_DIALOG,
  };
}

export function closeNewActivitiesDialog() {
  return {
    type: Constants.CLOSE_NEW_ACTIVITIES_DIALOG,
  };
}

export function getAllCrmActivities() {
  return {
    type: Constants.GET_ALL_CRM_ACTIVITIES,
  };
}

export function getAllCrmActivitiesSuccess(data) {
  return {
    type: Constants.GET_ALL_CRM_ACTIVITIES_SUCCESS,
    payload: data,
  };
}

export function getAllCrmActivitiesError(data) {
  return {
    type: Constants.GET_ALL_CRM_ACTIVITIES_ERROR,
    payload: data,
  };
}
