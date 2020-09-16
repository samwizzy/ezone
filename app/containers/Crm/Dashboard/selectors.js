import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the crm state domain
 */

const selectCrmDashboardDomain = state => state.crmDashboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Crm
 */

const makeSelectCrmDashboard = () =>
  createSelector(
    selectCrmDashboardDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectCrmDashboardDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectCrmDashboardDomain,
    subState => subState.error,
  );

const makeSelectEmployees = () =>
  createSelector(
    selectCrmDashboardDomain,
    subState => subState.employees,
  );

const makeSelectContacts = () =>
  createSelector(
    selectCrmDashboardDomain,
    subState => subState.contacts,
  );

const makeSelectCompanies = () =>
  createSelector(
    selectCrmDashboardDomain,
    subState => subState.companies,
  );

const makeSelectSchedules = () =>
  createSelector(
    selectCrmDashboardDomain,
    subState => subState.schedules,
  );

const makeSelectTasks = () =>
  createSelector(
    selectCrmDashboardDomain,
    subState => subState.tasks,
  );

const makeSelectReminderDialog = () =>
  createSelector(
    selectCrmDashboardDomain,
    subState => subState.reminderDialog,
  );

export default makeSelectCrmDashboard;
export {
  selectCrmDashboardDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectEmployees,
  makeSelectContacts,
  makeSelectCompanies,
  makeSelectSchedules,
  makeSelectTasks,
  makeSelectReminderDialog,
};
