/*
 *
 * Settings reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  accountingSetupData: {},
  accountSetupPostData: {},
  accountingPeriodData: [],
  accountPeriodDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  periodOfAccountPostData: {}
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

      // Case to create accounting setup
      case Constants.CREATE_ACCOUNTING_SETUP: {
        console.log('CREATE_ACCOUNTING_SETUP reducer');
        return {
          ...state,
          loading: true,
          error: false,
          accountSetupPostData: action.payload
        };
      }
      case Constants.CREATE_ACCOUNTING_SETUP_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          accountSetupPostData: action.payload
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
        };
      }
      case Constants.GET_ALL_ACCOUNTING_PERIOD_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          accountingPeriodData: action.payload
        };
      }
      case Constants.GET_ALL_ACCOUNTING_PERIOD_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to create accounting period
      case Constants.CREATE_ACCOUNT_PERIOD: {
        return {
          ...state,
          loading: true,
          error: false,
          periodOfAccountPostData: action.payload
        };
      }
      case Constants.CREATE_ACCOUNT_PERIOD_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          periodOfAccountPostData: action.payload
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
          periodOfAccountPostData: action.payload
        };
      }
      case Constants.UPDATE_ACCOUNT_PERIOD_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          periodOfAccountPostData: action.payload
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
