/*
 *
 * Accounting Dashboard reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: null,
  accountsRange: []
};

/* eslint-disable default-case, no-param-reassign */
const accDashboardReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {

      // Open dialog for new account
      case Constants.DEFAULT_ACTION: {
        return {
          ...state
        };
      }
      case Constants.GET_CHART_OF_ACCOUNTS_RANGE: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_CHART_OF_ACCOUNTS_RANGE_SUCCESS: {
        return {
          ...state,
          loading: false,
          accountsRange: action.payload
        };
      }
      case Constants.GET_CHART_OF_ACCOUNTS_RANGE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      }

    }
  });

export default accDashboardReducer;
