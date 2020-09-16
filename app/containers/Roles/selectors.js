import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the campaigns state domain
 */

const selectRoleRightsDomain = state => state.roleRights || initialState;

/**
 * Default selector used by RoleRights
 */

const makeSelectRoleRightsApp = () =>
  createSelector(
    selectRoleRightsDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectRoleRightsDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectRoleRightsDomain,
    subState => subState.error,
  );

const makeSelectRoleDialog = () =>
  createSelector(
    selectRoleRightsDomain,
    subState => subState.roleDialog,
  );

const makeSelectRoleDetailsDialog = () =>
  createSelector(
    selectRoleRightsDomain,
    subState => subState.roleDetailsDialog,
  );

const makeSelectRightDialog = () =>
  createSelector(
    selectRoleRightsDomain,
    subState => subState.rightDialog,
  );

const makeSelectRoleRights = () =>
  createSelector(
    selectRoleRightsDomain,
    subState => subState.roleRights,
  );

const makeSelectRoles = () =>
  createSelector(
    selectRoleRightsDomain,
    subState => subState.roles,
  );

const makeSelectRights = () =>
  createSelector(
    selectRoleRightsDomain,
    subState => subState.rights,
  );

const makeSelectRightsByRoleId = () =>
  createSelector(
    selectRoleRightsDomain,
    subState => subState.right,
  );

const makeSelectRoleRightById = () =>
  createSelector(
    selectRoleRightsDomain,
    subState => subState.roleRight,
  );

const makeSelectEmployees = () =>
  createSelector(
    selectRoleRightsDomain,
    subState => subState.employees,
  );

const makeSelectModules = () =>
  createSelector(
    selectRoleRightsDomain,
    subState => subState.modules,
  );

export default makeSelectRoleRightsApp;
export {
  selectRoleRightsDomain,
  makeSelectLoading,
  makeSelectEmployees,
  makeSelectModules,
  makeSelectRoles,
  makeSelectRights,
  makeSelectRightsByRoleId,
  makeSelectRoleRights,
  makeSelectRoleRightById,
  makeSelectRightDialog,
  makeSelectRoleDialog,
  makeSelectRoleDetailsDialog,
  makeSelectError,
};
