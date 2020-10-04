import * as Constants from './constants';


// get assets actions
export function getAssets() {
  return {
    type: Constants.GET_ASSETS,
  };
}

export function getAssetsSuccess(data) {
  return {
    type: Constants.GET_ASSETS_SUCCESS,
    payload: data,
  };
}

export function getAssetsError(data) {
  return {
    type: Constants.GET_ASSETS_ERROR,
    payload: data,
  };
}
// get asset by id actions
export function getAssetById(data) {
  return {
    type: Constants.GET_ASSET_BY_ID,
    payload: { id: data }
  };
}

export function getAssetByIdSuccess(data) {
  return {
    type: Constants.GET_ASSET_BY_ID_SUCCESS,
    payload: data,
  };
}

export function getAssetByIdError(data) {
  return {
    type: Constants.GET_ASSET_BY_ID_ERROR,
    payload: data,
  };
}

// create asset actions
export function createAsset(data) {
  return {
    type: Constants.CREATE_ASSET,
    payload: data,
  };
}

export function createAssetSuccess(data) {
  return {
    type: Constants.CREATE_ASSET_SUCCESS,
    payload: data,
  };
}

export function createAssetError(data) {
  return {
    type: Constants.CREATE_ASSET_ERROR,
    payload: data,
  };
}

// dispose asset actions
export function disposeAsset(data) {
  return {
    type: Constants.DISPOSE_ASSET,
    payload: data,
  };
}

export function disposeAssetSuccess(data) {
  return {
    type: Constants.DISPOSE_ASSET_SUCCESS,
    payload: data,
  };
}

export function disposeAssetError(data) {
  return {
    type: Constants.DISPOSE_ASSET_ERROR,
    payload: data,
  };
}

// update asset actions
export function updateAsset(data) {
  return {
    type: Constants.UPDATE_ASSET,
    payload: data
  }
}

export function updateAssetSuccess(data) {
  return {
    type: Constants.UPDATE_ASSET_SUCCESS,
    payload: data,
  }
}

export function updateAssetError(data) {
  return {
    type: Constants.UPDATE_ASSET_ERROR,
    payload: data,
  }
}

// get asset types actions
export function getAssetTypes() {
  return {
    type: Constants.GET_ASSET_TYPES,
  };
}

export function getAssetTypesSuccess(data) {
  return {
    type: Constants.GET_ASSET_TYPES_SUCCESS,
    payload: data,
  };
}

export function getAssetTypesError(data) {
  return {
    type: Constants.GET_ASSET_TYPES_ERROR,
    payload: data,
  };
}
// create asset types actions
export function createAssetType(data) {
  return {
    type: Constants.CREATE_ASSET_TYPE,
    payload: data,
  };
}

export function createAssetTypeSuccess(data) {
  return {
    type: Constants.CREATE_ASSET_TYPE_SUCCESS,
    payload: data,
  };
}

export function createAssetTypeError(data) {
  return {
    type: Constants.CREATE_ASSET_TYPE_ERROR,
    payload: data,
  };
}

// Open asset type dialog
export function openNewAssetTypeDialog() {
  return {
    type: Constants.OPEN_NEW_ASSET_TYPE_DIALOG,
  };
}

export function closeNewAssetTypeDialog() {
  return {
    type: Constants.CLOSE_NEW_ASSET_TYPE_DIALOG,
  };
}

// Edit asset type dialog
export function openEditAssetTypeDialog(data) {
  return {
    type: Constants.OPEN_EDIT_ASSET_TYPE_DIALOG,
    payload: data,
  };
}

export function closeEditAssetTypeDialog() {
  return {
    type: Constants.CLOSE_EDIT_ASSET_TYPE_DIALOG,
  };
}

// Open asset dialog
export function openNewAssetDialog() {
  return {
    type: Constants.OPEN_NEW_ASSET_DIALOG,
  };
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

// Open asset disposal dialog
export function openAssetDisposalDialog() {
  return {
    type: Constants.OPEN_ASSET_DISPOSAL_DIALOG,
  }
}

export function closeAssetDisposalDialog() {
  return {
    type: Constants.CLOSE_ASSET_DISPOSAL_DIALOG,
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
