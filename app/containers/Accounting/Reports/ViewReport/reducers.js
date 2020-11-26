import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: true,
  error: false,
  time: { startDate: '', endDate: '' },
  fixedAssetRegisterTimeRange: { selectedRange: '' },
  fixedAssetScheduleTimeRange: { selectedRange: '' },
  incomeStatementTimeRange: { selectedRange: '' },
  financialPositionTimeRange: { selectedRange: '' },
  cashFlowTimeRange: { selectedRange: '' },
  generaljournal: [],
  chatsOfAccount: [],
  generalLedger: [],
  trialBalance: [],
  fixedAssetRegister: [],
  fixedAssetSchedule: [],
  incomeStatement: [],
  cashFlow: [],
  financialPosition: [],
};

/* eslint-disable default-case, no-param-reassign */
const viewReportReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      // Case to get company journal
      case Constants.GET_GENERAL_JOURNAL_SUCCES_ACTION: {
        return {
          ...state,
          loading: false,
          error: false,
          generaljournal: action.payload,
        };
      }
      // Case to get account type data
      case Constants.GET_ALL_GENERAL_JOURNAL_TYPES: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      //Time case
      case Constants.GET_GENERAL_JOURNAL_TIME: {
        return {
          ...state,
          time: action.payload,
        };
      }
      // error case
      case Constants.GET_GENERAL_JOURNAL_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.CLEAN_UP_GENERAL_JOURNAL_TYPES: {
        return {
          ...state,
          loading: true,
          error: false,
          time: { startDate: '', endDate: '' },
        };
      }
      // Case to get chats of account type
      case Constants.GET_ALL_CHATS_OF_ACCOUNT_TYPES: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      // Case to get chats of account succes
      case Constants.GET_CHATS_OF_ACCOUNTS_SUCCES_ACTION: {
        return {
          ...state,
          loading: false,
          error: false,
          chatsOfAccount: action.payload,
        };
      }
      //error
      case Constants.GET_CHATS_OF_ACCOUNTS_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      // Case to get general ledger type
      case Constants.GET_ALL_GENERAL_LEDGER_TYPES: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      // Case to get chats of account succes
      case Constants.GET_GENERAL_LEDGER_SUCCES_ACTION: {
        return {
          ...state,
          loading: false,
          error: false,
          generalLedger: action.payload,
        };
      }
      //error
      case Constants.GET_GENERAL_LEDGER_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      // Case to get trial balance
      case Constants.GET_ALL_TRIAL_BALANCE_TYPES: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      // Case to get trial balance success
      case Constants.GET_TRIAL_BALANCE_SUCCES_ACTION: {
        return {
          ...state,
          loading: false,
          error: false,
          trialBalance: action.payload,
        };
      }
      //error
      case Constants.GET_TRIAL_BALANCE_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      // Case to get Fixed asset register
      case Constants.GET_ALL_FIXED_ASSET_REGISTER_TYPES: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      // Case to get Fixed asset register success
      case Constants.GET_FIXED_ASSET_REGISTER_SUCCES_ACTION: {
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
      case Constants.GET_FIXED_ASSET_REGISTER_RANGE: {
        return {
          ...state,
          fixedAssetRegisterTimeRange: action.payload,
        };
      }
      // Case to get Fixed asset schedule
      case Constants.GET_ALL_FIXED_ASSET_SCHEDULE_TYPES: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      // Case to get Fixed asset schedule success
      case Constants.GET_FIXED_ASSET_SCHEDULE_SUCCES_ACTION: {
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
    }
  });
export default viewReportReducer;
