import * as Constants from './constants';

export function createAccountingSetup(data) {
  return {
    type: Constants.CREATE_ACCOUNTING_SETUP,
    payload: data,
  }
}

export function createAccountingSetupSuccess(data) {
  return {
    type: Constants.CREATE_ACCOUNTING_SETUP_SUCCESS,
    payload: data,
  }
}

export function createAccountingSetupError(data) {
  return {
    type: Constants.CREATE_ACCOUNTING_SETUP_ERR,
    payload: data,
  }
}

// Get accounting setup data
export function getAccountingSetup() {
  return {
    type: Constants.GET_ACCOUNTING_SETUP,
  }
}

export function getAccountingSetupSuccess(data) {
  return {
    type: Constants.GET_ACCOUNTING_SETUP_SUCCESS,
    payload: data,
  }
}

export function getAccountingSetupError(data) {
  return {
    type: Constants.GET_ACCOUNTING_SETUP_ERR,
    payload: data,
  }
}

// Get account periods
export function getAllAccountingPeriod() {
  return {
    type: Constants.GET_ALL_ACCOUNTING_PERIOD,
  }
}

export function getAllAccountingPeriodSuccess(data) {
  return {
    type: Constants.GET_ALL_ACCOUNTING_PERIOD_SUCCESS,
    payload: data,
  }
}

export function getAllAccountingPeriodError(data) {
  return {
    type: Constants.GET_ALL_ACCOUNTING_PERIOD_ERR,
    payload: data,
  }
}

// Get business types
export function getBusinessTypes() {
  return {
    type: Constants.GET_BUSINESS_TYPES,
  }
}

export function getBusinessTypesSuccess(data) {
  return {
    type: Constants.GET_BUSINESS_TYPES_SUCCESS,
    payload: data,
  }
}

export function getBusinessTypesError(data) {
  return {
    type: Constants.GET_BUSINESS_TYPES_ERROR,
    payload: data,
  }
}

// Get depreciation area
export function getDepreciationArea() {
  return {
    type: Constants.GET_DEPRECIATION_AREA,
  }
}

export function getDepreciationAreaSuccess(data) {
  return {
    type: Constants.GET_DEPRECIATION_AREA_SUCCESS,
    payload: data,
  }
}

export function getDepreciationAreaError(data) {
  return {
    type: Constants.GET_DEPRECIATION_AREA_ERROR,
    payload: data,
  }
}
// create depreciation area
export function createDepreciationArea(data) {
  return {
    type: Constants.CREATE_DEPRECIATION_AREA,
    payload: data
  }
}

export function createDepreciationAreaSuccess(data) {
  return {
    type: Constants.CREATE_DEPRECIATION_AREA_SUCCESS,
    payload: data,
  }
}

export function createDepreciationAreaError(data) {
  return {
    type: Constants.CREATE_DEPRECIATION_AREA_ERROR,
    payload: data,
  }
}
// update depreciation area
export function updateDepreciationArea(data) {
  return {
    type: Constants.UPDATE_DEPRECIATION_AREA,
    payload: data
  }
}

export function updateDepreciationAreaSuccess(data) {
  return {
    type: Constants.UPDATE_DEPRECIATION_AREA_SUCCESS,
    payload: data,
  }
}

export function updateDepreciationAreaError(data) {
  return {
    type: Constants.UPDATE_DEPRECIATION_AREA_ERROR,
    payload: data,
  }
}

export function getDepreciationTypes() {
  return {
    type: Constants.GET_DEPRECIATION_TYPES,
  }
}

export function getDepreciationTypesSuccess(data) {
  return {
    type: Constants.GET_DEPRECIATION_TYPES_SUCCESS,
    payload: data,
  }
}

export function getDepreciationTypesError(data) {
  return {
    type: Constants.GET_DEPRECIATION_TYPES_ERROR,
    payload: data,
  }
}
// create depreciation type
export function createDepreciationType(data) {
  return {
    type: Constants.CREATE_DEPRECIATION_TYPE,
    payload: data
  }
}

export function createDepreciationTypeSuccess(data) {
  return {
    type: Constants.CREATE_DEPRECIATION_TYPE_SUCCESS,
    payload: data,
  }
}

export function createDepreciationTypeError(data) {
  return {
    type: Constants.CREATE_DEPRECIATION_TYPE_ERROR,
    payload: data,
  }
}
// update depreciation type
export function updateDepreciationType(data) {
  return {
    type: Constants.UPDATE_DEPRECIATION_TYPE,
    payload: data
  }
}

export function updateDepreciationTypeSuccess(data) {
  return {
    type: Constants.UPDATE_DEPRECIATION_TYPE_SUCCESS,
    payload: data,
  }
}

export function updateDepreciationTypeError(data) {
  return {
    type: Constants.UPDATE_DEPRECIATION_TYPE_ERROR,
    payload: data,
  }
}

export function getTaxes() {
  return {
    type: Constants.GET_TAXES,
  }
}

export function getTaxesSuccess(data) {
  return {
    type: Constants.GET_TAXES_SUCCESS,
    payload: data,
  }
}

export function getTaxesError(data) {
  return {
    type: Constants.GET_TAXES_ERROR,
    payload: data,
  }
}
// create tax action
export function createTax(data) {
  return {
    type: Constants.CREATE_TAX,
    payload: data
  }
}

export function createTaxSuccess(data) {
  return {
    type: Constants.CREATE_TAX_SUCCESS,
    payload: data,
  }
}

export function createTaxError(data) {
  return {
    type: Constants.CREATE_TAX_ERROR,
    payload: data,
  }
}
// update tax action
export function updateTax(data) {
  return {
    type: Constants.UPDATE_TAX,
    payload: data
  }
}

export function updateTaxSuccess(data) {
  return {
    type: Constants.UPDATE_TAX_SUCCESS,
    payload: data,
  }
}

export function updateTaxError(data) {
  return {
    type: Constants.UPDATE_TAX_ERROR,
    payload: data,
  }
}

// get assets actions
export function getAssets() {
  return {
    type: Constants.GET_ASSETS,
  }
}

export function getAssetsSuccess(data) {
  return {
    type: Constants.GET_ASSETS_SUCCESS,
    payload: data,
  }
}

export function getAssetsError(data) {
  return {
    type: Constants.GET_ASSETS_ERROR,
    payload: data,
  }
}
// create asset actions
export function createAsset(data) {
  return {
    type: Constants.CREATE_ASSET,
    payload: data
  }
}

export function createAssetSuccess(data) {
  return {
    type: Constants.CREATE_ASSET_SUCCESS,
    payload: data,
  }
}

export function createAssetError(data) {
  return {
    type: Constants.CREATE_ASSET_ERROR,
    payload: data,
  }
}

// get asset types actions
export function getAssetTypes() {
  return {
    type: Constants.GET_ASSET_TYPES,
  }
}

export function getAssetTypesSuccess(data) {
  return {
    type: Constants.GET_ASSET_TYPES_SUCCESS,
    payload: data,
  }
}

export function getAssetTypesError(data) {
  return {
    type: Constants.GET_ASSET_TYPES_ERROR,
    payload: data,
  }
}
// create asset types actions
export function createAssetType(data) {
  return {
    type: Constants.CREATE_ASSET_TYPE,
    payload: data
  }
}

export function createAssetTypeSuccess(data) {
  return {
    type: Constants.CREATE_ASSET_TYPE_SUCCESS,
    payload: data,
  }
}

export function createAssetTypeError(data) {
  return {
    type: Constants.CREATE_ASSET_TYPE_ERROR,
    payload: data,
  }
}
// update asset types actions
export function updateAssetType(data) {
  return {
    type: Constants.UPDATE_ASSET_TYPE,
    payload: data
  }
}

export function updateAssetTypeSuccess(data) {
  return {
    type: Constants.UPDATE_ASSET_TYPE_SUCCESS,
    payload: data,
  }
}

export function updateAssetTypeError(data) {
  return {
    type: Constants.UPDATE_ASSET_TYPE_ERROR,
    payload: data,
  }
}

// Open depreciation area dialog
export function openNewDepreciationAreaDialog() {
  return {
    type: Constants.OPEN_NEW_DEPRECIATION_AREA_DIALOG,
  }
}

export function closeNewDepreciationAreaDialog() {
  return {
    type: Constants.CLOSE_NEW_DEPRECIATION_AREA_DIALOG,
  }
}

// Edit account period dialog
export function openEditDepreciationAreaDialog(data) {
  return {
    type: Constants.OPEN_EDIT_DEPRECIATION_AREA_DIALOG,
    payload: data,
  }
}

export function closeEditDepreciationAreaDialog() {
  return {
    type: Constants.CLOSE_EDIT_DEPRECIATION_AREA_DIALOG,
  }
}

// Open depreciation type dialog
export function openNewDepreciationTypeDialog() {
  return {
    type: Constants.OPEN_NEW_DEPRECIATION_TYPE_DIALOG,
  }
}

export function closeNewDepreciationTypeDialog() {
  return {
    type: Constants.CLOSE_NEW_DEPRECIATION_TYPE_DIALOG,
  }
}

// Edit depreciation type dialog
export function openEditDepreciationTypeDialog(data) {
  return {
    type: Constants.OPEN_EDIT_DEPRECIATION_TYPE_DIALOG,
    payload: data,
  }
}

export function closeEditDepreciationTypeDialog() {
  return {
    type: Constants.CLOSE_EDIT_DEPRECIATION_TYPE_DIALOG,
  }
}

// Open asset type dialog
export function openNewAssetTypeDialog() {
  return {
    type: Constants.OPEN_NEW_ASSET_TYPE_DIALOG,
  }
}

export function closeNewAssetTypeDialog() {
  return {
    type: Constants.CLOSE_NEW_ASSET_TYPE_DIALOG,
  }
}

// Edit asset type dialog
export function openEditAssetTypeDialog(data) {
  return {
    type: Constants.OPEN_EDIT_ASSET_TYPE_DIALOG,
    payload: data,
  }
}

export function closeEditAssetTypeDialog() {
  return {
    type: Constants.CLOSE_EDIT_ASSET_TYPE_DIALOG,
  }
}

// Open asset dialog
export function openNewAssetDialog() {
  return {
    type: Constants.OPEN_NEW_ASSET_DIALOG,
  }
}

export function closeNewAssetDialog() {
  return {
    type: Constants.CLOSE_NEW_ASSET_DIALOG,
  }
}

// Edit asset dialog
export function openEditAssetDialog(data) {
  return {
    type: Constants.OPEN_EDIT_ASSET_DIALOG,
    payload: data,
  }
}

export function closeEditAssetDialog() {
  return {
    type: Constants.CLOSE_EDIT_ASSET_DIALOG,
  }
}
// Open currency dialog
export function openNewCurrencyDialog() {
  return {
    type: Constants.OPEN_NEW_CURRENCY_DIALOG,
  }
}

export function closeNewCurrencyDialog() {
  return {
    type: Constants.CLOSE_NEW_CURRENCY_DIALOG,
  }
}

// Edit currency dialog
export function openEditCurrencyDialog(data) {
  return {
    type: Constants.OPEN_EDIT_CURRENCY_DIALOG,
    payload: data,
  }
}

export function closeEditCurrencyDialog() {
  return {
    type: Constants.CLOSE_EDIT_CURRENCY_DIALOG,
  }
}

// Open tax dialog
export function openNewTaxDialog() {
  return {
    type: Constants.OPEN_NEW_TAX_DIALOG,
  }
}

export function closeNewTaxDialog() {
  return {
    type: Constants.CLOSE_NEW_TAX_DIALOG,
  }
}

// Edit tax dialog
export function openEditTaxDialog(data) {
  return {
    type: Constants.OPEN_EDIT_TAX_DIALOG,
    payload: data,
  }
}

export function closeEditTaxDialog() {
  return {
    type: Constants.CLOSE_EDIT_TAX_DIALOG,
  }
}

// Get currencies
export function getCurrencies() {
  return {
    type: Constants.GET_CURRENCIES,
  }
}

export function getCurrenciesSuccess(data) {
  return {
    type: Constants.GET_CURRENCIES_SUCCESS,
    payload: data,
  }
}

export function getCurrenciesError(data) {
  return {
    type: Constants.GET_CURRENCIES_ERROR,
    payload: data,
  }
}

// create currency action
export function createCurrency(data) {
  return {
    type: Constants.CREATE_CURRENCY,
    payload: data
  }
}

export function createCurrencySuccess(data) {
  return {
    type: Constants.CREATE_CURRENCY_SUCCESS,
    payload: data,
  }
}

export function createCurrencyError(data) {
  return {
    type: Constants.CREATE_CURRENCY_ERROR,
    payload: data,
  }
}
// update currency action
export function updateCurrency(data) {
  return {
    type: Constants.UPDATE_CURRENCY,
    payload: data
  }
}

export function updateCurrencySuccess(data) {
  return {
    type: Constants.UPDATE_CURRENCY_SUCCESS,
    payload: data,
  }
}

export function updateCurrencyError(data) {
  return {
    type: Constants.UPDATE_CURRENCY_ERROR,
    payload: data,
  }
}

// Get default chart of accounts
export function getDefaultChartOfAccounts() {
  return {
    type: Constants.GET_DEFAULT_CHART_OF_ACCOUNTS,
  }
}

export function getDefaultChartOfAccountsSuccess(data) {
  return {
    type: Constants.GET_DEFAULT_CHART_OF_ACCOUNTS_SUCCESS,
    payload: data,
  }
}

export function getDefaultChartOfAccountsError(data) {
  return {
    type: Constants.GET_DEFAULT_CHART_OF_ACCOUNTS_ERROR,
    payload: data,
  }
}

// Get chart of accounts
export function getChartOfAccounts() {
  return {
    type: Constants.GET_CHART_OF_ACCOUNTS,
  }
}

export function getChartOfAccountsSuccess(data) {
  return {
    type: Constants.GET_CHART_OF_ACCOUNTS_SUCCESS,
    payload: data,
  }
}

export function getChartOfAccountsError(data) {
  return {
    type: Constants.GET_CHART_OF_ACCOUNTS_ERROR,
    payload: data,
  }
}

// Open account period dialog
export function openAccountPeriodDialog() {
  return {
    type: Constants.OPEN_ACCOUNT_PERIOD_DIALOG,
  }
}

export function closeAccountPeriodDialog() {
  return {
    type: Constants.CLOSE_ACCOUNT_PERIOD_DIALOG,
  }
}

// Edit account period dialog
export function openEditAccountPeriodDialog(data) {
  return {
    type: Constants.EDIT_OPEN_ACCOUNT_PERIOD_DIALOG,
    payload: data,
  }
}

export function closeEditAccountPeriodDialog() {
  return {
    type: Constants.EDIT_CLOSE_ACCOUNT_PERIOD_DIALOG,
  }
}

// Edit account period dialog
export function openAccountPeriodCloseDialog(data) {
  return {
    type: Constants.OPEN_DIALOG_CLOSE_ACCOUNT_PERIOD,
    payload: data,
  };
}

export function closeAccountPeriodCloseDialog() {
  return {
    type: Constants.CLOSE_DIALOG_CLOSE_ACCOUNT_PERIOD,
  }
}

// Create accounting period
export function createAccountPeriod(data) {
  return {
    type: Constants.CREATE_ACCOUNT_PERIOD,
    payload: data,
  }
}

export function createAccountPeriodSuccess(data) {
  return {
    type: Constants.CREATE_ACCOUNT_PERIOD_SUCCESS,
    payload: data,
  }
}

export function createAccountPeriodError(data) {
  return {
    type: Constants.CREATE_ACCOUNT_PERIOD_ERR,
    payload: data,
  }
}

// update accounting period
export function updateAccountPeriod(data) {
  return {
    type: Constants.UPDATE_ACCOUNT_PERIOD,
    payload: data,
  }
}

export function updateAccountPeriodSuccess(data) {
  return {
    type: Constants.UPDATE_ACCOUNT_PERIOD_SUCCESS,
    payload: data,
  }
}

export function updateAccountPeriodError(data) {
  return {
    type: Constants.UPDATE_ACCOUNT_PERIOD_ERR,
    payload: data,
  }
}

// update accounting period status
export function updateAccountPeriodStatus(data) {
  return {
    type: Constants.UPDATE_ACCOUNT_PERIOD_STATUS,
    payload: data,
  }
}

export function updateAccountPeriodStatusSuccess(data) {
  return {
    type: Constants.UPDATE_ACCOUNT_PERIOD_STATUS_SUCCESS,
    payload: data,
  }
}

export function updateAccountPeriodStatusError(data) {
  return {
    type: Constants.UPDATE_ACCOUNT_PERIOD_STATUS_ERR,
    payload: data,
  }
}

// Set accounting period as active
export function setAccountPeriodAsActive(data) {
  return {
    type: Constants.SET_ACCOUNT_PERIOD_AS_ACTIVE,
    payload: data,
  }
}

export function setAccountPeriodAsActiveSuccess(data) {
  return {
    type: Constants.SET_ACCOUNT_PERIOD_AS_ACTIVE_SUCCESS,
    payload: data,
  }
}

export function setAccountPeriodAsActiveError(data) {
  return {
    type: Constants.SET_ACCOUNT_PERIOD_AS_ACTIVE_ERR,
    payload: data,
  }
}

