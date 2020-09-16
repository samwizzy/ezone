import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the crm state domain
 */

const selectLeadsDomain = state => state.crmLeads || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Crm Leads
 */

const makeSelectCrmLeads = () =>
  createSelector(
    selectLeadsDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectLeadsDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectLeadsDomain,
    subState => subState.error,
  );

const makeSelectLeadDialog = () =>
  createSelector(
    selectLeadsDomain,
    subState => subState.leadDialog,
  );
const makeSelectLeadSourceDialog = () =>
  createSelector(
    selectLeadsDomain,
    subState => subState.leadSourceDialog,
  );
const makeSelectLeadTagDialog = () =>
  createSelector(
    selectLeadsDomain,
    subState => subState.leadTagDialog,
  );

const makeSelectLeads = () =>
  createSelector(
    selectLeadsDomain,
    subState => subState.leads,
  );
const makeSelectLeadSources = () =>
  createSelector(
    selectLeadsDomain,
    subState => subState.leadSources,
  );
const makeSelectLeadTags = () =>
  createSelector(
    selectLeadsDomain,
    subState => subState.leadTags,
  );


export default makeSelectCrmLeads;
export {
  selectLeadsDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectLeadDialog,
  makeSelectLeadSourceDialog,
  makeSelectLeadTagDialog,
  makeSelectLeads,
  makeSelectLeadSources,
  makeSelectLeadTags,
};
