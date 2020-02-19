import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the companyStructurePage state domain
 */

const selectCompanyStructurePageDomain = state => state.companyStructurePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CompanyStructurePage
 */

const makeSelectCompanyStructurePage = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.error,
  );

const makeSelectPartyDialog = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.partyDialog,
  );

const makeSelectSubPartyDialog = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.subPartyDialog,
  );

const makeSelectRoleDialog = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.roleDialog,
  );

const makeSelectParty = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.party,
  );

const makeSelectPartyGroupData = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.partyGroupData,
  );

const makeSelectSelectedPartyGroupData = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.selectedPartyGroupData,
  );

const createNewPartyGroupData = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.createNewPartyGroupData,
  );

const makeSelectAllUsersData = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.getAllUsersData,
  );

const makeSelectCreateNewPartyData = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.createNewPartyData,
  );

export default makeSelectCompanyStructurePage;
export {
  selectCompanyStructurePageDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectPartyDialog,
  makeSelectSubPartyDialog,
  makeSelectRoleDialog,
  makeSelectParty,
  makeSelectPartyGroupData,
  makeSelectSelectedPartyGroupData,
  createNewPartyGroupData,
  makeSelectAllUsersData,
  makeSelectCreateNewPartyData,
};
