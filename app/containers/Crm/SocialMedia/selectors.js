import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the socialMedias state domain
 */

const selectSocialMediaDomain = state => state.crmSocialMedia || initialState;

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

const makeSelectFacebook = () =>
  createSelector(
    selectSocialMediaDomain,
    subState => subState.facebook,
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
  makeSelectFacebook,
  makeSelectSocialMediaDialog,
  makeSelectSocialMediaDetailsDialog,
  makeSelectError,
};
