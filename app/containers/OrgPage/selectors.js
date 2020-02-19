import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orgPage state domain
 */

const selectOrgPageDomain = state => state.orgPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrgPage
 */

const makeSelectOrgPage = () =>
  createSelector(
    selectOrgPageDomain,
    subState => subState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectOrgPageDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectOrgPageDomain,
    subState => subState.error,
  );

const makeSelectEditColorDialog = () =>
  createSelector(
    selectOrgPageDomain,
    subState => subState.colorDialog,
  );

const makeSelectEditCompanyDialog = () =>
  createSelector(
    selectOrgPageDomain,
    subState => subState.companyDialog,
  );

const makeSelectBranchDialog = () =>
  createSelector(
    selectOrgPageDomain,
    subState => subState.branchDialog,
  );

const makeSelectDepartmentDialog = () =>
  createSelector(
    selectOrgPageDomain,
    subState => subState.departmentDialog,
  );

const makeSelectCompanyInfo = () =>
  createSelector(
    selectOrgPageDomain,
    subState => subState.companyInfo,
  );

const makeSelectUpdateCompanyInfoData = () =>
  createSelector(
    selectOrgPageDomain,
    subState => subState.updateCompanyInfoData,
  );

export default makeSelectOrgPage;
export {
  selectOrgPageDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectEditColorDialog,
  makeSelectEditCompanyDialog,
  makeSelectBranchDialog,
  makeSelectDepartmentDialog,
  makeSelectCompanyInfo,
  makeSelectUpdateCompanyInfoData,
};
