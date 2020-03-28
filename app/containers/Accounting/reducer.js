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
  accountTypeData: [],
  detailTypeData: [],
  accountDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const accountingReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {

      // Open dialog for new account
      case Constants.OPEN_NEW_ACCOUNT_DIALOG: {
        return {
          ...state,
          accountDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_ACCOUNT_DIALOG: {
        return {
          ...state,
          accountDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      // Case to get account type
      case Constants.GET_ALL_ACCOUNT_TYPES: {
        console.log('GET_ALL_ACCOUNT_TYPES reducer');
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_ACCOUNT_TYPES_SUCCESS: {
        console.log('GET_ALL_ACCOUNT_TYPES_SUCCESS reducer');
        return {
          ...state,
          loading: false,
          error: false,
          accountTypeData: action.payload,
        };
      }
      case Constants.GET_ALL_ACCOUNT_TYPES_ERR: {
        console.log('GET_ALL_ACCOUNT_TYPES_ERR reducer');
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get detail type
      case Constants.GET_DETAIL_TYPES: {
        console.log('GET_DETAIL_TYPES reducer');
        return {
          ...state,
          loading: true,
          error: false,
          detailTypeData: action.payload,
        };
      }
      case Constants.GET_DETAIL_TYPES_SUCCESS: {
        console.log('GET_DETAIL_TYPES_SUCCESS reducer');
        return {
          ...state,
          loading: false,
          error: false,
          detailTypeData: action.payload,
        };
      }
      case Constants.GET_DETAIL_TYPES_ERR: {
        console.log('GET_DETAIL_TYPES_ERR reducer');
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default accountingReducer;
