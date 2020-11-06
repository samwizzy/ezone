import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  bankAccountDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  bankAccountConfirmDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  accountingPeriods: [],
  currencies: [],
  accountTypes: [],
  bankAccounts: [],
  bankAccount: null,
  bankTransferByOrgIdData: [],
  transactionTransferDialog: {
    type: 'to',
    props: {
      open: false,
    },
    data: null,
  },
  transferByAccountIdData: null,
};

/* eslint-disable default-case, no-param-reassign */
const bankingReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      // Open dialog for adding new bank account
      case Constants.OPEN_NEW_BANK_ACCOUNT_DIALOG: {
        return {
          ...state,
          bankAccountDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_BANK_ACCOUNT_DIALOG: {
        return {
          ...state,
          bankAccountDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      case Constants.EDIT_OPEN_ACCOUNT_DIALOG: {
        return {
          ...state,
          bankAccountDialog: {
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
          bankAccountDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      case Constants.OPEN_DELETE_BANK_ACCOUNT_DIALOG: {
        return {
          ...state,
          bankAccountConfirmDialog: {
            type: 'delete',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_DELETE_BANK_ACCOUNT_DIALOG: {
        return {
          ...state,
          bankAccountConfirmDialog: {
            type: 'delete',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      case Constants.OPEN_ACTIVATE_BANK_ACCOUNT_DIALOG: {
        return {
          ...state,
          bankAccountDialog: {
            type: 'activate',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_ACTIVATE_BANK_ACCOUNT_DIALOG: {
        return {
          ...state,
          bankAccountDialog: {
            type: 'activate',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      case Constants.OPEN_DEACTIVATE_BANK_ACCOUNT_DIALOG: {
        return {
          ...state,
          bankAccountDialog: {
            type: 'deactivate',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_DEACTIVATE_BANK_ACCOUNT_DIALOG: {
        return {
          ...state,
          bankAccountDialog: {
            type: 'deactivate',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      // Case to get accounting periods
      case Constants.GET_ACCOUNTING_PERIODS: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ACCOUNTING_PERIODS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          accountingPeriods: action.payload,
        };
      }
      case Constants.GET_ACCOUNTING_PERIODS_ERROR: {
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

      // Case to get account type data
      case Constants.GET_ALL_ACCOUNT_TYPES: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_ACCOUNT_TYPES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          accountTypes: action.payload,
        };
      }
      case Constants.GET_ALL_ACCOUNT_TYPES_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to create new bank
      case Constants.CREATE_NEW_BANK: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.CREATE_NEW_BANK_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_NEW_BANK_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get all bank accounts
      case Constants.GET_ALL_BANK_ACCOUNT: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_BANK_ACCOUNT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          bankAccounts: action.payload,
        };
      }
      case Constants.GET_ALL_BANK_ACCOUNT_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get bank account by id
      case Constants.GET_BANK_ACCOUNT_BY_ID: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_BANK_ACCOUNT_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          bankAccount: action.payload,
        };
      }
      case Constants.GET_BANK_ACCOUNT_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to update/edit bank account
      case Constants.UPDATE_BANK_ACCOUNT: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.UPDATE_BANK_ACCOUNT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_BANK_ACCOUNT_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to delete bank account
      case Constants.DELETE_BANK_ACCOUNT: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.DELETE_BANK_ACCOUNT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.DELETE_BANK_ACCOUNT_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get all bank accounts
      case Constants.GET_ALL_TRANSFER_BY_ORGID: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_TRANSFER_BY_ORGID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          bankTransferByOrgIdData: action.payload,
        };
      }
      case Constants.GET_ALL_TRANSFER_BY_ORGID_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Open transaction transfer to dialog
      case Constants.OPEN_ACCOUNT_TRANSFER_TO_DIALOG: {
        return {
          ...state,
          transactionTransferDialog: {
            type: 'to',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_ACCOUNT_TRANSFER_TO_DIALOG: {
        return {
          ...state,
          transactionTransferDialog: {
            type: 'to',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      // Open transaction transfer from dialog
      case Constants.OPEN_ACCOUNT_TRANSFER_FROM_DIALOG: {
        return {
          ...state,
          transactionTransferDialog: {
            type: 'from',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_ACCOUNT_TRANSFER_FROM_DIALOG: {
        return {
          ...state,
          transactionTransferDialog: {
            type: 'from',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Case to create bank transfer
      case Constants.CREATE_BANK_TRANSFER: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.CREATE_BANK_TRANSFER_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_BANK_TRANSFER_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Get transfers by account
      case Constants.GET_TRANSFERS_BY_ACCOUNT_ID: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_TRANSFERS_BY_ACCOUNT_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          transferByAccountIdData: action.payload,
        };
      }
      case Constants.GET_TRANSFERS_BY_ACCOUNT_ID_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Activate bank account (query params request)
      case Constants.ACTIVATE_BANK_ACCOUNT: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.ACTIVATE_BANK_ACCOUNT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.ACTIVATE_BANK_ACCOUNT_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Deactivate bank account (query params request)
      case Constants.DEACTIVATE_BANK_ACCOUNT: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.DEACTIVATE_BANK_ACCOUNT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.DEACTIVATE_BANK_ACCOUNT_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default bankingReducer;
