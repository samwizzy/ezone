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

const makeSelectGetAccountingPeriods = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.accountingPeriods,
  );

const makeSelectGetChartOfAccounts = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.chartOfAccounts,
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

const makeSelectDepreciationArea = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.depreciationArea,
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
  makeSelectGetAccountingPeriods,
  makeSelectGetChartOfAccounts,
  makeSelectAccountPeriodDialog,
  makeSelectBusinessTypes,
  makeSelectDepreciationArea,
  makeSelectCurrencies,
};
