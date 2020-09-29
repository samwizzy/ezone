import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the settings state domain
 */

const selectSettingsDomain = state => state.settings || initialState;

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

const makeSelectDepreciationAreaDialog = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.depreciationAreaDialog,
  );

const makeSelectDepreciationTypeDialog = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.depreciationTypeDialog,
  );

const makeSelectAssetDialog = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.assetDialog,
  );

const makeSelectAssetTypeDialog = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.assetTypeDialog,
  );

const makeSelectTaxDialog = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.taxDialog,
  );

const makeSelectCurrencyDialog = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.currencyDialog,
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

const makeSelectDepreciationTypes = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.depreciationTypes,
  );

const makeSelectCurrencies = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.currencies,
  );

const makeSelectTaxes = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.taxes,
  );

const makeSelectAssets = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.assets,
  );

const makeSelectAssetTypes = () =>
  createSelector(
    selectSettingsDomain,
    substate => substate.assetTypes,
  );

export default makeSelectSettings;

export {
  selectSettingsDomain,
  makeSelectLoading,
  makeSelectGetAccountingSetupData,
  makeSelectGetAccountingPeriods,
  makeSelectGetChartOfAccounts,
  makeSelectAccountPeriodDialog,
  makeSelectDepreciationAreaDialog,
  makeSelectDepreciationTypeDialog,
  makeSelectAssetDialog,
  makeSelectAssetTypeDialog,
  makeSelectTaxDialog,
  makeSelectCurrencyDialog,
  makeSelectBusinessTypes,
  makeSelectDepreciationArea,
  makeSelectDepreciationTypes,
  makeSelectCurrencies,
  makeSelectTaxes,
  makeSelectAssets,
  makeSelectAssetTypes,
};
