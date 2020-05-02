/*
 *
 * Home reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';
export const initialState = {
  analytics: []
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.GET_DASHBOARD_ANALYTICS: {
        return {
          ...state,
          analytics: action.payload
        };
      }
    }
  });

export default dashboardReducer;
