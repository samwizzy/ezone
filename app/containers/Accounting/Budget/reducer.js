/*
 *
 * Budget reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  budgetDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  budgets: [],
  budgetById: null,
  accountingPeriodData: [],
};

/* eslint-disable default-case, no-param-reassign */
const budgetReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {

      // Open dialog for adding new bank account 
      case Constants.OPEN_NEW_BUDGETING_DIALOG: {
        return {
          ...state,
          budgetDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_BUDGETING_DIALOG: {
        return {
          ...state,
          budgetDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }

      case Constants.EDIT_OPEN_BUDGETING_DIALOG: {
        return {
          ...state,
          budgetDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.EDIT_CLOSE_BUDGETING_DIALOG: {
        return {
          ...state,
          budgetDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      // Case to create bank transfer
      case Constants.CREATE_BUDGETING: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.CREATE_BUDGETING_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_BUDGETING_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get all accounting periods
      case Constants.GET_ALL_ACCOUNTING_PERIOD: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_ACCOUNTING_PERIOD_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          accountingPeriodData: action.payload
        };
      }
      case Constants.GET_ALL_ACCOUNTING_PERIOD_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

    }
  });

export default budgetReducer;
