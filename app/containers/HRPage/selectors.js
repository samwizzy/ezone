/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHR = state => state.hrPage || initialState;

const makeSelectHRPage = () =>
  createSelector(
    selectHR,
    hrState => hrState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectHR,
    hrState => hrState.loading,
  );

const makeSelectEmployees = () =>
  createSelector(
    selectHR,
    hrState => hrState.employees,
  );

const makeSelectEmployee = () =>
  createSelector(
    selectHR,
    hrState => hrState.employee,
  );

export default makeSelectHRPage;
export { 
  selectHR,
  makeSelectEmployees,
  makeSelectLoading,
  makeSelectEmployee
};
