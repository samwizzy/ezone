import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the crm state domain
 */

const selectCrmDomain = state => state.crmContactGroups || initialState;

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

const makeSelectContactGroupsDialog = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.contactGroupsDialog,
  );

const makeSelectAssignContactDialog = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.assignContactDialog,
  );

const makeSelectCreateNewContactGroup = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.createNewContactGroup,
  );

const makeSelectUpdateContactGroup = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.updateContactGroup,
  );

const makeSelectAllContactsGroup = () =>
  createSelector(
    selectCrmDomain,
    subState => subState.allContactsGroup,
  );

export default makeSelectCrm;
export {
  selectCrmDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectContactGroupsDialog,
  makeSelectAssignContactDialog,
  makeSelectCreateNewContactGroup,
  makeSelectUpdateContactGroup,
  makeSelectAllContactsGroup,
};
