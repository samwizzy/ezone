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

const makeSelectScheduleDialog = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.scheduleDialog,
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
  makeSelectScheduleDialog,
  makeSelectParticipantDialog,
};
