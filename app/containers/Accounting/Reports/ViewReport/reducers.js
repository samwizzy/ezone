import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: true,
  error: false,
  date: { startDate: null, endDate: null },
  generalJournals: [],
  chartOfAccounts: [],
  generalLedgers: [],
  trialBalances: [],
};

/* eslint-disable default-case, no-param-reassign */
const reportsReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      // Case to set start date
      case Constants.SET_START_DATE: {
        return {
          ...state,
          loading: false,
          date: {
            ...state.date,
            startDate: action.payload,
          },
        };
      }
      // Case to set end date
      case Constants.SET_END_DATE: {
        return {
          ...state,
          loading: false,
          date: {
            ...state.date,
            endDate: action.payload,
          },
        };
      }

      // Case to get general journals
      case Constants.GET_GENERAL_JOURNALS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      // Case to get general journals
      case Constants.GET_GENERAL_JOURNALS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          generalJournals: action.payload,
        };
      }
      // Case to get general journals error
      case Constants.GET_GENERAL_JOURNALS_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get chart of accounts
      case Constants.GET_CHART_OF_ACCOUNTS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      // Case to get chart of accounts success
      case Constants.GET_CHART_OF_ACCOUNTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          chartOfAccounts: action.payload,
        };
      }
      //error
      case Constants.GET_CHART_OF_ACCOUNTS_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get general ledger
      case Constants.GET_GENERAL_LEDGERS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      // Case to get general ledgers success
      case Constants.GET_GENERAL_LEDGERS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          generalLedgers: action.payload,
        };
      }
      // Case to get general ledgers error
      case Constants.GET_GENERAL_LEDGERS_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get trial balance
      case Constants.GET_ALL_TRIAL_BALANCE: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      // Case to get trial balance success
      case Constants.GET_ALL_TRIAL_BALANCE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          trialBalances: action.payload,
        };
      }
      // Case to get trial balance error
      case Constants.GET_ALL_TRIAL_BALANCE_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });
export default reportsReducer;
