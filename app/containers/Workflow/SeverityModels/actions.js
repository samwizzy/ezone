/*
 *
 * severity model actions
 *
 */

import * as Constants from './constants';

export function openNewJobDialog() {
  return {
    type: Constants.OPEN_NEW_JOB_DIALOG,
  };
}

export function closeNewJobDialog() {
  return {
    type: Constants.CLOSE_NEW_JOB_DIALOG,
  };
}

export function openEditJobDialog(data) {
  return {
    type: Constants.OPEN_EDIT_JOB_DIALOG,
    payload: data,
  };
}

export function closeEditJobDialog() {
  return {
    type: Constants.CLOSE_EDIT_JOB_DIALOG,
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
