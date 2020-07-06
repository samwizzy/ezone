import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the socialMedias state domain
 */

const selectSocialMediaDomain = state => state.crmSocialMedia || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SocialMedia
 */

const makeSelectCrmSocialMedia = () =>
  createSelector(
    selectSocialMediaDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectSocialMediaDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectSocialMediaDomain,
    subState => subState.error,
  );

const makeSelectSocialMediaDialog = () =>
  createSelector(
    selectSocialMediaDomain,
    subState => subState.socialMediaDialog,
  );

const makeSelectSocialMediaDetailsDialog = () =>
  createSelector(
    selectSocialMediaDomain,
    subState => subState.socialMediaDetailsDialog,
  );

const makeSelectSocialMedia = () =>
  createSelector(
    selectSocialMediaDomain,
    subState => subState.socialMedias,
  );

const makeSelectEmployees = () =>
  createSelector(
    selectSocialMediaDomain,
    subState => subState.employees,
  );

export default makeSelectCrmSocialMedia;
export {
  selectSocialMediaDomain,
  makeSelectLoading,
  makeSelectEmployees,
  makeSelectSocialMedia,
  makeSelectSocialMediaDialog,
  makeSelectSocialMediaDetailsDialog,
  makeSelectError,
};
