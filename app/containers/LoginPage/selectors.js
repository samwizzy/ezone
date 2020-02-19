import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.loginPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate,
  );

// const makeSelectLoading = () =>
//   createSelector(
//     selectLoginPageDomain,
//     subState => subState.loading,
//   );

// const makeSelectError = () =>
//   createSelector(
//     selectLoginPageDomain,
//     subState => subState.error,
//   );

// const makeSelectLoginDetails = () =>
//   createSelector(
//     selectLoginPageDomain,
//     subState => subState.loginDetails,
//   );

// const makeSelectAccessToken = () =>
//   createSelector(
//     selectLoginPageDomain,
//     subState => subState.accessToken,
//   );

// const makeSelectSaveToken = () =>
//   createSelector(
//     selectLoginPageDomain,
//     subState => subState.saveToken,
//   );

// const makeSelectGetSaveToken = () =>
//   createSelector(
//     selectLoginPageDomain,
//     subState => subState.getSaveToken,
//   );

export default makeSelectLoginPage;
export {
  selectLoginPageDomain,
  // makeSelectLoading,
  // makeSelectError,
  // makeSelectLoginDetails,
  // makeSelectAccessToken,
  // makeSelectSaveToken,
  // makeSelectGetSaveToken,
};
