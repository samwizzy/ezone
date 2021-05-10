import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the applications state domain
 */

const selectApplicationsDomain = state => state.applications || initialState;

const makeSelectApplicationsPage = () =>
  createSelector(
    selectApplicationsDomain,
    subState => subState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectApplicationsDomain,
    subState => subState.loading,
  );

const makeSelectModules = () =>
  createSelector(
    selectApplicationsDomain,
    subState => subState.modules,
  );

const makeSelectModulesByAccessOffers = () =>
  createSelector(
    selectApplicationsDomain,
    subState => subState.modulesByAccessOffers,
  );

const makeSelectRegModsDetails = () =>
  createSelector(
    selectApplicationsDomain,
    subState => subState.regModsDetails,
  );

const makeSelectPaymentGateways = () =>
  createSelector(
    selectApplicationsDomain,
    subState => subState.paymentGateways,
  );

const makeSelectPaymentVerified = () =>
  createSelector(
    selectApplicationsDomain,
    subState => subState.paymentVerified,
  );

export default makeSelectApplicationsPage;
export {
  selectApplicationsDomain,
  makeSelectLoading,
  makeSelectModules,
  makeSelectModulesByAccessOffers,
  makeSelectRegModsDetails,
  makeSelectPaymentGateways,
  makeSelectPaymentVerified,
};
