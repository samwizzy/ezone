import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the crm state domain
 */

const selectCrmDomain = state => state.crmContacts || initialState;

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

const makeSelectContactDialog = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.contactDialog,
  );

const makeSelectAllContacts = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.allContacts,
  );

const makeSelectContactsGroups = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.contactsGroups,
  );

const makeSelectContactDetailsDialog = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.contactDetailsDialog,
  );

const makeSelectEmployees = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.employees,
  );

export default makeSelectCrm;
export {
  selectCrmDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectEmployees,
  makeSelectContactDialog,
  makeSelectAllContacts,
  makeSelectContactsGroups,
  makeSelectContactDetailsDialog,
};
