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

const makeSelectCrmCompanies = () =>
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

const makeSelectGetAllCompanies = () =>
  createSelector(
    selectCompaniesDomain,
    subState => subState.getAllCompanies,
  );

const makeSelectEmployees = () =>
  createSelector(
    selectCompaniesDomain,
    subState => subState.employees,
  );


export default makeSelectCrmCompanies;
export {
  selectCompaniesDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectEmployees,
  makeSelectCompanyDialog,
  makeSelectGetAllCompanies,
  makeSelectCompanyDetailsDialog,
};
