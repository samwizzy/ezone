/*
 *
 * Banking reducer
 *
 */
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
  accountTypeData: [],
  newBankPostData: {},
  bankAccountData: [],
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
          accountTypeData: action.payload,
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
          newBankPostData: action.payload
        };
      }
      case Constants.CREATE_NEW_BANK_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          newBankPostData: action.payload
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
          bankAccountData: action.payload,
        };
      }
      case Constants.GET_ALL_BANK_ACCOUNT_ERR: {
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
          newBankPostData: action.payload
        };
      }
      case Constants.UPDATE_BANK_ACCOUNT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          newBankPostData: action.payload
        };
      }
      case Constants.UPDATE_BANK_ACCOUNT_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default bankingReducer;
