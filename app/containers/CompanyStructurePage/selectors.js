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

const makeSelectNewPositionDialog = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.newPositionDialog,
  );

const makeSelectCreateNewPositionData = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.createNewPositionData,
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

const makeSelectAddEmployeeToPositionData = () =>
  createSelector(
    selectCompanyStructurePageDomain,
    subState => subState.addEmployeeToPositionData,
  );

// const makeSelectGetAllEmployees = () =>
//   createSelector(
//     selectCompanyStructurePageDomain,
//     subState => subState.allEmployees,
//   );

// const makeSelectSelectedParty = () =>
//   createSelector(
//     selectCompanyStructurePageDomain,
//     subState => subState.selectedParty,
//   );

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
  createNewPartyGroupData,
  makeSelectAllUsersData,
  makeSelectCreateNewPartyData,
  makeSelectNewPartiesDialog,
  makeSelectNewPositionDialog,
  makeSelectCreateNewPositionData,
  makeSelectGetAllPositions,
  makeSelectAddEmployeeToPositionDialog,
  makeSelectAddEmployeeToPositionData,
  // makeSelectGetAllEmployees,
  // makeSelectSelectedParty,
  // organization export function
  makeSelectEditColorDialog,
  makeSelectEditCompanyDialog,
  makeSelectBranchDialog,
  makeSelectDepartmentDialog,
  makeSelectCompanyInfo,
  makeSelectUpdateCompanyInfoData,
  makeSelectCreateNewPartiesData,
  makeSelectUpdatePartyGroupData,
};
