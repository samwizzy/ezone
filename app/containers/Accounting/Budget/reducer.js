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
  budgetDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  budgetData: [],
  budgetingPostData: {}
};

/* eslint-disable default-case, no-param-reassign */
const bankingReducer = (state = initialState, action) =>
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
          budgetingPostData: action.payload
        };
      }
      case Constants.CREATE_BUDGETING_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          budgetingPostData: action.payload
        };
      }
      case Constants.CREATE_BUDGETING_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

    }
  });

export default bankingReducer;