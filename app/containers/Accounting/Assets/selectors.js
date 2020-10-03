import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the settings state domain
 */

const selectFixedAssetsDomain = state => state.fixedAssets || initialState;

const makeSelectFixedAssets = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectFixedAssetsDomain,
    subState => subState.loading,
  );

const makeSelectGetAccountingSetupData = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.accountingSetupData,
  );

const makeSelectGetAccountingPeriods = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.accountingPeriods,
  );

const makeSelectGetChartOfAccounts = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.chartOfAccounts,
  );

const makeSelectAccountPeriodDialog = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.accountPeriodDialog,
  );

const makeSelectDepreciationAreaDialog = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.depreciationAreaDialog,
  );

const makeSelectDepreciationTypeDialog = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.depreciationTypeDialog,
  );

const makeSelectAssetDialog = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.assetDialog,
  );

const makeSelectAssetTypeDialog = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.assetTypeDialog,
  );

const makeSelectTaxDialog = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.taxDialog,
  );

const makeSelectCurrencyDialog = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.currencyDialog,
  );

const makeSelectBusinessTypes = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.businessTypes,
  );

const makeSelectDepreciationArea = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.depreciationArea,
  );

const makeSelectDepreciationTypes = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.depreciationTypes,
  );

const makeSelectCurrencies = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.currencies,
  );

const makeSelectTaxes = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.taxes,
  );

const makeSelectAssets = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.assets,
  );

const makeSelectAssetById = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.assetById,
  );

const makeSelectAssetTypes = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.assetTypes,
  );

export default makeSelectFixedAssets;

export {
  selectFixedAssetsDomain,
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
  makeSelectAssetById,
  makeSelectAssetTypes,
};
