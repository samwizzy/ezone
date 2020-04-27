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
  accountingSetupData: {},
  // accountSetupPostData: false,
  // accountJournalPostData: false,
  // accountJournals: [],
  // accountJournal: {},
};

/* eslint-disable default-case, no-param-reassign */
const accountingReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {

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

      

     
      // Case to create account journal
      // case Constants.CREATE_NEW_ACCOUNT_JOURNAL: {
      //   return {
      //     ...state,
      //     loading: true,
      //     error: false,
      //     accountJournalPostData: action.payload
      //   };
      // }
      // case Constants.CREATE_NEW_ACCOUNT_JOURNAL_SUCCESS: {
      //   return {
      //     ...state,
      //     loading: false,
      //     error: false,
      //     accountJournalPostData: action.payload
      //   };
      // }
      // case Constants.CREATE_NEW_ACCOUNT_JOURNAL_ERR: {
      //   return {
      //     ...state,
      //     loading: false,
      //     error: action.payload,
      //   };
      // }

    }
  });

export default accountingReducer;
