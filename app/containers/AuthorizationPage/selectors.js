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

// register selectors
const makeSelectLoading = () =>
  createSelector(
    selectAuthorizationPageDomain,
    substate => substate.loading,
  );

const makeSelectSignupReqData = () =>
  createSelector(
    selectAuthorizationPageDomain,
    substate => substate.signupReqData,
  );

const makeSelectSignupResData = () =>
  createSelector(
    selectAuthorizationPageDomain,
    substate => substate.signupResData,
  );

const makeSelectForgotPasswordData = () =>
  createSelector(
    selectAuthorizationPageDomain,
    substate => substate.forgotPassword,
  );

const makeSelectMessage = () =>
  createSelector(
    selectAuthorizationPageDomain,
    substate => substate.message,
  );

export default makeSelectAuthorizationPage;
export {
  selectAuthorizationPageDomain,
  // register selectors
  makeSelectLoading,
  makeSelectSignupReqData,
  makeSelectSignupResData,
  makeSelectForgotPasswordData,
  makeSelectMessage,
};
