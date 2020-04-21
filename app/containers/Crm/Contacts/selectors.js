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

const makeSelectContactDetailsDialog = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.contactDetailsDialog,
  );

export default makeSelectCrm;
export {
  selectCrmDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectContactDialog,
  makeSelectContactDetailsDialog,
};
