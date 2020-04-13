/*
 *
 * Accounting Dashboard reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false
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

    }
  });

export default accDashboardReducer;
