/*
 *
 * Chart reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  accountDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  confirmDeleteDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  accountTypeData: [],
  parentAccountTypeData: [],
  chartOfAccountPostData: {},
  chartOfAccountData: [],
};

/* eslint-disable default-case, no-param-reassign */
const accountChartReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {

      // Open dialog for adding new account to chart of account
      case Constants.OPEN_NEW_ACCOUNT_DIALOG: {
        return {
          ...state,
          accountDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_ACCOUNT_DIALOG: {
        return {
          ...state,
          accountDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Edit dialog for account
      case Constants.EDIT_OPEN_ACCOUNT_DIALOG: {
        return {
          ...state,
          accountDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.EDIT_CLOSE_ACCOUNT_DIALOG: {
        return {
          ...state,
          accountDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      // Confirm delete dialog
      case Constants.OPEN_DELETE_ACCOUNT_DIALOG: {
        return {
          ...state,
          confirmDeleteDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_DELETE_ACCOUNT_DIALOG: {
        return {
          ...state,
          confirmDeleteDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Case to get account type data
      case Constants.GET_ALL_ACCOUNT_TYPES: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_ACCOUNT_TYPES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          accountTypeData: action.payload,
        };
      }
      case Constants.GET_ALL_ACCOUNT_TYPES_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get account type
      case Constants.GET_PARENT_ACCOUNT_TYPES: {
        return {
          ...state,
          loading: true,
          error: false,
          parentAccountTypeData: action.payload,
        };
      }
      case Constants.GET_PARENT_ACCOUNT_TYPES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          parentAccountTypeData: action.payload,
        };
      }
      case Constants.GET_PARENT_ACCOUNT_TYPES_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to create chart of account
      case Constants.CREATE_NEW_CHART_OF_ACCOUNT: {
        return {
          ...state,
          loading: true,
          error: false,
          chartOfAccountPostData: action.payload
        };
      }
      case Constants.CREATE_NEW_CHART_OF_ACCOUNT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          chartOfAccountPostData: action.payload
        };
      }
      case Constants.CREATE_NEW_CHART_OF_ACCOUNT_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get all chart of accounts
      case Constants.GET_ALL_CHART_OF_ACCOUNT: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_CHART_OF_ACCOUNT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          chartOfAccountData: action.payload,
        };
      }
      case Constants.GET_ALL_CHART_OF_ACCOUNT_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to delete a chart of account
      case Constants.DELETE_CHART_OF_ACCOUNT: {
        return {
          ...state,
          loading: true,
          error: false,
          chartOfAccountPostData: action.payload
        };
      }
      case Constants.DELETE_CHART_OF_ACCOUNT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          chartOfAccountPostData: action.payload
        };
      }
      case Constants.DELETE_CHART_OF_ACCOUNT_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to update a chart of account
      case Constants.UPDATE_CHART_OF_ACCOUNT: {
        return {
          ...state,
          loading: true,
          error: false,
          chartOfAccountPostData: action.payload
        };
      }
      case Constants.UPDATE_CHART_OF_ACCOUNT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          chartOfAccountPostData: action.payload
        };
      }
      case Constants.UPDATE_CHART_OF_ACCOUNT_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

    }
  });

export default accountChartReducer;
