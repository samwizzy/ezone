import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  chartOfAccounts: [],
  assets: [],
  assetById: null,
  assetTypes: [],
  assetDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  assetTypeDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  assetDisposalDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const settingsReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      // Open asset dialog
      case Constants.OPEN_NEW_ASSET_DIALOG: {
        return {
          ...state,
          assetDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_ASSET_DIALOG: {
        return {
          ...state,
          assetDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Edit asset dialog
      case Constants.OPEN_EDIT_ASSET_DIALOG: {
        return {
          ...state,
          assetDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_ASSET_DIALOG: {
        return {
          ...state,
          assetDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      // Open asset disposal dialog
      case Constants.OPEN_ASSET_DISPOSAL_DIALOG: {
        return {
          ...state,
          assetDisposalDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_ASSET_DISPOSAL_DIALOG: {
        return {
          ...state,
          assetDisposalDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Open asset type dialog
      case Constants.OPEN_NEW_ASSET_TYPE_DIALOG: {
        return {
          ...state,
          assetTypeDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_ASSET_TYPE_DIALOG: {
        return {
          ...state,
          assetTypeDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Edit asset type dialog
      case Constants.OPEN_EDIT_ASSET_TYPE_DIALOG: {
        return {
          ...state,
          assetTypeDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_ASSET_TYPE_DIALOG: {
        return {
          ...state,
          assetTypeDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      // Case to get all chart of accounts
      case Constants.GET_CHART_OF_ACCOUNTS: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_CHART_OF_ACCOUNTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          chartOfAccounts: action.payload,
        };
      }
      case Constants.GET_CHART_OF_ACCOUNTS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get assets
      case Constants.GET_ASSETS: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ASSETS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          assets: action.payload,
        };
      }
      case Constants.GET_ASSETS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      // Case to get asset by id
      case Constants.GET_ASSET_BY_ID: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ASSET_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          assetById: action.payload,
        };
      }
      case Constants.GET_ASSET_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to create asset
      case Constants.CREATE_ASSET: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.CREATE_ASSET_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_ASSET_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      // Case to dispose asset
      case Constants.DISPOSE_ASSET: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.DISPOSE_ASSET_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.DISPOSE_ASSET_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      // Case to update asset
      case Constants.UPDATE_ASSET: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.UPDATE_ASSET_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        }
      }
      case Constants.UPDATE_ASSET_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }
      // Case to get asset types
      case Constants.GET_ASSET_TYPES: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ASSET_TYPES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          assetTypes: action.payload,
        };
      }
      case Constants.GET_ASSET_TYPES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      // Case to create type asset
      case Constants.CREATE_ASSET_TYPE: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.CREATE_ASSET_TYPE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_ASSET_TYPE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default settingsReducer;
