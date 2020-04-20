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
