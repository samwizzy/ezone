import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the payrun state domain
 */

const selectPayrunDomain = state => state.payrun || initialState;

const makeSelectPayrun = () =>
  createSelector(
    selectPayrunDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectPayrunDomain,
    subState => subState.loading,
  );

const makeSelectPayrunDialog = () =>
  createSelector(
    selectPayrunDomain,
    substate => substate.payrunDialog,
  );

const makeSelectPayrunConfirmDialog = () =>
  createSelector(
    selectPayrunDomain,
    substate => substate.payrunConfirmDialog,
  );

const makeSelectPayrunData = () =>
  createSelector(
    selectPayrunDomain,
    substate => substate.payruns,
  );

const makeSelectPayrunByIdData = () =>
  createSelector(
    selectPayrunDomain,
    substate => substate.payrun,
  );

export default makeSelectPayrun;

export {
  selectPayrunDomain,
  makeSelectLoading,
  makeSelectPayrunDialog,
  makeSelectPayrunConfirmDialog,
  makeSelectPayrunData,
  makeSelectPayrunByIdData,
};
