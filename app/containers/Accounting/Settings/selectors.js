import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the settings state domain
 */

const selectSettingsDomain = state => state.settings || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Settings
 */

const makeSelectSettings = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectSettingsDomain,
    subState => subState.loading,
  );

const makeSelectGetAccountingSetupData = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.accountingSetupData,
  );

const makeSelectGetAllAccountingPeriodData = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.accountingPeriodData,
  );

const makeSelectAccountPeriodDialog = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.accountPeriodDialog,
  );

const makeSelectBusinessTypes = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.businessTypes,
  );

const makeSelectCurrencies = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.currencies,
  );

export default makeSelectSettings;

export {
  selectSettingsDomain,
  makeSelectLoading,
  makeSelectGetAccountingSetupData,
  makeSelectGetAllAccountingPeriodData,
  makeSelectAccountPeriodDialog,
  makeSelectBusinessTypes,
  makeSelectCurrencies,
};
