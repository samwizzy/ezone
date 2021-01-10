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
  time: { startDate: null, endDate: null },
  fixedAssetScheduleTimeRange: { selectedRange: '' },
  incomeStatementTimeRange: { selectedRange: '' },
  financialPositionTimeRange: { selectedRange: '' },
  cashFlowTimeRange: { selectedRange: '' },
  fixedAssetRegister: [],
  fixedAssetSchedule: [],
  incomeStatement: [],
  cashFlow: [],
  financialPosition: [],
  financialPosition: [],
  cashAccountRegister: [],
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
      // Case to get Fixed asset register
      case Constants.GET_FIXED_ASSET_REGISTER: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      // Case to get Fixed asset register success
      case Constants.GET_FIXED_ASSET_REGISTER_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          fixedAssetRegister: action.payload,
        };
      }
      //error
      case Constants.GET_FIXED_ASSET_REGISTER_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get Fixed asset schedule
      case Constants.GET_FIXED_ASSET_SCHEDULE: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      // Case to get Fixed asset schedule success
      case Constants.GET_FIXED_ASSET_SCHEDULE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          fixedAssetSchedule: action.payload,
        };
      }
      //error
      case Constants.GET_FIXED_ASSET_SCHEDULE_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_FIXED_ASSET_SCHEDULE_RANGE: {
        return {
          ...state,
          fixedAssetScheduleTimeRange: action.payload,
        };
      }
      // Case to get income statement
      case Constants.GET_ALL_INCOME_STATEMENT_TYPES: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      // Case to get income statement success
      case Constants.GET_INCOME_STATEMENT_SUCCES_ACTION: {
        return {
          ...state,
          loading: false,
          error: false,
          incomeStatement: action.payload,
        };
      }
      //error
      case Constants.GET_INCOME_STATEMENT_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_INCOME_STATEMENT_RANGE: {
        return {
          ...state,
          incomeStatementTimeRange: action.payload,
        };
      }
      // Case to get cash flow
      case Constants.GET_ALL_CASH_FLOW_TYPES: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      // Case to get cash flow success
      case Constants.GET_CASH_FLOW_SUCCES_ACTION: {
        return {
          ...state,
          loading: false,
          error: false,
          cashFlow: action.payload,
        };
      }
      //error cash flow
      case Constants.GET_CASH_FLOW_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_CASH_FLOW_RANGE: {
        return {
          ...state,
          cashFlowTimeRange: action.payload,
        };
      }
      // Case to get Financial position
      case Constants.GET_ALL_FINANCIAL_POSITION_TYPES: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      // Case to get Financial position success
      case Constants.GET_FINANCIAL_POSITION_SUCCES_ACTION: {
        return {
          ...state,
          loading: false,
          error: false,
          financialPosition: action.payload,
        };
      }
      //error Financial position
      case Constants.GET_FINANCIAL_POSITION_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_FINANCIAL_POSITION_RANGE: {
        return {
          ...state,
          financialPositionTimeRange: action.payload,
        };
      }
      // Case to get Cash Account Register
      case Constants.GET_CASH_ACCOUNT_REGISTER: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      // Case to get Cash Account Register success
      case Constants.GET_CASH_ACCOUNT_REGISTER_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          cashAccountRegister: action.payload,
        };
      }
      //error Cash Account Register
      case Constants.GET_CASH_ACCOUNT_REGISTER_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });
export default reportsReducer;
