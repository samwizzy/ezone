/*
 *
 * Crm actions
 *
 */

import * as Constants from './constants';

export function openNewScheduleDialog() {
  console.log('open schedules')
  return {
    type: Constants.OPEN_NEW_SCHEDULE_DIALOG,
  };
}

export function closeNewScheduleDialog() {
  return {
    type: Constants.CLOSE_NEW_SCHEDULE_DIALOG,
  };
}

export function openNewParticipantDialog() {
  return {
    type: Constants.OPEN_NEW_PARTICIPANT_DIALOG,
  };
}

export function closeNewParticipantDialog() {
  return {
    type: Constants.CLOSE_NEW_PARTICIPANT_DIALOG,
  };
}
