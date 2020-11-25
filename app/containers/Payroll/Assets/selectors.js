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

const makeSelectGetChartOfAccounts = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.chartOfAccounts,
  );

const makeSelectGetBranches = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.branches,
  );

const makeSelectAssetDialog = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.assetDialog,
  );

const makeSelectAssetDisposalDialog = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.assetDisposalDialog,
  );

const makeSelectAssetTypeDialog = () =>
  createSelector(
    selectFixedAssetsDomain,
    substate => substate.assetTypeDialog,
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
  makeSelectGetChartOfAccounts,
  makeSelectGetBranches,
  makeSelectAssetDialog,
  makeSelectAssetDisposalDialog,
  makeSelectAssetTypeDialog,
  makeSelectAssets,
  makeSelectAssetById,
  makeSelectAssetTypes,
};
