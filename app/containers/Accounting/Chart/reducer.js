/*
 *
 * Chart reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  accountDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const chartReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {

      // Open dialog for adding new account to chart of account
      case Constants.OPEN_NEW_ACCOUNT_DIALOG: {
        console.log('OPEN_NEW_ACCOUNT_DIALOG');
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
    }
  });

export default chartReducer;
