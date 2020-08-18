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

const makeSelectStudentDialog = () =>
  createSelector(
    selectCompaniesDomain,
    subState => subState.studentDialog,
  );

const makeSelectGetStudents = () =>
  createSelector(
    selectCompaniesDomain,
    subState => subState.students,
  );

export default makeSelectCompanies;
export {
  selectCompaniesDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectStudentDialog,
  makeSelectGetStudents,
};
