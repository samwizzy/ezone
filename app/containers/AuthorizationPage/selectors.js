import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the authorizationPage state domain
 */

const selectAuthorizationPageDomain = state =>
  state.authorizationPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AuthorizationPage
 */

const makeSelectAuthorizationPage = () =>
  createSelector(
    selectAuthorizationPageDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAuthorizationPageDomain,
    substate => substate.loading,
  );

const makeSelectMessage = () =>
  createSelector(
    selectAuthorizationPageDomain,
    substate => substate.message,
  );

export default makeSelectAuthorizationPage;
export {
  selectAuthorizationPageDomain,
  makeSelectLoading,
  makeSelectMessage,
};
