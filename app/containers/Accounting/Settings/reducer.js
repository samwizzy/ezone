
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  accountingSetupData: null,
  accountSetupPostData: {},
  accountingPeriodData: [],
  businessTypes: [],
  currencies: [],
  accountPeriodDialog: {
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
          accountingPeriodData: action.payload
        }
      }
      case Constants.GET_ALL_ACCOUNTING_PERIOD_ERR: {
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

      // Case to create accounting period
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
    }
  });

export default settingsReducer;
