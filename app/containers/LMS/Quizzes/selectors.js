import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the companies state domain
 */

const selectCompaniesDomain = state => state.crmCompanies || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Companies
 */

const makeSelectCompanies = () =>
  createSelector(
    selectCompaniesDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectCompaniesDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectCompaniesDomain,
    subState => subState.error,
  );

const makeSelectCompanyDialog = () =>
  createSelector(
    selectCompaniesDomain,
    subState => subState.companyDialog,
  );

const makeSelectCompanyDetailsDialog = () =>
  createSelector(
    selectCompaniesDomain,
    subState => subState.companyDetailsDialog,
  );

const makeSelectCreateNewCompany = () =>
  createSelector(
    selectCompaniesDomain,
    subState => subState.newCompanyDetails,
  );

const makeSelectUpdateCompany = () =>
  createSelector(
    selectCompaniesDomain,
    subState => subState.updateCompanyDetails,
  );

const makeSelectGetAllCompanies = () =>
  createSelector(
    selectCompaniesDomain,
    subState => subState.getAllCompanies,
  );

export default makeSelectCompanies;
export {
  selectCompaniesDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectCompanyDialog,
  makeSelectCreateNewCompany,
  makeSelectUpdateCompany,
  makeSelectGetAllCompanies,
  makeSelectCompanyDetailsDialog,
};
