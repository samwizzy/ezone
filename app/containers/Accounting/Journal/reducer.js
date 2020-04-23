/*
 *
 * Journal reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  chartOfAccountData: [],
  accountPeriodData: [],
  accountJournalPostData: {},
};

/* eslint-disable default-case, no-param-reassign */
const journalReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      
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

      // Case to get all account period
      case Constants.GET_ACCOUNT_PERIOD: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ACCOUNT_PERIOD_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          accountPeriodData: action.payload,
        };
      }
      case Constants.GET_ACCOUNT_PERIOD_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to create account journal
      case Constants.CREATE_NEW_ACCOUNT_JOURNAL: {
        console.log('action.payload reducer');
        return {
          ...state,
          loading: true,
          error: false,
          accountJournalPostData: action.payload
        };
      }
      case Constants.CREATE_NEW_ACCOUNT_JOURNAL_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          accountJournalPostData: action.payload
        };
      }
      case Constants.CREATE_NEW_ACCOUNT_JOURNAL_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default journalReducer;
