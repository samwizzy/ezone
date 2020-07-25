import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the crm state domain
 */

const selectCrmDomain = state => state.crmSchedules || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Crm
 */

const makeSelectCrm = () =>
  createSelector(
    selectCrmDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.error,
  );

const makeSelectEmployees = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.employees,
  );

const makeSelectContacts = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.contacts,
  );

const makeSelectSchedules = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.schedules,
  );

const makeSelectScheduleDialog = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.scheduleDialog,
  );

const makeSelectScheduleDetailsDialog = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.scheduleDetailsDialog,
  );

const makeSelectParticipantDialog = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.participantDialog,
  );

export default makeSelectCrm;
export {
  selectCrmDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectEmployees,
  makeSelectContacts,
  makeSelectSchedules,
  makeSelectScheduleDialog,
  makeSelectScheduleDetailsDialog,
  makeSelectParticipantDialog,
};
