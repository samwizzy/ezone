import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the campaigns state domain
 */

const selectCampaignsDomain = state => state.crmCampaigns || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Campaigns
 */

const makeSelectCrmCampaigns = () =>
  createSelector(
    selectCampaignsDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectCampaignsDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectCampaignsDomain,
    subState => subState.error,
  );

const makeSelectCampaignDialog = () =>
  createSelector(
    selectCampaignsDomain,
    subState => subState.campaignDialog,
  );

const makeSelectCampaignDetailsDialog = () =>
  createSelector(
    selectCampaignsDomain,
    subState => subState.campaignDetailsDialog,
  );

const makeSelectCampaigns = () =>
  createSelector(
    selectCampaignsDomain,
    subState => subState.campaigns,
  );

const makeSelectCampaignById = () =>
  createSelector(
    selectCampaignsDomain,
    subState => subState.campaign,
  );

const makeSelectEmployees = () =>
  createSelector(
    selectCampaignsDomain,
    subState => subState.employees,
  );

export default makeSelectCrmCampaigns;
export {
  selectCampaignsDomain,
  makeSelectLoading,
  makeSelectEmployees,
  makeSelectCampaigns,
  makeSelectCampaignById,
  makeSelectCampaignDialog,
  makeSelectCampaignDetailsDialog,
  makeSelectError,
};
