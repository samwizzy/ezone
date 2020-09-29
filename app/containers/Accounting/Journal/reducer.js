import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  chartOfAccountData: [],
  accountPeriodData: [],
  accountJournalPostData: {},
  journalListData: [],
  currencies: [],
  journalDialog: {
    type: 'new',
    props: {
      open: true,
    },
    data: null,
  }
};

/* eslint-disable default-case, no-param-reassign */
const journalReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      // Open journal dialog
      case Constants.OPEN_NEW_JOURNAL_DIALOG: {
        return {
          ...state,
          journalDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_JOURNAL_DIALOG: {
        return {
          ...state,
          journalDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Edit journal dialog
      case Constants.OPEN_EDIT_JOURNAL_DIALOG: {
        return {
          ...state,
          journalDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_JOURNAL_DIALOG: {
        return {
          ...state,
          journalDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
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

      // Case to get currencies
      case Constants.GET_CURRENCIES: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.GET_CURRENCIES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          currencies: action.payload
        }
      }
      case Constants.GET_CURRENCIES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
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

      // Case to get list of journals
      case Constants.GET_JOURNAL_LIST: {
        console.log('GET_JOURNAL_LIST reducer');
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_JOURNAL_LIST_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          journalListData: action.payload,
        };
      }
      case Constants.GET_JOURNAL_LIST_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default journalReducer;
