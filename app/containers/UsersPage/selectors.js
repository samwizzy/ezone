import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the usersPage state domain
 */

const selectUsersPageDomain = state => state.usersPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UsersPage
 */

const makeSelectUsersPage = () =>
  createSelector(
    selectUsersPageDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectUsersPageDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectUsersPageDomain,
    subState => subState.error,
  );

const makeSelectGetAllEmployees = () =>
  createSelector(
    selectUsersPageDomain,
    subState => subState.getAllEmployees,
  );

const makeSelectEmployeeDialog = () =>
  createSelector(
    selectUsersPageDomain,
    subState => subState.employeeDialog,
  );

const makeSelectCreateNewEmployeeData = () =>
  createSelector(
    selectUsersPageDomain,
    subState => subState.createNewEmployeeData,
  );

const makeSelectSignatureDialog = () =>
  createSelector(
    selectUsersPageDomain,
    subState => subState.signatureDialog,
  );

const makeSelectUpdateUserProfileData = () =>
  createSelector(
    selectUsersPageDomain,
    subState => subState.updateUserProfileData,
  );

const makeSelectUpdateUserProfileDialog = () =>
  createSelector(
    selectUsersPageDomain,
    subState => subState.updateUserProfileDialog,
  );

export default makeSelectUsersPage;
export {
  selectUsersPageDomain,
  makeSelectGetAllEmployees,
  makeSelectLoading,
  makeSelectError,
  makeSelectEmployeeDialog,
  makeSelectCreateNewEmployeeData,
  makeSelectSignatureDialog,
  makeSelectUpdateUserProfileData,
  makeSelectUpdateUserProfileDialog,
};
