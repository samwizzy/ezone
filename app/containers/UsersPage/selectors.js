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

const makeSelectPagedEmployees = () =>
  createSelector(
    selectUsersPageDomain,
    subState => subState.pagedEmployees,
  );

const makeSelectEmployeeDialog = () =>
  createSelector(
    selectUsersPageDomain,
    subState => subState.employeeDialog,
  );

const makeSelectConfirmDeleteDialog = () =>
  createSelector(
    selectUsersPageDomain,
    subState => subState.confirmDeleteDialog,
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

const makeSelectBranches = () =>
  createSelector(
    selectUsersPageDomain,
    subState => subState.branches,
  );

const makeSelectDepartments = () =>
  createSelector(
    selectUsersPageDomain,
    subState => subState.departments,
  );

const makeSelectPositions = () =>
  createSelector(
    selectUsersPageDomain,
    subState => subState.positions,
  );

const makeSelectEmployeeTypes = () =>
  createSelector(
    selectUsersPageDomain,
    subState => subState.employeeTypes,
  );

const makeSelectSourcesOfHire = () =>
  createSelector(
    selectUsersPageDomain,
    subState => subState.sourcesOfHire,
  );

const makeSelectPayRates = () =>
  createSelector(
    selectUsersPageDomain,
    subState => subState.payRates,
  );

const makeSelectPayTypes = () =>
  createSelector(
    selectUsersPageDomain,
    subState => subState.payTypes,
  );

export default makeSelectUsersPage;
export {
  selectUsersPageDomain,
  makeSelectGetAllEmployees,
  makeSelectPagedEmployees,
  makeSelectLoading,
  makeSelectError,
  makeSelectEmployeeDialog,
  makeSelectConfirmDeleteDialog,
  makeSelectCreateNewEmployeeData,
  makeSelectSignatureDialog,
  makeSelectUpdateUserProfileData,
  makeSelectUpdateUserProfileDialog,
  makeSelectBranches,
  makeSelectDepartments,
  makeSelectPositions,
  makeSelectEmployeeTypes,
  makeSelectSourcesOfHire,
  makeSelectPayRates,
  makeSelectPayTypes,
};
