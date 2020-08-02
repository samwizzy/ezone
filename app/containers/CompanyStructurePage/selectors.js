import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the companyStructurePage state domain
 */

const selectCompanyStructurePageDomain = state =>
  state.companyStructurePage || initialState;

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

const makeSelectNewPartyGroupDialog = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.newPartyGroupDialog,
  );

const makeSelectNewPartyDialog = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.newPartyDialog,
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

const makeSelectSelectedParty = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.selectedParty,
  );

const makeSelectSelectedPosition = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.selectedPosition,
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

const makeSelectUpdatePartyGroupData = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.updatePartyGroupData,
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

const makeSelectPartyId = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.partyId,
  );

const makeSelectGetPartyById = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.getPartyById,
  );

const makeSelectUpdatePartyData = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.updatePartyData,
  );

const makeSelectCreateNewPartiesData = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.createNewPartiesData,
  );

const makeSelectNewPartiesDialog = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.newPartiesDialog,
  );

const makeSelectUpdatePartiesData = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.updatePartiesData,
  );

const makeSelectPositionDialog = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.positionDialog,
  );

const makeSelectUpdatePositionData = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.updatePositionData,
  );

const makeSelectGetAllPositions = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.allPositions,
  );

const makeSelectAddEmployeeToPositionDialog = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.addEmployeeToPositionDialog,
  );

const makeSelectGetAllTags = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.allTags,
  );

/** *****************************************************************
 * Organization constants
 ******************************************************************* */

// organization selectors
const makeSelectEditColorDialog = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.colorDialog,
  );

const makeSelectEditCompanyDialog = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.companyDialog,
  );

const makeSelectBranchDialog = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.branchDialog,
  );

const makeSelectDepartmentDialog = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.departmentDialog,
  );

const makeSelectCompanyInfo = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.companyInfo,
  );

const makeSelectUpdateCompanyInfoData = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.updateCompanyInfoData,
  );

export default makeSelectCompanyStructurePage;
export {
  selectCompanyStructurePageDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectNewPartyGroupDialog,
  makeSelectNewPartyDialog,
  makeSelectRoleDialog,
  makeSelectParty,
  makeSelectPartyGroupData,
  makeSelectSelectedPartyGroupData,
  makeSelectAllUsersData,
  makeSelectCreateNewPartyData,
  makeSelectNewPartiesDialog,
  makeSelectPositionDialog,
  makeSelectGetAllPositions,
  makeSelectAddEmployeeToPositionDialog,
  makeSelectSelectedParty,
  makeSelectSelectedPosition,
  // organization export function
  makeSelectEditColorDialog,
  makeSelectEditCompanyDialog,
  makeSelectBranchDialog,
  makeSelectDepartmentDialog,
  makeSelectCompanyInfo,
  makeSelectUpdateCompanyInfoData,
  makeSelectCreateNewPartiesData,
  makeSelectUpdatePartyGroupData,
  makeSelectUpdatePartyData,
  makeSelectUpdatePartiesData,
  makeSelectUpdatePositionData,
  makeSelectGetAllTags,
  makeSelectPartyId,
  makeSelectGetPartyById,
};
