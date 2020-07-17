/*
 *
 * Campaign actions
 *
 */

import * as Constants from './constants';

export function openNewCampaignDialog() {
  return {
    type: Constants.OPEN_NEW_CAMPAIGN_DIALOG,
  };
}

export function closeNewCampaignDialog() {
  return {
    type: Constants.CLOSE_NEW_CAMPAIGN_DIALOG,
  };
}

export function openEditCampaignDialog(data) {
  return {
    type: Constants.OPEN_EDIT_CAMPAIGN_DIALOG,
    payload: data,
  };
}

export function closeEditCampaignDialog() {
  return {
    type: Constants.CLOSE_EDIT_CAMPAIGN_DIALOG,
  };
}

export function openCampaignDetailsDialog(data) {
  return {
    type: Constants.OPEN_CAMPAIGN_DETAILS_DIALOG,
    payload: data,
  };
}

export function closeCampaignDetailsDialog() {
  return {
    type: Constants.CLOSE_CAMPAIGN_DETAILS_DIALOG,
  };
}

export function createCampaign(data) {
  return {
    type: Constants.CREATE_CAMPAIGN,
    payload: data,
  };
}

export function createCampaignSuccess(data) {
  return {
    type: Constants.CREATE_CAMPAIGN_SUCCESS,
    payload: data,
  };
}

export function createCampaignError(data) {
  return {
    type: Constants.CREATE_CAMPAIGN_ERROR,
    payload: data,
  };
}

export function updateCampaign(data) {
  return {
    type: Constants.UPDATE_CAMPAIGN,
    payload: data,
  };
}

export function updateCampaignSuccess(data) {
  return {
    type: Constants.UPDATE_CAMPAIGN_SUCCESS,
    payload: data,
  };
}

export function updateCampaignError(data) {
  return {
    type: Constants.UPDATE_CAMPAIGN_ERROR,
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

export function getCampaigns() {
  return {
    type: Constants.GET_CAMPAIGNS,
  };
}

export function getCampaignsSuccess(data) {
  return {
    type: Constants.GET_CAMPAIGNS_SUCCESS,
    payload: data,
  };
}

export function getCampaignsError(data) {
  return {
    type: Constants.GET_CAMPAIGNS_ERROR,
    payload: data,
  };
}

export function getCampaignById(payload) {
  return {
    type: Constants.GET_CAMPAIGN_BY_ID,
    payload
  };
}

export function getCampaignByIdSuccess(data) {
  return {
    type: Constants.GET_CAMPAIGN_BY_ID_SUCCESS,
    payload: data,
  };
}

export function getCampaignByIdError(data) {
  return {
    type: Constants.GET_CAMPAIGN_BY_ID_ERROR,
    payload: data,
  };
}
