import * as Constants from './constants';

export function openNewJobsDialog() {
  return {
    type: Constants.OPEN_NEW_JOBS_DIALOG,
  };
}

export function closeNewJobsDialog() {
  return {
    type: Constants.CLOSE_NEW_JOBS_DIALOG,
  };
}
