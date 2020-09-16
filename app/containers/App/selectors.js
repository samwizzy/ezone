/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectLoginDetails = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loginDetails,
  );

const makeSelectAccessToken = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.accessToken,
  );

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.user,
  );

const makeSelectSnackBar = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.messageDialog,
  );

const makeSelectReminderDialog = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.reminderDialog,
  );

const makeSelectPostFcmToken = () =>
  createSelector(
    selectGlobal,
    subState => subState.postFcmToken,
  );

const makeSelectCheckActiveSession = () =>
  createSelector(
    selectGlobal,
    subState => subState.checkActiveSession,
  );

export {
  selectGlobal,
  makeSelectPostFcmToken,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectLoginDetails,
  makeSelectReminderDialog,
  makeSelectAccessToken,
  makeSelectSnackBar,
  makeSelectCheckActiveSession,
};
