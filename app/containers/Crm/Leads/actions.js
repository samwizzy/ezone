/*
 *
 * Crm Leads actions
 *
 */

import * as Constants from './constants';

export function openNewLeadDialog() {
  return {
    type: Constants.OPEN_NEW_LEAD_DIALOG,
  };
}

export function closeNewLeadDialog() {
  return {
    type: Constants.CLOSE_NEW_LEAD_DIALOG,
  };
}

export function openEditLeadDialog(data) {
  return {
    type: Constants.OPEN_EDIT_LEAD_DIALOG,
    payload: data,
  };
}

export function closeEditLeadDialog() {
  return {
    type: Constants.CLOSE_EDIT_LEAD_DIALOG,
  };
}

export function getLeads() {
  return {
    type: Constants.GET_LEADS,
  };
}

export function getLeadsSuccess(data) {
  return {
    type: Constants.GET_LEADS_SUCCESS,
    payload: data,
  };
}

export function getLeadsError() {
  return {
    type: Constants.GET_LEADS_ERROR,
  };
}

export function createLead(data) {
  return {
    type: Constants.CREATE_LEAD,
    payload: data,
  };
}

export function createLeadSuccess(data) {
  return {
    type: Constants.CREATE_LEAD_SUCCESS,
    payload: data,
  };
}

export function createLeadError(data) {
  return {
    type: Constants.CREATE_LEAD_ERROR,
    payload: data,
  };
}

export function updateLead(data) {
  return {
    type: Constants.UPDATE_LEAD,
    payload: data,
  };
}

export function updateLeadSuccess(data) {
  return {
    type: Constants.UPDATE_LEAD_SUCCESS,
    payload: data,
  };
}

export function updateLeadError(data) {
  return {
    type: Constants.UPDATE_LEAD_ERROR,
    payload: data,
  };
}

// LEAD SOURCES
export function openNewLeadSourceDialog() {
  return {
    type: Constants.OPEN_NEW_LEAD_SOURCE_DIALOG,
  };
}

export function closeNewLeadSourceDialog() {
  return {
    type: Constants.CLOSE_NEW_LEAD_SOURCE_DIALOG,
  };
}

export function openEditLeadSourceDialog(data) {
  return {
    type: Constants.OPEN_EDIT_LEAD_SOURCE_DIALOG,
    payload: data,
  };
}

export function closeEditLeadSourceDialog() {
  return {
    type: Constants.CLOSE_EDIT_LEAD_SOURCE_DIALOG,
  };
}

export function getLeadSources() {
  return {
    type: Constants.GET_LEAD_SOURCES,
  };
}

export function getLeadSourcesSuccess(data) {
  return {
    type: Constants.GET_LEAD_SOURCES_SUCCESS,
    payload: data,
  };
}

export function getLeadSourcesError() {
  return {
    type: Constants.GET_LEAD_SOURCES_ERROR,
  };
}

export function createLeadSource(data) {
  return {
    type: Constants.CREATE_LEAD_SOURCE,
    payload: data,
  };
}

export function createLeadSourceSuccess(data) {
  return {
    type: Constants.CREATE_LEAD_SOURCE_SUCCESS,
    payload: data,
  };
}

export function createLeadSourceError(data) {
  return {
    type: Constants.CREATE_LEAD_SOURCE_ERROR,
    payload: data,
  };
}

export function updateLeadSource(data) {
  return {
    type: Constants.UPDATE_LEAD_SOURCE,
    payload: data,
  };
}

export function updateLeadSourceSuccess(data) {
  return {
    type: Constants.UPDATE_LEAD_SOURCE_SUCCESS,
    payload: data,
  };
}

export function updateLeadSourceError(data) {
  return {
    type: Constants.UPDATE_LEAD_SOURCE_ERROR,
    payload: data,
  };
}
// LEAD TAGS
export function openNewLeadTagDialog() {
  return {
    type: Constants.OPEN_NEW_LEAD_TAG_DIALOG,
  };
}

export function closeNewLeadTagDialog() {
  return {
    type: Constants.CLOSE_NEW_LEAD_TAG_DIALOG,
  };
}

export function openEditLeadTagDialog(data) {
  return {
    type: Constants.OPEN_EDIT_LEAD_TAG_DIALOG,
    payload: data,
  };
}

export function closeEditLeadTagDialog() {
  return {
    type: Constants.CLOSE_EDIT_LEAD_TAG_DIALOG,
  };
}

export function getLeadTags() {
  return {
    type: Constants.GET_LEAD_TAGS,
  };
}

export function getLeadTagsSuccess(data) {
  return {
    type: Constants.GET_LEAD_TAGS_SUCCESS,
    payload: data,
  };
}

export function getLeadTagsError() {
  return {
    type: Constants.GET_LEAD_TAGS_ERROR,
  };
}

export function createLeadTag(data) {
  return {
    type: Constants.CREATE_LEAD_TAG,
    payload: data,
  };
}

export function createLeadTagSuccess(data) {
  return {
    type: Constants.CREATE_LEAD_TAG_SUCCESS,
    payload: data,
  };
}

export function createLeadTagError(data) {
  return {
    type: Constants.CREATE_LEAD_TAG_ERROR,
    payload: data,
  };
}

export function updateLeadTag(data) {
  return {
    type: Constants.UPDATE_LEAD_TAG,
    payload: data,
  };
}

export function updateLeadTagSuccess(data) {
  return {
    type: Constants.UPDATE_LEAD_TAG_SUCCESS,
    payload: data,
  };
}

export function updateLeadTagError(data) {
  return {
    type: Constants.UPDATE_LEAD_TAG_ERROR,
    payload: data,
  };
}
// LEAD STAGES
export function openNewLeadStageDialog() {
  return {
    type: Constants.OPEN_NEW_LEAD_STAGE_DIALOG,
  };
}

export function closeNewLeadStageDialog() {
  return {
    type: Constants.CLOSE_NEW_LEAD_STAGE_DIALOG,
  };
}

export function openEditLeadStageDialog(data) {
  return {
    type: Constants.OPEN_EDIT_LEAD_STAGE_DIALOG,
    payload: data,
  };
}

export function closeEditLeadStageDialog() {
  return {
    type: Constants.CLOSE_EDIT_LEAD_STAGE_DIALOG,
  };
}

export function getLeadStages() {
  return {
    type: Constants.GET_LEAD_STAGES,
  };
}

export function getLeadStagesSuccess(data) {
  return {
    type: Constants.GET_LEAD_STAGES_SUCCESS,
    payload: data,
  };
}

export function getLeadStagesError() {
  return {
    type: Constants.GET_LEAD_STAGES_ERROR,
  };
}

export function createLeadStage(data) {
  return {
    type: Constants.CREATE_LEAD_STAGE,
    payload: data,
  };
}

export function createLeadStageSuccess(data) {
  return {
    type: Constants.CREATE_LEAD_STAGE_SUCCESS,
    payload: data,
  };
}

export function createLeadStageError(data) {
  return {
    type: Constants.CREATE_LEAD_STAGE_ERROR,
    payload: data,
  };
}

export function updateLeadStage(data) {
  return {
    type: Constants.UPDATE_LEAD_STAGE,
    payload: data,
  };
}

export function updateLeadStageSuccess(data) {
  return {
    type: Constants.UPDATE_LEAD_STAGE_SUCCESS,
    payload: data,
  };
}

export function updateLeadStageError(data) {
  return {
    type: Constants.UPDATE_LEAD_STAGE_ERROR,
    payload: data,
  };
}
