import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  accountSetupData: null,
  taxes: [],
  chartOfAccountData: [],
  accountPeriodData: [],
  accountJournalPostData: {},
  journalListData: [],
  journalData: null,
  currencies: [],
  journalDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  taxDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
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
          accountSetupData: action.payload
        };
      }
      case Constants.GET_ACCOUNTING_SETUP_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get taxes
      case Constants.GET_TAXES: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.GET_TAXES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          taxes: action.payload
        }
      }
      case Constants.GET_TAXES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }

      // Case to create tax
      case Constants.CREATE_TAX: {
        return {
          ...state,
          loading: true,
          error: false,
        }
      }
      case Constants.CREATE_TAX_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        }
      }
      case Constants.CREATE_TAX_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      }

      // Open tax dialog
      case Constants.OPEN_NEW_TAX_DIALOG: {
        return {
          ...state,
          taxDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_TAX_DIALOG: {
        return {
          ...state,
          taxDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
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
        };
      }
      case Constants.GET_CURRENCIES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          currencies: action.payload,
        };
      }
      case Constants.GET_CURRENCIES_ERROR: {
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
          accountJournalPostData: action.payload,
        };
      }
      case Constants.CREATE_NEW_ACCOUNT_JOURNAL_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          accountJournalPostData: action.payload,
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
      // Case to get journal by id
      case Constants.GET_JOURNAL_BY_ID: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_JOURNAL_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          journalData: action.payload,
        };
      }
      case Constants.GET_JOURNAL_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default journalReducer;
