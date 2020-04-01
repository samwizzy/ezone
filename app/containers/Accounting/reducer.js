/*
 *
 * Accounting reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  accountTypeData: [],
  detailTypeData: [],
  chartOfAccPostData: false,
  chartOfAccData: [],
  accountDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const accountingReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {

      // Open dialog for new account
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

      // Case to get account type
      case Constants.GET_ALL_ACCOUNT_TYPES: {
        console.log('GET_ALL_ACCOUNT_TYPES reducer');
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_ACCOUNT_TYPES_SUCCESS: {
        console.log('GET_ALL_ACCOUNT_TYPES_SUCCESS reducer');
        return {
          ...state,
          loading: false,
          error: false,
          accountTypeData: action.payload,
        };
      }
      case Constants.GET_ALL_ACCOUNT_TYPES_ERR: {
        console.log('GET_ALL_ACCOUNT_TYPES_ERR reducer');
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get detail type
      case Constants.GET_DETAIL_TYPES: {
        return {
          ...state,
          loading: true,
          error: false,
          detailTypeData: action.payload,
        };
      }
      case Constants.GET_DETAIL_TYPES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          detailTypeData: action.payload,
        };
      }
      case Constants.GET_DETAIL_TYPES_ERR: {
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
          chartOfAccPostData: action.payload
        };
      }
      case Constants.CREATE_NEW_CHART_OF_ACCOUNT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          chartOfAccPostData: action.payload
        };
      }
      case Constants.CREATE_NEW_CHART_OF_ACCOUNT_ERR: {
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
          chartOfAccPostData: action.payload
        };
      }
      case Constants.UPDATE_CHART_OF_ACCOUNT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          chartOfAccPostData: action.payload
        };
      }
      case Constants.UPDATE_CHART_OF_ACCOUNT_ERR: {
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
          chartOfAccPostData: action.payload
        };
      }
      case Constants.DELETE_CHART_OF_ACCOUNT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          chartOfAccPostData: action.payload
        };
      }
      case Constants.DELETE_CHART_OF_ACCOUNT_ERR: {
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
          chartOfAccData: action.payload,
        };
      }
      case Constants.GET_ALL_CHART_OF_ACCOUNT_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default accountingReducer;
