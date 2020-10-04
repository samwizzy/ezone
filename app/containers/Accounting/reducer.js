import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  accountingSetupData: null,
  chartOfAccounts: [],
}

/* eslint-disable default-case, no-param-reassign */
const accountingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Constants.GET_ACCOUNTING_SETUP: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.GET_ACCOUNTING_SETUP_SUCCESS:
        draft.accountingSetupData = action.payload;
        draft.loading = false;
        break;
      case Constants.GET_ACCOUNTING_SETUP_ERR: {
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
    }
  });

export default accountingReducer;
