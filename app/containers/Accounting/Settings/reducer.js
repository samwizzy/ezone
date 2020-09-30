
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  accountingSetupData: null,
  accountingPeriods: [],
  chartOfAccounts: [],
  defaultChartOfAccounts: [],
  depreciationArea: [],
  depreciationTypes: [],
  businessTypes: [],
  currencies: [],
  taxes: [],
  assets: [],
  assetTypes: [],
  accountPeriodDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  depreciationAreaDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  depreciationTypeDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
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
  taxDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  currencyDialog: {
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

      // Open account period dialog
      case Constants.OPEN_ACCOUNT_PERIOD_DIALOG: {
        return {
          ...state,
          accountPeriodDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_ACCOUNT_PERIOD_DIALOG: {
        return {
          ...state,
          accountPeriodDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Edit account period dialog
      case Constants.EDIT_OPEN_ACCOUNT_PERIOD_DIALOG: {
        return {
          ...state,
          accountPeriodDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.EDIT_CLOSE_ACCOUNT_PERIOD_DIALOG: {
        return {
          ...state,
          accountPeriodDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      // Close account period dialog
      case Constants.OPEN_DIALOG_CLOSE_ACCOUNT_PERIOD: {
        return {
          ...state,
          accountPeriodDialog: {
            type: 'close',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_DIALOG_CLOSE_ACCOUNT_PERIOD: {
        return {
          ...state,
          accountPeriodDialog: {
            type: 'close',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      // Open depreciation areas dialog
      case Constants.OPEN_NEW_DEPRECIATION_AREA_DIALOG: {
        return {
          ...state,
          depreciationAreaDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_DEPRECIATION_AREA_DIALOG: {
        return {
          ...state,
          depreciationAreaDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Edit depreciation area dialog
      case Constants.OPEN_EDIT_DEPRECIATION_AREA_DIALOG: {
        return {
          ...state,
          depreciationAreaDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_DEPRECIATION_AREA_DIALOG: {
        return {
          ...state,
          depreciationAreaDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      // Open depreciation type dialog
      case Constants.OPEN_NEW_DEPRECIATION_TYPE_DIALOG: {
        return {
          ...state,
          depreciationTypeDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_DEPRECIATION_TYPE_DIALOG: {
        return {
          ...state,
          depreciationTypeDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Edit depreciation type dialog
      case Constants.OPEN_EDIT_DEPRECIATION_TYPE_DIALOG: {
        return {
          ...state,
          depreciationTypeDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_DEPRECIATION_TYPE_DIALOG: {
        return {
          ...state,
          depreciationTypeDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }
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

      // Open tax dialog
      case Constants.OPEN_NEW_TAX_DIALOG: {
        return {
          ...state,
          taxDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_TAX_DIALOG: {
        return {
          ...state,
          taxDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Edit asset type dialog
      case Constants.OPEN_EDIT_TAX_DIALOG: {
        return {
          ...state,
          taxDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_TAX_DIALOG: {
        return {
          ...state,
          taxDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      // Open currency dialog
      case Constants.OPEN_NEW_CURRENCY_DIALOG: {
        return {
          ...state,
          currencyDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_CURRENCY_DIALOG: {
        return {
          ...state,
          currencyDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Edit currency dialog
      case Constants.OPEN_EDIT_CURRENCY_DIALOG: {
        return {
          ...state,
          currencyDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_CURRENCY_DIALOG: {
        return {
          ...state,
          currencyDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      // Case to create accounting setup
      case Constants.CREATE_ACCOUNTING_SETUP: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.CREATE_ACCOUNTING_SETUP_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_ACCOUNTING_SETUP_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get accounting setup
      case Constants.GET_ACCOUNTING_SETUP: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ACCOUNTING_SETUP_SUCCESS: {
        console.log(action.payload, "action.payload GET_ACCOUNTING_SETUP_SUCCESS")
        return {
          ...state,
          loading: false,
          error: false,
          accountingSetupData: action.payload
        };
      }
      case Constants.GET_ACCOUNTING_SETUP_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get all accounting periods
      case Constants.GET_ALL_ACCOUNTING_PERIOD: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.GET_ALL_ACCOUNTING_PERIOD_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          accountingPeriods: action.payload
        }
      }
      case Constants.GET_ALL_ACCOUNTING_PERIOD_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }

      // Case to get default chart of accounts
      case Constants.GET_DEFAULT_CHART_OF_ACCOUNTS: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.GET_DEFAULT_CHART_OF_ACCOUNTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          defaultChartOfAccounts: action.payload
        }
      }
      case Constants.GET_DEFAULT_CHART_OF_ACCOUNTS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }

      // Case to get all chart of accounts
      case Constants.GET_CHART_OF_ACCOUNTS: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.GET_CHART_OF_ACCOUNTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          chartOfAccounts: action.payload
        }
      }
      case Constants.GET_CHART_OF_ACCOUNTS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }

      // Case to get business types
      case Constants.GET_BUSINESS_TYPES: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.GET_BUSINESS_TYPES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          businessTypes: action.payload
        }
      }
      case Constants.GET_BUSINESS_TYPES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }

      // Case to get depreciation area 
      case Constants.GET_DEPRECIATION_AREA: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.GET_DEPRECIATION_AREA_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          depreciationArea: action.payload
        }
      }
      case Constants.GET_DEPRECIATION_AREA_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }
      // Case to create depreciation area 
      case Constants.CREATE_DEPRECIATION_AREA: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.CREATE_DEPRECIATION_AREA_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        }
      }
      case Constants.CREATE_DEPRECIATION_AREA_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }
      // Case to update depreciation area 
      case Constants.UPDATE_DEPRECIATION_AREA: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.UPDATE_DEPRECIATION_AREA_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        }
      }
      case Constants.UPDATE_DEPRECIATION_AREA_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }

      // Case to get depreciation types 
      case Constants.GET_DEPRECIATION_TYPES: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.GET_DEPRECIATION_TYPES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          depreciationTypes: action.payload
        }
      }
      case Constants.GET_DEPRECIATION_TYPES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }
      // Case to create depreciation types 
      case Constants.CREATE_DEPRECIATION_TYPE: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.CREATE_DEPRECIATION_TYPE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        }
      }
      case Constants.CREATE_DEPRECIATION_TYPE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }
      // Case to update depreciation type
      case Constants.UPDATE_DEPRECIATION_TYPE: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.UPDATE_DEPRECIATION_TYPE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        }
      }
      case Constants.UPDATE_DEPRECIATION_TYPE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }

      // Case to get currencies
      case Constants.GET_CURRENCIES: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.GET_CURRENCIES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          currencies: action.payload
        }
      }
      case Constants.GET_CURRENCIES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }
      // Case to create currency
      case Constants.CREATE_CURRENCY: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.CREATE_CURRENCY_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        }
      }
      case Constants.CREATE_CURRENCY_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }
      // Case to update currency
      case Constants.UPDATE_CURRENCY: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.UPDATE_CURRENCY_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        }
      }
      case Constants.UPDATE_CURRENCY_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }

      // Case to get taxes
      case Constants.GET_TAXES: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.GET_TAXES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          taxes: action.payload
        }
      }
      case Constants.GET_TAXES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }
      // Case to create tax
      case Constants.CREATE_TAX: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.CREATE_TAX_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        }
      }
      case Constants.CREATE_TAX_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }
      // Case to update tax
      case Constants.UPDATE_TAX: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.UPDATE_TAX_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        }
      }
      case Constants.UPDATE_TAX_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }

      // Case to get assets
      case Constants.GET_ASSETS: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.GET_ASSETS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          assets: action.payload
        }
      }
      case Constants.GET_ASSETS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }
      // Case to create asset
      case Constants.CREATE_ASSET: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.CREATE_ASSET_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        }
      }
      case Constants.CREATE_ASSET_ERROR: {
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
        }
      }
      case Constants.GET_ASSET_TYPES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          assetTypes: action.payload
        }
      }
      case Constants.GET_ASSET_TYPES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }

      // Case to create asset type
      case Constants.CREATE_ASSET_TYPE: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.CREATE_ASSET_TYPE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        }
      }
      case Constants.CREATE_ASSET_TYPE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }
      // Case to update asset type
      case Constants.UPDATE_ASSET_TYPE: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.UPDATE_ASSET_TYPE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        }
      }
      case Constants.UPDATE_ASSET_TYPE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }

      // Case to create accounting period
      case Constants.CREATE_ACCOUNT_PERIOD: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.CREATE_ACCOUNT_PERIOD_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_ACCOUNT_PERIOD_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to update accounting period
      case Constants.UPDATE_ACCOUNT_PERIOD: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.UPDATE_ACCOUNT_PERIOD_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_ACCOUNT_PERIOD_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to UPDATE accounting period
      case Constants.UPDATE_ACCOUNT_PERIOD_STATUS: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.UPDATE_ACCOUNT_PERIOD_STATUS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_ACCOUNT_PERIOD_STATUS_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default settingsReducer;
