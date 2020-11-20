import * as Constants from './constants';

export function openNewStepDialog() {
  return {
    type: Constants.OPEN_NEW_STEP_DIALOG,
  };
}

export function closeNewStepDialog() {
  return {
    type: Constants.CLOSE_NEW_STEP_DIALOG,
  };
}

export function openEditStepDialog(data) {
  return {
    type: Constants.OPEN_EDIT_STEP_DIALOG,
    payload: data,
  };
}

export function closeEditStepDialog() {
  return {
    type: Constants.CLOSE_EDIT_STEP_DIALOG,
  };
}

export function createJob(data) {
  return {
    type: Constants.CREATE_JOB,
    payload: data,
  };
}

export function createJobSuccess(data) {
  return {
    type: Constants.CREATE_JOB_SUCCESS,
    payload: data,
  };
}

export function createJobError(data) {
  return {
    type: Constants.CREATE_JOB_ERROR,
    payload: data,
  };
}

export function updateJob(data) {
  return {
    type: Constants.UPDATE_JOB,
    payload: data,
  };
}

export function updateJobSuccess(data) {
  return {
    type: Constants.UPDATE_JOB_SUCCESS,
    payload: data,
  };
}

export function updateJobError(data) {
  return {
    type: Constants.UPDATE_JOB_ERROR,
    payload: data,
  };
}

export function getJobs() {
  return {
    type: Constants.GET_JOBS,
  };
}

export function getJobsSuccess(data) {
  return {
    type: Constants.GET_JOBS_SUCCESS,
    payload: data,
  };
}

export function getJobsError(data) {
  return {
    type: Constants.GET_JOBS_ERROR,
    payload: data,
  };
}
