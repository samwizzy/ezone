import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: true,
  error: false,
  time: { startDate: '2020/04/15', endDate: '2020/09/11' },
  generaljournal: [],
  chatsOfAccount: [],
  generalLedger: [],
  trialBalance: [],
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
    }
  });
export default viewReportReducer;
